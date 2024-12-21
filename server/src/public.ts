import { FastifyInstance } from "fastify";
import path from "node:path";
import fStatic from "@fastify/static";

const DIST = path.join(__dirname, "../../ui/dist/ui/browser/");
const LANGS = ["en-US", "fr"];

export function registerStatic(fastify: FastifyInstance) {
  fastify.register(fStatic, {
    root: DIST,
    constraints: {},
  });

  fastify.get("/", (req, reply) => {
    reply.sendFile(`/en-US/index.html`);
    reply.redirect("/en-US/");
  });

  // the angular app has a router,
  // if you try to load the app directly from a nested route
  // the fastify handler here has to server the index.html
  fastify.setNotFoundHandler((request, reply) => {
    const url = request.raw.url;
    console.log(" url ", url);
    if (url?.startsWith("/api")) {
      throw new Error("Not found");
    } else {
      const lang = LANGS.find((l) => url?.startsWith(`/${l}`)) ?? LANGS[0];
      console.log(" lang ", lang, path.join(DIST, lang, "index.html"));
      reply.sendFile(`/${lang}/index.html`);
    }
  });
}
