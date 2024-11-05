import Dockerode from 'dockerode';

export interface Container {
  id: string;
  image: string;
  name: string;
  state: string;
  status: string;
  ports: Port[];
  createdDate: Date;
}

export interface Port {
  ip: string;
  publicPort: number;
  privatePort: number;
  type: string;
  url: string;
}

export function buildContainers(
  containers: Dockerode.ContainerInfo[],
): Container[] {
  return containers?.map((container) => buildContainer(container)) ?? [];
}

export function buildContainer(container: Dockerode.ContainerInfo): Container {
  return {
    id: container.Id,
    image: container.Image,
    name: container.Names?.join('').substring(1),
    state: container.State,
    status: container.Status,
    createdDate: new Date(container.Created * 1000),
    ports: container.Ports.filter(
      (port) => port.PublicPort && port.IP !== '::',
    ).map((port) => buildPort(port)),
  };
}

function buildPort(port: Dockerode.Port): Port {
  return {
    ip: port.IP,
    publicPort: port.PublicPort,
    privatePort: port.PrivatePort,
    type: port.Type,
    url: `http://${port.IP}:${port.PublicPort}/`,
  };
}
