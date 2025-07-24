FROM node:18-alpine as build-stage

WORKDIR /app
RUN npm install -g pnpm@10.5.2

COPY . .

ENV NUXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lejt7ElAAAAALNFyfDMb8_dlRbbi7EMCJEK_tT2
ENV NUXT_PUBLIC_GTAG_ID=G-BV8FJFFZLR
ENV NUXT_UI_PRO_LICENSE=1234567890
ENV NUXT_PUBLIC_SSAI_MANUAL_URL=https://api.sigma.video/api/sigma-demo-ssai/sessions/{sessionId}
ENV NUXT_PUBLIC_PLAYER_URL=https://dai.sigma.video/manifest/manipulation/master/c52c9a83-fad5-4f8f-b233-a6315ca21ede/{sessionId}/manifest/normal/master.m3u8
ENV NUXT_PUBLIC_SSAI_URL=https://dai.sigma.video/manifest/manipulation/master/c52c9a83-fad5-4f8f-b233-a6315ca21ede/manifest/stce-35-demo/master.m3u8
ENV NUXT_PUBLIC_SSAI_ADS_ENDPOINT=c52c9a83-fad5-4f8f-b233-a6315ca21ede
ENV NUXT_PUBLIC_SSAI_AI_RAW_URL=https://cdn-demo-livestreaming.sigma.video/manifest/stce-35-demo/master.m3u8
ENV NUXT_PUBLIC_SSAI_AI_ADS_URL=https://dai.sigma.video/manifest/manipulation/master/c52c9a83-fad5-4f8f-b233-a6315ca21ede/manifest/stce-35-demo/master.m3u8

RUN pnpm install

RUN env NODE_OPTIONS="--max_old_space_size=4096" pnpm build

FROM node:20-alpine AS production-stage
WORKDIR /src

COPY --from=build-stage /app/.output/public ./build
RUN npm install -g serve

EXPOSE 80
CMD ["serve", "build", "-p", "80"]
