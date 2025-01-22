# Boxfish

[![Unit tests](https://github.com/mschn/boxfish/actions/workflows/unit_tests.yml/badge.svg)](https://github.com/mschn/boxfish/actions/workflows/unit_tests.yml) [![E2E tests](https://github.com/mschn/boxfish/actions/workflows/e2e_tests.yml/badge.svg)](https://github.com/mschn/boxfish/actions/workflows/e2e_tests.yml)

Boxfish is a UI for Docker that runs in a browser.\
You can use it to view images and containers running in your Docker platform.

<img src="ui/public/boxfish.svg" width="128" />

## Startup

You can run boxfish with the following command:

```bash
docker run -d --rm \
    --name boxfish \
    -p 3000:3000 \
    -v /var/run/docker.sock:/var/run/docker.sock \
    mschnr/boxfish
```

Boxfish needs to access your docker socket at `/var/run/docker.sock`.\
On some platforms this location can be different.\
See the `run.sh` helper script.

The boxfish image is hosted here: https://hub.docker.com/repository/docker/mschnr/boxfish/general

## Docker build

You can build and run the docker image from source instead of pulling from Dockerhub:

```bash
# build a docker image
sh build.sh
# run the docker image
sh run.sh
```

## Local developer setup

You can run Boxfish in dev mode outside docker by running the client and server separately.\
This assumes you have `npm` setup:

```bash
# Server startup:
cd server
npm i
npm run start
```

```bash
# UI startup:
cd ui
npm i
npm run start
```

## Built with

- [Angular](https://angular.dev/)
- [Tanstack Query](https://tanstack.com/query/latest/docs/framework/angular/overview)
- [PrimeNG](https://primeng.org/)
- [Fastify](https://fastify.dev/)
- [dockerode](https://github.com/apocas/dockerode)
- [Xterm.js](https://github.com/xtermjs/xterm.js)
