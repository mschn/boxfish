import { FastifyInstance } from "fastify";
import cors from "@fastify/cors";

// disable CORS protection
export function addCorsHook(fastify: FastifyInstance) {
  fastify.register(cors, {
    origin: true,
    credentials: true,
  });
}
