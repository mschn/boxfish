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
          const stream = session.execStreams[id];

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
            delete session.execStreams[id];
          });
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
            if (session.execStreams[id]) {
              session.execStreams[id].write("exit\n");
              session.execStreams[id].end();
            }
            session.execStreams[id] = stream;
          } catch (err: any) {
            throw new Error(`Docker API error: ${err.message}`);
          }
        }
      );
    },
    { prefix: "/api/containers" }
  );
}
