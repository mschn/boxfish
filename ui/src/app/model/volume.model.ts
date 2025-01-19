import { formatDistanceStrict } from 'date-fns';

export interface VolumeResponse {
  CreatedAt: string;
  Driver: string;
  Mountpoint: string;
  Name: string;
  Scope: string;
}

export interface Volume {
  name: string;
  mountPoint: string;
  created: string;
}

export function buildVolumes(volumes: VolumeResponse[]): Volume[] {
  return (
    volumes?.map((v) => ({
      name: v.Name,
      created: formatDistanceStrict(new Date(v.CreatedAt), Date.now(), {
        addSuffix: true,
      }),
      mountPoint: v.Mountpoint,
    })) ?? []
  );
}

export function getVolumeMock(props: Partial<Volume> = {}): Volume {
  return {
    name: 'volume_data',
    created: '2 days ago',
    mountPoint: '/mnt/data/',
    ...props,
  };
}
