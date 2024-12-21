import Fastify from "fastify";
import { registerApi } from "./api";
import { addCorsHook } from "./cors";
import { Sessions } from "./session";
import { DEV_LOGGER } from "./model";
import { registerStatic } from "./public";

const fastify = Fastify({
  logger: DEV_LOGGER,
});

addCorsHook(fastify);
const sessions = new Sessions(fastify);
registerApi(fastify, sessions);
registerStatic(fastify);

fastify.listen({ host: "0.0.0.0", port: 3000 }).catch((err) => {
  fastify.log.error(err);
  process.exit(1);
});
