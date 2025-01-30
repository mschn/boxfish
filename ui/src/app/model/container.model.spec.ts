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
            Command: '/bin/bash',
            State: 'started',
            Status: 'OK',
            Created: 1577836800,
            Ports: [
              {
                IP: '0.0.0.0',
                PublicPort: 8080,
                PrivatePort: 80,
                Type: 'tcp',
              },
            ],
            Mounts: [
              {
                Type: 'volume',
                Source: '/foo',
                Destination: '/bar',
                Name: 'foo_bar',
              },
            ],
          } as unknown as Dockerode.ContainerInfo,
        ]),
      ).toEqual([
        {
          id: '123',
          project: 'stack',
          image: 'mschnr/boxfish',
          command: '/bin/bash',
          name: 'boxfish',
          state: 'started',
          status: 'OK',
          createdDate: new Date('2020-01-01'),
          ports: [
            {
              ip: '0.0.0.0',
              publicPort: 8080,
              privatePort: 80,
              type: 'tcp',
              url: `http://0.0.0.0:8080/`,
            },
          ],
          mounts: [
            {
              type: 'volume',
              source: '/foo',
              destination: '/bar',
              name: 'foo_bar',
            },
          ],
        },
      ]);
    });
  });
});
