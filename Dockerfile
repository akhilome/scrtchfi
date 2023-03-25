FROM node:18-alpine

RUN apk add dumb-init

WORKDIR /app

COPY --chown=node:node package.json yarn.lock ./

RUN yarn --production --frozen-lockfile

COPY --chown=node:node . .

ENV PORT 80
EXPOSE 80

USER node

CMD [ "dumb-init", "node", "server.js" ]
