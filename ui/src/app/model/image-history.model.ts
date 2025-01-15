import prettyBytes from 'pretty-bytes';

export interface ImageHistoryResponse {
  Comment: string;
  Created: string;
  CreatedBy: string;
  Id: string;
  Size: number;
}

export interface ImageHistory {
  createdAt: Date;
  size: string;
  command: string;
}

export function buildImageHistory(
  response: ImageHistoryResponse[],
): ImageHistory[] {
  const history =
    response?.map((r) => ({
      createdAt: new Date(r.Created),
      size: prettyBytes(r.Size),
      command: r.CreatedBy,
    })) ?? [];
  return history.reverse();
}

export function getImageHistoryMock(
  props: Partial<ImageHistory> = {},
): ImageHistory {
  return {
    createdAt: new Date('2020-10-10'),
    size: '25 MB',
    command: 'RUN npm ci',
    ...props,
  };
}
