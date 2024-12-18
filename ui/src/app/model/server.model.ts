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
  };
}
