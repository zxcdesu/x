FROM docker.io/node:lts-alpine3.16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

ARG PRISMA
RUN if [ -n "$PRISMA" ]; \
    then \
      rm -rf apps/${PRISMA}/prisma/generated && \
      npx nx prisma-generate ${PRISMA}; \
    fi
