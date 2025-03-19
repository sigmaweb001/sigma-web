FROM node:18-alpine as build-stage

WORKDIR /app
RUN npm install -g pnpm@10.5.2

COPY . .

ENV NUXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lejt7ElAAAAALNFyfDMb8_dlRbbi7EMCJEK_tT2
ENV NUXT_PUBLIC_GTAG_ID=G-BV8FJFFZLR
ENV NUXT_UI_PRO_LICENSE=1234567890

RUN pnpm install

RUN env NODE_OPTIONS="--max_old_space_size=4096" pnpm build

FROM node:20-alpine AS production-stage
WORKDIR /src

COPY --from=build-stage /app/.output/public ./
RUN npm install -g serve

EXPOSE 80
CMD ["serve", "build", "-p", "80"]