import { FastifyInstance } from "fastify";
import { Stream } from "stream";
import { Sessions } from "../session";
import { validateId } from "./validation";
import Dockerode from "dockerode";

export function registerContainers(
  fastify: FastifyInstance,
  sessions: Sessions
) {
  fastify.register(
    (app) => {
      app.get("", async (request, reply) => {
        const session = sessions.fromContext(request);
        try {
          return await session?.docker.listContainers({ all: true });
        } catch (err: any) {
          throw new Error(`Docker API error: ${err.message}`);
        }
      });

      app.post("/prune", async (request, reply) => {
        const session = sessions.fromContext(request);
        try {
          return await session?.docker.pruneContainers();
        } catch (err: any) {
          throw new Error(`Docker API error: ${err.message}`);
        }
      });

      app.get<{ Params: { id: string } }>("/:id", async (request, reply) => {
        const id = request.params.id;
        const session = sessions.fromContext(request);
        try {
          const containers = await session?.docker.listContainers({
            all: true,
          });
          return containers?.find((c) => c.Id === id);
        } catch (err: any) {
          throw new Error(`Docker API error: ${err.message}`);
        }
      });

      app.put<{ Params: { id: string } }>(
        "/:id/stop",
        { preValidation: validateId },
        async (request, reply) => {
          const id = request.params.id;
          const session = sessions.fromContext(request);
          try {
            const container = session?.docker.getContainer(id);
            await container?.stop();
          } catch (err: any) {
            throw new Error(`Docker API error: ${err.message}`);
          }
        }
      );

      app.delete<{ Params: { id: string } }>(
        "/:id",
        { preValidation: validateId },
        async (request, reply) => {
          const id = request.params.id;
          const session = sessions.fromContext(request);
          try {
            const container = session?.docker.getContainer(id);
            await container?.remove();
          } catch (err: any) {
            throw new Error(`Docker API error: ${err.message}`);
          }
        }
      );

      app.put<{ Params: { id: string } }>(
        "/:id/start",
        { preValidation: validateId },
        async (request, reply) => {
          const id = request.params.id;
          const session = sessions.fromContext(request);
          try {
            const container = session?.docker.getContainer(id);
            await container?.start();
          } catch (err: any) {
            throw new Error(`Docker API error: ${err.message}`);
          }
        }
      );

      app.get<{ Params: { id: string } }>(
        "/:id/logs",
        { preValidation: validateId },
        async (request, reply) => {
          const id = request.params.id;
          const session = sessions.fromContext(request);
          const container = session?.docker.getContainer(id);

          var logStream = new Stream.PassThrough();
          let output = "";
          logStream.on("data", function (chunk) {
            output += chunk.toString("utf8");
          });

          await new Promise<void>((resolve) => {
            container?.logs(
              {
                follow: true,
                stdout: true,
                stderr: true,
                tail: 1000,
              },
              function (err, stream) {
                if (err) {
                  reply.status(500).send(err);
                  resolve();
                }
                container.modem.demuxStream(stream, logStream, logStream);

                const tid = setTimeout(function () {
                  reply.send(output);
                  resolve();
                }, 500);

                stream?.on("end", function () {
                  logStream.end("");
                  reply.send(output);
                  clearTimeout(tid);
                  resolve();
                });
              }
            );
          });
        }
      );
    },
    { prefix: "/api/containers" }
  );
}
