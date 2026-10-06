# syntax=docker/dockerfile:1.7
# Builds one app of the monorepo as a small standalone Next.js image.
#   docker build -f docker/Dockerfile --build-arg APP=web -t taksu-web .
ARG NODE_VERSION=22-alpine

FROM node:${NODE_VERSION} AS base
ENV PNPM_HOME=/pnpm PATH=/pnpm:$PATH HUSKY=0 NEXT_TELEMETRY_DISABLED=1 TURBO_TELEMETRY_DISABLED=1
RUN corepack enable
WORKDIR /repo

FROM base AS pruner
ARG APP
COPY . .
RUN pnpm dlx turbo@2.11.7 prune @taksu/${APP} --docker

FROM base AS builder
ARG APP
ARG NEXT_PUBLIC_SITE_URL=http://localhost:3000
ARG NEXT_PUBLIC_KIOSK_URL=http://localhost:3001
ARG NEXT_PUBLIC_SIM_URL=http://localhost:3002
ARG NEXT_PUBLIC_WHATSAPP_NUMBER=
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_KIOSK_URL=$NEXT_PUBLIC_KIOSK_URL \
    NEXT_PUBLIC_SIM_URL=$NEXT_PUBLIC_SIM_URL \
    NEXT_PUBLIC_WHATSAPP_NUMBER=$NEXT_PUBLIC_WHATSAPP_NUMBER
COPY --from=pruner /repo/out/json/ .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY --from=pruner /repo/out/full/ .
RUN pnpm turbo run build --filter=@taksu/${APP}

FROM node:${NODE_VERSION} AS runner
ARG APP
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0 APP=${APP}
WORKDIR /app
RUN addgroup -S -g 1001 nodejs && adduser -S -u 1001 -G nodejs nextjs
COPY --from=builder --chown=nextjs:nodejs /repo/apps/${APP}/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /repo/apps/${APP}/.next/static ./apps/${APP}/.next/static
COPY --from=builder --chown=nextjs:nodejs /repo/apps/${APP}/public ./apps/${APP}/public
USER nextjs
EXPOSE 3000
CMD ["sh", "-c", "node apps/$APP/server.js"]
