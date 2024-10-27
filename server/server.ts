import cookie from "@fastify/cookie";
import { fastifyRequestContext } from "@fastify/request-context";
import { createId } from "@paralleldrive/cuid2";
import Docker from "dockerode";
import Fastify from "fastify";

type Session = { config: Docker.DockerOptions; docker: Docker };

declare module "@fastify/request-context" {
  interface RequestContextData {
    session: Session;
  }
}
const SESSION_ID = "sessionId";

const fastify = Fastify({ logger: true });

fastify.register(cookie, {
  secret: "cookie-secret",
  parseOptions: {},
});

fastify.register(fastifyRequestContext, {
  hook: "preValidation",
});

const sessions: Record<
  string,
  { config: Docker.DockerOptions; docker: Docker }
> = {};

fastify.post("/login", async (request, reply) => {
  const config = getDockerConfig();
  const docker = new Docker(config);
  const sessionId = createId();
  sessions[sessionId] = {
    docker,
    config,
  };
  reply.cookie(SESSION_ID, sessionId, {
    domain: "localhost",
  });
});

fastify.get("/server", async (request, reply) => {
  const sessionId = request.cookies[SESSION_ID] ?? "";
  const { config, docker } = sessions[sessionId];
  return { config, info: await docker.info() };
});

fastify.get("/containers", async (request, reply) => {
  const session = request.requestContext.get("session");
  return await session?.docker.listContainers({ all: true });
});

fastify.get<{ Params: { id: string } }>(
  "/containers/:id",
  async (request, reply) => {
    const id = request.params.id;
    const session = request.requestContext.get("session");
    const containers = await session?.docker.listContainers({ all: true });
    return containers?.find((c) => c.Id === id);
  }
);

fastify.get("/images", async (request, reply) => {
  const session = request.requestContext.get("session");
  return await session?.docker.listImages({ all: true });
});

fastify.get("/volumes", async (request, reply) => {
  const session = request.requestContext.get("session");
  return (await session?.docker.listVolumes())?.Volumes;
});

fastify.addHook("preHandler", (req, res, done) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Methods", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.header("Access-Control-Allow-Credentials", "true");

  const isPreflight = /options/i.test(req.method);
  if (isPreflight) {
    return res.send();
  }
  done();
});

fastify.addHook("preHandler", (request, reply, done) => {
  if (request.url === "/login") {
    done();
    return;
  }

  const sessionId = request.cookies[SESSION_ID] ?? "";
  const session = sessions[sessionId];

  if (!session) {
    reply.status(403).send({ ok: false });
  }

  request.requestContext.set("session", session);
  done();
});

fastify.listen({ host: "localhost", port: 3000 }).catch((err) => {
  fastify.log.error(err);
  process.exit(1);
});

function getDockerConfig(): Docker.DockerOptions {
  if (process.platform === "win32") {
    return { host: "localhost", port: 2375 };
  }
  return { socketPath: "/var/run/docker.sock" };
}
