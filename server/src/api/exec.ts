import FastifyWebsocket from "@fastify/websocket";
import { FastifyInstance } from "fastify";
import { Duplex, Stream } from "stream";
import { Sessions } from "../session";
import { validateId } from "./validation";

// TODO store this in session
// TODO clean up exec
let stream: Duplex | undefined;

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
          var logStream = new Stream.PassThrough();
          logStream.on("data", function (chunk) {
            const execOutput = chunk.toString("utf8");
            socket.send(execOutput);
          });
          stream?.pipe(logStream);

          socket.on("message", (message) => {
            stream?.write(message.toString() + "\n");
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
            const container = session?.docker.getContainer(id);
            const exec = await container?.exec({
              AttachStdin: true,
              AttachStdout: true,
              AttachStderr: true,
              Tty: true,
              Cmd: ["sh"],
            });
            stream = await exec?.start({
              hijack: true,
              stdin: true,
              Detach: false,
              Tty: true,
            });
          } catch (err: any) {
            throw new Error(`Docker API error: ${err.message}`);
          }
        }
      );
    },
    { prefix: "/api/containers" }
  );
}
