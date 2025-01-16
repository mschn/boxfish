FROM node:18-alpine as build
WORKDIR /app

WORKDIR /app/ui
COPY ./ui/package*.json /app/ui/
RUN npm ci
COPY ./ui /app/ui
RUN npm run build
RUN npm prune --omit=dev

FROM node:18-alpine
WORKDIR /app
COPY --from=build /app/ui/dist /app/ui/dist

WORKDIR /app/server
COPY ./server/package* /app/server/
RUN npm ci
COPY ./server /app/server

EXPOSE 3000
ENTRYPOINT ["npm", "run", "start:prod"]
