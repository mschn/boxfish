import { FastifyInstance, FastifyRequest } from "fastify";
import { Session, SESSION_ID } from "./model";
import { fastifyRequestContext } from "@fastify/request-context";

declare module "@fastify/request-context" {
  interface RequestContextData {
    session: Session;
  }
}

export class Sessions {
  readonly sessions: Record<string, Session> = {};

  constructor(private fastify: FastifyInstance) {
    fastify.register(fastifyRequestContext, {
      hook: "preValidation",
    });

    fastify.addHook("preHandler", (request, reply, done) => {
      if (request.url === "/login") {
        done();
        return;
      }

      const session = this.fromCookie(request);
      if (!session) {
        reply.status(403).send({ ok: false });
      }

      session.stats.lastUsed = new Date().getTime();
      request.requestContext.set("session", session);
      done();
    });
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
    return request.requestContext.get("session");
  }

  timeout() {}
}
