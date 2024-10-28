import Docker from "dockerode";

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
