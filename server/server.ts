import Fastify from "fastify";
import Docker from "dockerode";

const fastify = Fastify({ logger: true });
const docker = new Docker({ socketPath: "/var/run/docker.sock" });

fastify.route({
  method: "GET",
  url: "/containers",
  handler: async (request, reply) => await docker.listContainers({ all: true }),
});

fastify.route({
  method: "GET",
  url: "/images",
  handler: async (request, reply) => await docker.listImages({ all: true }),
});

fastify.route({
  method: "GET",
  url: "/volumes",
  handler: async (request, reply) => (await docker.listVolumes()).Volumes,
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
