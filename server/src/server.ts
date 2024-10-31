import Fastify from "fastify";
import { registerApi } from "./api";
import { addCorsHook } from "./cors";
import { Sessions } from "./session";
import { DEV_LOGGER } from "./model";

const fastify = Fastify({
  logger: DEV_LOGGER,
});

addCorsHook(fastify);
const sessions = new Sessions(fastify);
registerApi(fastify, sessions);

fastify.listen({ host: "localhost", port: 3000 }).catch((err) => {
  fastify.log.error(err);
  process.exit(1);
});
