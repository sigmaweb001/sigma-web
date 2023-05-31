FROM node:18

RUN npm install -g pnpm

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# RUN npm ci && npm cache clean --force
COPY pnpm-lock.yaml ./

COPY package.json ./

RUN pnpm install

ADD . ./

RUN pnpm run build

# ARG ALGOLIA_APP_ID
# ENV ALGOLIA_APP_ID=${ALGOLIA_APP_ID}
# ARG ALGOLIA_API_KEY
# ENV ALGOLIA_API_KEY=${ALGOLIA_API_KEY}

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=8080
ENV PORT=8080

EXPOSE 8080

ENTRYPOINT ["node", ".starters/default/.output/server/index.mjs"]
