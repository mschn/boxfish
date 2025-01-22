import { createId } from "@paralleldrive/cuid2";
import Docker from "dockerode";
import { FastifyInstance } from "fastify";
import { SESSION_ID } from "../model";
import { Sessions } from "../session";
import { registerContainers } from "./containers";
import { registerContainerExec } from "./exec";
import { registerImages } from "./images";
import { registerVolumes } from "./volumes";
import { readFile, readFileSync } from "fs";
import path from "path";

export function registerApi(fastify: FastifyInstance, sessions: Sessions) {
  fastify.register(
    (app) => {
      app.post("/login", async (request, reply) => {
        const config = getDockerConfig();
        console.log("Detected docker config: ", JSON.stringify(config));
        const docker = new Docker(config);
        const sessionId = createId();
        sessions.add(sessionId, {
          stats: {
            lastUsed: new Date().getTime(),
          },
          docker,
          config,
          exec: {},
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
  registerContainerExec(fastify, sessions);
  registerImages(fastify, sessions);
  registerVolumes(fastify, sessions);
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
