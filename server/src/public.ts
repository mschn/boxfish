import { FastifyInstance } from "fastify";
import path from "node:path";
import fStatic from "@fastify/static";
import { readFileSync } from "node:fs";

const DIST = path.join(__dirname, "../../ui/dist/ui/browser/");
const LANGS = ["en-US", "fr"];

export function registerStatic(fastify: FastifyInstance) {
  fastify.register(fStatic, {
    root: DIST,
    constraints: {},
  });

  fastify.get("/", (req, reply) => {
    if (req.headers["accept-language"]?.startsWith("fr")) {
      reply.redirect("/fr/");
    }
    reply.redirect("/en-US/");
  });

  fastify.get("/version", async (request, reply) => {
    const versionFile = path.join(__dirname, "version.txt");
    const file = readFileSync(versionFile);
    reply.send(file.toString("utf8"));
  });

  // the angular app has a router,
  // if you try to load the app directly from a nested route
  // the fastify handler here has to server the index.html
  fastify.setNotFoundHandler((request, reply) => {
    const url = request.raw.url;
    if (url?.startsWith("/api")) {
      throw new Error("Not found");
    } else {
      const lang = LANGS.find((l) => url?.startsWith(`/${l}`)) ?? LANGS[0];
      reply.sendFile(`/${lang}/index.html`);
    }
  });
}
