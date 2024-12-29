# Boxfish

Boxfish is a basic web app to view you Docker containers and images.

## Startup

To run Boxfish you need to have Docker running.\
Assuming Docker is running, here's how you can build and run the image:

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

## Docker

Some helpful docker commands:

```bash
# Inspect the docker image
docker run --rm -it --entrypoint /bin/sh mschnr/boxfish
```

## Built with

- [Angular](https://angular.dev/)
- [Tanstack Query](https://tanstack.com/query/latest/docs/framework/angular/overview)
- [PrimeNG](https://primeng.org/)
- [Fastify](https://fastify.dev/)
- [dockerode](https://github.com/apocas/dockerode)
