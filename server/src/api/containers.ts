import { FastifyInstance } from "fastify";
import { Stream } from "stream";
import { Sessions } from "../session";

export function registerContainers(
  fastify: FastifyInstance,
  sessions: Sessions
) {
  fastify.register(
    (app) => {
      app.get("", async (request, reply) => {
        const session = sessions.fromContext(request);
        return await session?.docker.listContainers({ all: true });
      });

      app.post("/prune", async (request, reply) => {
        const session = sessions.fromContext(request);
        return session?.docker.pruneContainers();
      });

      app.get<{ Params: { id: string } }>("/:id", async (request, reply) => {
        const id = request.params.id;
        const session = sessions.fromContext(request);
        const containers = await session?.docker.listContainers({
          all: true,
        });
        return containers?.find((c) => c.Id === id);
      });

      app.put<{ Params: { id: string } }>(
        "/:id/stop",
        async (request, reply) => {
          const id = request.params.id;
          const session = sessions.fromContext(request);
          const container = session?.docker.getContainer(id);
          await container?.stop();
        }
      );

      app.delete<{ Params: { id: string } }>("/:id", async (request, reply) => {
        const id = request.params.id;
        const session = sessions.fromContext(request);
        const container = session?.docker.getContainer(id);
        await container?.remove();
      });

      app.put<{ Params: { id: string } }>(
        "/:id/start",
        async (request, reply) => {
          const id = request.params.id;
          const session = sessions.fromContext(request);
          const container = session?.docker.getContainer(id);
          await container?.start();
        }
      );

      app.post<{ Params: { id: string }; Body: { cmd: string[] } }>(
        "/:id/exec",
        async (request, reply) => {
          const id = request.params.id;
          const session = sessions.fromContext(request);
          const container = session?.docker.getContainer(id);
          const exec = await container?.exec({
            AttachStdout: true,
            Tty: true,
            Cmd: request.body.cmd,
          });
          return await exec?.start({
            Detach: false,
            Tty: true,
          });
        }
      );

      app.get<{ Params: { id: string } }>(
        "/:id/logs",
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
                stream?.on("end", function () {
                  logStream.end("");
                  reply.send(output);
                  resolve();
                });

                setTimeout(function () {
                  reply.send(output);
                  resolve();
                }, 500);
              }
            );
          });
        }
      );
    },
    { prefix: "/api/containers" }
  );
}
