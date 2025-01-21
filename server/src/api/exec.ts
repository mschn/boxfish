import FastifyWebsocket from "@fastify/websocket";
import { FastifyInstance } from "fastify";
import { Duplex, Stream } from "stream";
import { Sessions } from "../session";
import { validateId } from "./validation";

export function registerContainerExec(
  fastify: FastifyInstance,
  sessions: Sessions
) {
  fastify.register(FastifyWebsocket);

  fastify.register(
    (app) => {
      app.get<{ Params: { id: string } }>(
        "/:id/exec/ws",
        { websocket: true },
        async (socket, request) => {
          const session = sessions.fromContext(request);
          const id = request.params.id;
          const { stream } = session.exec[id];

          // send shell stdout on the Websocket
          const logStream = new Stream.PassThrough();
          logStream.on("data", function (chunk) {
            const execOutput = chunk.toString("utf8");
            socket.send(execOutput);
          });
          stream.pipe(logStream);

          // send Websocket messages to the shell stdin
          socket.on("message", (message) => {
            stream.write(message.toString());
          });

          // cleanup when the client is navigating away
          socket.on("close", () => {
            stream.write("exit\n");
            stream.end();
            delete session.exec[id];
          });
        }
      );

      app.post<{
        Params: { id: string };
        Body: { rows: number; cols: number };
      }>(
        "/:id/exec/resize",
        { preValidation: validateId },
        async (request, reply) => {
          const id = request.params.id;
          const { rows, cols } = request.body;
          const session = sessions.fromContext(request);
          const container = session.docker.getContainer(id);
          const { exec } = session.exec[id];
          await exec.resize({ h: rows, w: cols });
        }
      );

      app.post<{ Params: { id: string } }>(
        "/:id/exec",
        { preValidation: validateId },
        async (request, reply) => {
          const id = request.params.id;
          const session = sessions.fromContext(request);
          try {
            const container = session.docker.getContainer(id);
            const exec = await container.exec({
              AttachStdin: true,
              AttachStdout: true,
              AttachStderr: true,
              Tty: true,
              Cmd: ["sh"],
            });
            const stream = await exec.start({
              hijack: true,
              stdin: true,
              Detach: false,
              Tty: true,
            });
            if (session.exec[id]) {
              session.exec[id].stream.write("exit\n");
              session.exec[id].stream.end();
            }
            session.exec[id] = { stream, exec };
          } catch (err: any) {
            throw new Error(`Docker API error: ${err.message}`);
          }
        }
      );
    },
    { prefix: "/api/containers" }
  );
}
