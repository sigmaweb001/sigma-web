ARG NODE_VERSION=node:16-alpine

FROM $NODE_VERSION AS dependency-base

# create destination directory
RUN mkdir -p /app
WORKDIR /app
RUN corepack enable

COPY .npmrc package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY .starters/default/.npmrc .starters/default/package.json ./.starters/default/
RUN pnpm install

FROM dependency-base AS production-base
COPY . .
RUN pnpm build

#
FROM $NODE_VERSION AS production
COPY --from=production-base /app/.starters/default/.output /app/.starters/default/.output

# Service hostname
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=8080
ENV PORT=8080

ENV NODE_ENV=production
EXPOSE 8080
# start the app
ENTRYPOINT ["node", "app/.starters/default/.output/server/index.mjs"]
