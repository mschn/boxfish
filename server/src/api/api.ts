import { createId } from "@paralleldrive/cuid2";
import Docker from "dockerode";
import { FastifyInstance } from "fastify";
import { existsSync } from "fs";
import path from "node:path";
import { SESSION_ID } from "../model";
import { Sessions } from "../session";
import { registerContainers } from "./containers";
import { registerImages } from "./images";
import { registerVolumes } from "./volumes";

export function registerApi(fastify: FastifyInstance, sessions: Sessions) {
  fastify.register(
    (app) => {
      app.post("/login", async (request, reply) => {
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

      app.get("/server", async (request, reply) => {
        const session = sessions.fromContext(request);
        try {
          const info = await session?.docker.info();
          return { config: session?.config, info };
        } catch (err: any) {
          throw new Error(`Docker API error: ${err.message}`);
        }
      });

      app.get("/df", async (request) => {
        const session = sessions.fromContext(request);
        try {
          return await session?.docker.df();
        } catch (err: any) {
          throw new Error(`Docker API error: ${err.message}`);
        }
      });
    },
    { prefix: "/api" }
  );

  registerContainers(fastify, sessions);
  registerImages(fastify, sessions);
  registerVolumes(fastify, sessions);
}

function getDockerConfig(): Docker.DockerOptions {
  const colimaSock = path.join(process.env.HOME ?? "", "/.colima/docker.sock");
  if (existsSync(colimaSock)) {
    return { socketPath: colimaSock };
  }

  if (process.platform === "win32") {
    return { host: "localhost", port: 2375 };
  }

  if (process.env.DOCKER_HOST) {
    return { socketPath: process.env.DOCKER_HOST };
  }

  return { socketPath: "/var/run/docker.sock" };
}
