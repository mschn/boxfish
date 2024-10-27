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
