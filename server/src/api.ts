import { FastifyInstance } from "fastify";
import { Sessions } from "./session";
import Docker from "dockerode";
import { createId } from "@paralleldrive/cuid2";
import { SESSION_ID } from "./model";
import { Stream } from "stream";

export function registerApi(fastify: FastifyInstance, sessions: Sessions) {
  fastify.post("/login", async (request, reply) => {
    const config = getDockerConfig();
    const docker = new Docker(config);
    const sessionId = createId();
    sessions.add(sessionId, {
      stats: {
        lastUsed: new Date().getTime(),
      },
      docker,
      config,
    });
    reply.cookie(SESSION_ID, sessionId, {
      domain: "localhost",
    });
  });

  fastify.get("/server", async (request, reply) => {
    const session = sessions.fromContext(request);
    return { config: session?.config, info: await session?.docker.info() };
  });

  fastify.get("/containers", async (request, reply) => {
    const session = sessions.fromContext(request);
    return await session?.docker.listContainers({ all: true });
  });

  fastify.get<{ Params: { id: string } }>(
    "/containers/:id",
    async (request, reply) => {
      const id = request.params.id;
      const session = sessions.fromContext(request);
      const containers = await session?.docker.listContainers({ all: true });
      return containers?.find((c) => c.Id === id);
    }
  );

  fastify.put<{ Params: { id: string } }>(
    "/containers/:id/stop",
    async (request, reply) => {
      const id = request.params.id;
      const session = sessions.fromContext(request);
      const container = session?.docker.getContainer(id);
      await container?.stop();
    }
  );

  fastify.put<{ Params: { id: string } }>(
    "/containers/:id/start",
    async (request, reply) => {
      const id = request.params.id;
      const session = sessions.fromContext(request);
      const container = session?.docker.getContainer(id);
      await container?.start();
    }
  );

  fastify.get<{ Params: { id: string } }>(
    "/containers/:id/logs",
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

  fastify.get("/images", async (request, reply) => {
    const session = sessions.fromContext(request);
    return await session?.docker.listImages({ all: true });
  });

  fastify.get("/volumes", async (request, reply) => {
    const session = sessions.fromContext(request);
    return (await session?.docker.listVolumes())?.Volumes;
  });
}

function getDockerConfig(): Docker.DockerOptions {
  if (process.platform === "win32") {
    return { host: "localhost", port: 2375 };
  }

  if (process.env.DOCKER_HOST) {
    return { socketPath: process.env.DOCKER_HOST };
  }

  return { socketPath: "/var/run/docker.sock" };
}
