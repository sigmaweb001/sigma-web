FROM registry.gviet.vn:5000/library/node:18-alpine as build-stage

WORKDIR /app
RUN corepack enable
RUN corepack prepare pnpm@8.6.2 --activate

COPY .npmrc pnpm-lock.yaml ./

RUN pnpm fetch

COPY . .

RUN pnpm install -r --prefer-offline --frozen-lockfile

RUN pnpm build

FROM registry.gviet.vn:5000/library/node:18-alpine AS production
COPY --from=build-stage /app/.output /app/.output

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=8080
ENV PORT=8080

ENV NODE_ENV=production
EXPOSE 8080

ENTRYPOINT ["node", "app/.output/server/index.mjs"]
