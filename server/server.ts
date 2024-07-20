import Fastify from "fastify";
import Docker from "dockerode";

const fastify = Fastify({ logger: true });
const docker = new Docker({ socketPath: "/var/run/docker.sock" });

fastify.get(
  "/containers",
  async (request, reply) => await docker.listContainers({ all: true })
);

fastify.get<{ Params: { id: string } }>(
  "/containers/:id",
  async (request, reply) => {
    const id = request.params.id;
    const containers = await docker.listContainers({ all: true });
    return containers.find((c) => c.Id === id);
  }
);

fastify.get(
  "/images",
  async (request, reply) => await docker.listImages({ all: true })
);

fastify.get(
  "/volumes",
  async (request, reply) => (await docker.listVolumes()).Volumes
);

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
