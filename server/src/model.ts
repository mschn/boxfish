import Docker, { Exec } from "dockerode";
import { PinoLoggerOptions } from "fastify/types/logger";
import { Duplex } from "stream";

export interface SessionStats {
  lastUsed: number;
}
export interface Session {
  stats: SessionStats;
  config: Docker.DockerOptions;
  docker: Docker;
  exec: Record<string, { stream: Duplex; exec: Exec }>;
}

export const SESSION_ID = "sessionId";
export const SESSION_TIMEOUT_MS = 12 * 60 * 60 * 1000; // 1 day session timeout

export const DEV_LOGGER: PinoLoggerOptions = {
  transport: {
    target: "pino-pretty",
    options: {
      translateTime: "HH:MM:ss Z",
      ignore: "pid,hostname",
      singleLine: true,
    },
  },
};
