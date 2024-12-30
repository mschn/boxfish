import { FastifyInstance } from "fastify";
import { Stream } from "stream";
import { Sessions } from "../session";

export function registerImages(fastify: FastifyInstance, sessions: Sessions) {
  fastify.register(
    (app) => {
      app.get("", async (request, reply) => {
        const session = sessions.fromContext(request);
        return await session?.docker.listImages({ all: false });
      });

      app.delete<{ Params: { id: string } }>("/:id", async (request, reply) => {
        const id = request.params.id;
        const session = sessions.fromContext(request);
        const image = session?.docker.getImage(id);
        await image?.remove();
      });

      app.post("/prune", async (request, reply) => {
        const session = sessions.fromContext(request);
        return await session?.docker.pruneImages();
      });
    },
    { prefix: "/api/images" }
  );
}
