# Install dependencies only when needed
FROM docker.io/node:20.9-alpine as deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/app
COPY dist/apps/mailings/package*.json ./
RUN npm install --only=production

# Production image, copy all the files and run nest
FROM docker.io/node:20.9-alpine as runner
RUN apk add --no-cache dumb-init
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=deps /usr/src/app/package.json ./package.json
COPY dist/apps/mailings .
COPY apps/mailings/prisma/generated/libquery_engine-linux-musl-openssl-3.0.x.so.node /usr/src
RUN chown -R node:node .
USER node
CMD ["dumb-init", "node", "main.js"]
