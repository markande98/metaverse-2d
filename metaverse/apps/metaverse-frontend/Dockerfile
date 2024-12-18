FROM node:18-alpine AS base


FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat
# Set working directory
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN npx turbo prune --scope=metaverse-frontend --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

# First install dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
RUN npm install

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

RUN cd packages/db && npx prisma generate
RUN cd packages/db && npx prisma migrate deploy

RUN npm run build

FROM base AS runner
WORKDIR /app


COPY --from=installer /app .

EXPOSE 5173

CMD cd apps/metaverse-frontend && npm run dev