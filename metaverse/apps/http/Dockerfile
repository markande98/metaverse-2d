FROM node:18-alpine AS base


FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat
# Set working directory
WORKDIR /app
RUN npm install turbo --global
COPY . .
RUN npx turbo prune --scope=http --docker

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

RUN cd packages/db && npx prisma migrate dev --name init
RUN cd packages/db && npx prisma generate

RUN npm run build

FROM base AS runner
WORKDIR /app


COPY --from=installer /app .

EXPOSE 3000

CMD cd apps/http && npm run dev