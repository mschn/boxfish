import Fastify from "fastify";
import Docker from "dockerode";

const fastify = Fastify({ logger: true });
const docker = new Docker({ socketPath: "/var/run/docker.sock" });

fastify.route({
  method: "GET",
  url: "/containers",
  handler: async (request, reply) => {
    const containers = await docker.listContainers({ all: true });
    return containers;
  },
});

fastify.route({
  method: "GET",
  url: "/images",
  handler: async (request, reply) => {
    const images = await docker.listImages({ all: true });
    return images;
  },
});

fastify.addHook("preHandler", (req, res, done) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");

  const isPreflight = /options/i.test(req.method);
  if (isPreflight) {
    return res.send();
  }
  done();
});

fastify.listen({ host: "localhost", port: 3000 }).catch((err) => {
  fastify.log.error(err);
  process.exit(1);
});
