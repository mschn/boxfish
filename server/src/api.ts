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

  fastify.get<{ Params: { id: string } }>(
    "/containers/:id/logs",
    async (request, reply) => {
      const id = request.params.id;
      const session = sessions.fromContext(request);
      const container = session?.docker.getContainer(id);

      const buffer = await container?.logs({
        stdout: true,
        follow: false,
        stderr: true,
      });
      return buffer?.toString("utf8");
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
  return { socketPath: "/var/run/docker.sock" };
}
