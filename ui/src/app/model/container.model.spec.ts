import Dockerode from 'dockerode';
import { buildContainers } from './container.model';

describe('Container model', () => {
  describe('buildContainers', () => {
    it('should handle empty values', () => {
      expect(buildContainers(null)).toEqual([]);
    });

    it('should build a container', () => {
      expect(
        buildContainers([
          {
            Id: '123',
            Labels: {
              'com.docker.compose.project': 'stack',
            },
            Image: 'mschnr/boxfish',
            Names: ['/stack-boxfish'],
            State: 'started',
            Status: 'OK',
            Created: 1577836800,
            Ports: [],
          } as unknown as Dockerode.ContainerInfo,
        ]),
      ).toEqual([
        {
          id: '123',
          project: 'stack',
          image: 'mschnr/boxfish',
          name: 'boxfish',
          state: 'started',
          status: 'OK',
          createdDate: new Date('2020-01-01'),
          ports: [],
        },
      ]);
    });
  });
});
