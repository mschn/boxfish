FROM node:18-alpine AS build
WORKDIR /app

WORKDIR /app/ui
COPY ./ui/package*.json /app/ui/
RUN npm ci
COPY ./ui /app/ui
RUN npm run build

WORKDIR /app/server
COPY ./server/package* /app/server/
RUN npm ci
COPY ./server /app/server
RUN npx tsc
RUN npm prune --production

FROM node:18-alpine
COPY --from=build /app/ui/dist /app/ui/dist
COPY --from=build /app/server/dist /app/server/dist
COPY --from=build /app/server/node_modules /app/server/node_modules
COPY ./version.txt /app/server/dist/
WORKDIR /app/server

EXPOSE 3000
ENTRYPOINT ["node", "dist/server.js"]
