FROM node:22-alpine
WORKDIR /app

COPY . .

WORKDIR /app/ui
RUN npm ci
RUN npm run build

WORKDIR /app/server
RUN npm ci

EXPOSE 3000
ENTRYPOINT [ "/usr/local/bin/npm", "run", "start" ]
