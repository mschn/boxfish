import { formatDistanceStrict } from 'date-fns';
import Dockerode from 'dockerode';
import prettyBytes from 'pretty-bytes';

export interface Image {
  name?: string;
  version?: string;
  id: string;
  size: string;
  created: string;
}

export function buildImages(images: Dockerode.ImageInfo[]): Image[] {
  return images.map((image) => buildImage(image));
}

export function buildImage(image: Dockerode.ImageInfo): Image {
  const tagSplit = image.RepoTags?.[0]?.split(':');
  const id = image.Id.substring(7, 19);
  return {
    name: tagSplit?.[0],
    version: tagSplit?.[1],
    id,
    size: prettyBytes(image.Size),
    created: formatDistanceStrict(image.Created * 1000, Date.now(), {
      addSuffix: true,
    }),
  };
}
