import Fastify from "fastify";
import { registerApi } from "./api";
import { addCorsHook } from "./cors";
import { Sessions } from "./session";

const fastify = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
});

addCorsHook(fastify);
const sessions = new Sessions(fastify);
registerApi(fastify, sessions);

fastify.listen({ host: "localhost", port: 3000 }).catch((err) => {
  fastify.log.error(err);
  process.exit(1);
});
