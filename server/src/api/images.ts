import { FastifyInstance } from "fastify";
import { Stream } from "stream";
import { Sessions } from "../session";
import { validateId } from "./validation";

export function registerImages(fastify: FastifyInstance, sessions: Sessions) {
  fastify.register(
    (app) => {
      app.get("", async (request, reply) => {
        const session = sessions.fromContext(request);
        try {
          return await session?.docker.listImages({ all: false });
        } catch (err: any) {
          throw new Error(`Docker API error: ${err.message}`);
        }
      });

      app.get<{ Params: { id: string } }>(
        "/:id/history",
        { preValidation: validateId },
        async (request, reply) => {
          const id = request.params.id;
          const session = sessions.fromContext(request);
          try {
            const image = session?.docker.getImage(id);
            return await image?.history();
          } catch (err) {
            throw new Error("Docker API error", { cause: err });
          }
        }
      );

      app.delete<{ Params: { id: string } }>(
        "/:id",
        { preValidation: validateId },
        async (request) => {
          const id = request.params.id;
          const session = sessions.fromContext(request);
          try {
            const image = session?.docker.getImage(id);
            await image?.remove();
          } catch (err) {
            throw new Error("Docker API error", { cause: err });
          }
        }
      );

      app.post("/prune", async (request, reply) => {
        const session = sessions.fromContext(request);
        try {
          return await session?.docker.pruneImages();
        } catch (err: any) {
          throw new Error(`Docker API error: ${err.message}`);
        }
      });
    },
    { prefix: "/api/images" }
  );
}
