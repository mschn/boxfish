import Docker from "dockerode";
import { PinoLoggerOptions } from "fastify/types/logger";

export interface SessionStats {
  lastUsed: number;
}
export interface Session {
  stats: SessionStats;
  config: Docker.DockerOptions;
  docker: Docker;
}

export const SESSION_ID = "sessionId";
export const SESSION_TIMEOUT_MS = 60 * 1000; // 1mn session timeout

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
