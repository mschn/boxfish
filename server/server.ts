import Fastify from "fastify";
import Docker from "dockerode";

const fastify = Fastify({ logger: true });
const docker = new Docker({ socketPath: "/var/run/docker.sock" });

fastify.route({
  method: "GET",
  url: "/",
  handler: async (request, reply) => {
    const containers = await docker.listContainers({ all: true });
    return containers;
  },
});

fastify.listen({ host: "localhost", port: 3000 }).catch((err) => {
  fastify.log.error(err);
  process.exit(1);
});
