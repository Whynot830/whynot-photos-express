# dev
FROM node:22-alpine3.18 AS dev
RUN apk add --no-cache tzdata
ENV TZ Europe/Moscow
ENV NODE_PATH /opt/server/node_modules

WORKDIR /opt/server/

CMD [ "node" ]

# production
FROM node:22-alpine3.18 AS production
RUN apk add --no-cache tzdata
ENV TZ Europe/Moscow
ENV NODE_PATH /opt/server/node_modules

WORKDIR /opt/server/

COPY /*.json ./
RUN npm i

CMD ["npm", "run", "start"]