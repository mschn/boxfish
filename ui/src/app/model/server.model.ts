import Dockerode from 'dockerode';

export interface ServerInfo {
  config: Dockerode.DockerOptions;
  info: {
    Architecture: string;
    Containers: number;
    Images: number;
    MemTotal: number;
    NCPU: number;
    OperatingSystem: string;
    OSType: string;
    ServerVersion: string;
    Name: string;
  };
}

export const SERVER_BASE = `${window.location.hostname}:3000`;
export const API_URL = `http://${SERVER_BASE}/api/`;
export const WS_API_URL = `ws://${SERVER_BASE}/api/`;

export type ServerError = Error & { error: { message: string } };

export function getServerInfoMock(props: Partial<ServerInfo> = {}): ServerInfo {
  return {
    config: { socketPath: '/Users/mschnoor/.colima/docker.sock' },
    info: {
      Architecture: 'aarch64',
      Containers: 2,
      Images: 4,
      MemTotal: 2054959104,
      NCPU: 2,
      OperatingSystem: 'Ubuntu 24.04.1 LTS',
      OSType: 'linux',
      ServerVersion: '27.3.1',
      Name: 'docker',
    },
    ...props,
  };
}
