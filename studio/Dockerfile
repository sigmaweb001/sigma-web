FROM registry.gviet.vn:5000/library/node:18-alpine as build-stage

WORKDIR /app
RUN corepack enable
RUN corepack prepare pnpm@8.6.2 --activate

COPY .npmrc pnpm-lock.yaml ./

RUN pnpm fetch

COPY . .

RUN pnpm install -r --prefer-offline --frozen-lockfile

RUN pnpm build

FROM registry.gviet.vn:5000/library/nginx:stable-alpine AS production
#  server nginx in production
COPY --from=build-stage /app/dist /usr/share/nginx/html

# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]