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
  command: string;
  mounts: Mount[];
}

export interface Mount {
  source: string;
  destination: string;
  name?: string;
  type: 'bind' | 'volume' | string;
}

interface MountResponse {
  Source: string;
  Destination: string;
  Name?: string;
  Type: 'bind' | 'volume' | string;
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
  containers: Dockerode.ContainerInfo[] | null,
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
    command: container.Command,
    mounts: container.Mounts.map((m) => buildMount(m)),
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

function buildMount(mount: MountResponse): Mount {
  return {
    source: mount.Source,
    destination: mount.Destination,
    name: mount.Name,
    type: mount.Type,
  };
}

export function getContainerMock(props: Partial<Container> = {}): Container {
  return {
    id: '6977eea0b1c047ef2dc0c3c27fd84f8f4f256739aee67501d8640cb2c8e38712',
    project: 'big-stack',
    image: 'mschn/boxfish',
    name: 'boxfish-1',
    state: 'running',
    status: 'Up 6 days (unhealthy)',
    createdDate: new Date('2024-12-12T14:39:59.000Z'),
    ports: [
      {
        ip: '0.0.0.0',
        publicPort: 3000,
        privatePort: 3000,
        type: 'tcp',
        url: 'http://0.0.0.0:3000/',
      },
      {
        ip: '0.0.0.0',
        publicPort: 4200,
        privatePort: 4200,
        type: 'tcp',
        url: 'http://0.0.0.0:4200/',
      },
    ],
    mounts: [
      {
        source: '/foo/bar',
        destination: '/bar/baz',
        type: 'volume',
        name: 'foo_bar',
      },
    ],
    command: '/bin/bash',
    ...props,
  };
}
