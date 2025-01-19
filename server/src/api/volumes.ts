import { FastifyInstance } from "fastify";
import { Sessions } from "../session";

export function registerVolumes(fastify: FastifyInstance, sessions: Sessions) {
  fastify.register(
    (app) => {
      app.get("", async (request, reply) => {
        const session = sessions.fromContext(request);
        try {
          return (await session?.docker.listVolumes())?.Volumes;
        } catch (err: any) {
          throw new Error(`Docker API error: ${err.message}`);
        }
      });
    },
    { prefix: "/api/volumes" }
  );
}
