import { FastifyInstance } from "fastify";
import cors from "@fastify/cors";

// bypass CORS protection for local client
export function addCorsHook(fastify: FastifyInstance) {
  fastify.register(cors, {
    origin: (origin, cb) => {
      if (origin == null) {
        cb(new Error("Not allowed"), false);
        return;
      }
      const hostname = new URL(origin).hostname;
      if (hostname === "localhost") {
        cb(null, true);
        return;
      }
      cb(new Error("Not allowed"), false);
    },
    credentials: true,
  });
}
