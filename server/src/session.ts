import cookie from "@fastify/cookie";
import { fastifyRequestContext } from "@fastify/request-context";
import { FastifyInstance, FastifyRequest } from "fastify";
import { Session, SESSION_ID, SESSION_TIMEOUT_MS } from "./model";

declare module "@fastify/request-context" {
  interface RequestContextData {
    session: Session;
  }
}

export class Sessions {
  readonly sessions: Record<string, Session> = {};

  constructor(fastify: FastifyInstance) {
    fastify.register(fastifyRequestContext, {
      hook: "preValidation",
    });

    fastify.register(cookie, {
      secret: "cookie-secret",
      parseOptions: {},
    });

    fastify.addHook("preHandler", (request, reply, done) => {
      if (request.url === "/api/login" || !request.url.startsWith("/api")) {
        done();
        return;
      }

      const session = this.fromCookie(request);
      if (!session) {
        reply.status(403).send({ error: "not logged in" });
      }

      session.stats.lastUsed = new Date().getTime();
      request.requestContext.set("session", session);
      done();
    });

    this.timeout();
  }

  add(id: string, session: Session) {
    this.sessions[id] = session;
  }

  get(id: string): Session {
    return this.sessions[id];
  }

  fromCookie(request: FastifyRequest) {
    const sessionId = request.cookies[SESSION_ID] ?? "";
    return this.get(sessionId);
  }

  fromContext(request: FastifyRequest) {
    const session = request.requestContext.get("session");
    if (session == null) {
      throw new Error("No session in context");
    }
    return session;
  }

  timeout() {
    const now = new Date().getTime();
    Object.keys(this.sessions).forEach((sessionId) => {
      const session = this.get(sessionId);
      if (now - session.stats.lastUsed > SESSION_TIMEOUT_MS) {
        console.log(" timing out ", sessionId);

        // cleanup container exec shells
        Object.values(this.sessions[sessionId].exec).forEach(({ stream }) => {
          stream.write("exit\n");
          stream.end();
        });

        delete this.sessions[sessionId];
      }
    });
    setTimeout(() => this.timeout(), 1000);
  }
}
