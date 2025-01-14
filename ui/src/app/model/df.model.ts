import prettyBytes from 'pretty-bytes';

export interface DfResponse {
  LayersSize: number;
  Images: object[];
  Containers: object[];
  Volumes: object[];
  BuildCache: object[];
}

export interface Df {
  layersSize: number;
  layersSizeFormatted: string;
}

export function buildDf(response: DfResponse): Df {
  return {
    layersSize: response.LayersSize,
    layersSizeFormatted: prettyBytes(response.LayersSize),
  };
}
export function getDfMock(): Df {
  return {
    layersSize: 1234567,
    layersSizeFormatted: '12 GB',
  };
}
