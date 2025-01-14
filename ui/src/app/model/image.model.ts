import { formatDistanceStrict } from 'date-fns';
import Dockerode from 'dockerode';
import prettyBytes from 'pretty-bytes';

export interface Image {
  name?: string;
  version?: string;
  shortId: string;
  id: string;
  size: string;
  created: string;
}

export function buildImages(images: Dockerode.ImageInfo[]): Image[] {
  return images.map((image) => buildImage(image));
}

export function buildImage(image: Dockerode.ImageInfo): Image {
  const tagSplit = image.RepoTags?.[0]?.split(':');
  const shortId = image.Id.substring(7, 19);
  return {
    name: tagSplit?.[0],
    version: tagSplit?.[1],
    id: image.Id,
    shortId,
    size: prettyBytes(image.Size),
    created: formatDistanceStrict(image.Created * 1000, Date.now(), {
      addSuffix: true,
    }),
  };
}

export function getImageMock(props: Partial<Image> = {}): Image {
  return {
    name: 'mschnr/boxfish',
    version: '1.0.2',
    shortId: '5c7127e329c2',
    id: '443a1db32605fecbfa36ebe1a86c7a5cc358476eeb3c06f37b3629bd43a1c1a0',
    size: '723 MB',
    created: '2 days ago',
    ...props,
  };
}
