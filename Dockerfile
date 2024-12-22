FROM node:22-alpine
WORKDIR /app

COPY ui/package*.json ./
WORKDIR /app/ui
RUN npm ci
COPY ui/ .
RUN npm run build

WORKDIR /app/
COPY server/package*.json ./
WORKDIR /app/server
RUN npm ci
COPY server/ .

EXPOSE 3000
CMD [ "npm", "run", "start" ]
