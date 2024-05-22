FROM registry.gviet.vn:5000/library/node:18-alpine as build-stage

WORKDIR /app
RUN npm install -g pnpm@8

COPY . .

ENV NUXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lejt7ElAAAAALNFyfDMb8_dlRbbi7EMCJEK_tT2
ENV NUXT_PUBLIC_GTAG_ID=G-BV8FJFFZLR

RUN pnpm install

RUN env NODE_OPTIONS="--max_old_space_size=4096" pnpm generate

FROM registry.gviet.vn:5000/library/nginx:stable-alpine as production-stage
COPY --from=build-stage /app/.output/public /usr/share/nginx/html
