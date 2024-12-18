import Dockerode from 'dockerode';

export interface Stack {
  name: string;
  containers: Container[];
}

export interface Container {
  id: string;
  project: string;
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

export function buildStacks(containers: Dockerode.ContainerInfo[]): Stack[] {
  const stacks = buildContainers(containers).reduce(
    (acc, container) => {
      if (!acc[container.project]) {
        acc[container.project] = {
          name: container.project,
          containers: [],
        };
      }
      acc[container.project].containers.push(container);
      return acc;
    },
    {} as Record<string, Stack>,
  );
  return Object.values(stacks);
}

export function buildContainers(
  containers: Dockerode.ContainerInfo[],
): Container[] {
  return containers?.map((container) => buildContainer(container)) ?? [];
}

export function buildContainer(container: Dockerode.ContainerInfo): Container {
  return {
    id: container.Id,
    project: getProject(container),
    image: container.Image,
    name: buildName(container),
    state: container.State,
    status: container.Status,
    createdDate: new Date(container.Created * 1000),
    ports: container.Ports.filter(
      (port) => port.PublicPort && port.IP !== '::',
    ).map((port) => buildPort(port)),
  };
}

function getProject(container: Dockerode.ContainerInfo): string {
  return container.Labels['com.docker.compose.project'];
}

function buildName(container: Dockerode.ContainerInfo): string {
  const name = container.Names?.join('').substring(1);
  const project = getProject(container);
  if (name.startsWith(project + '-')) {
    return name.substring(project.length + 1);
  }
  return name;
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
