FROM node:20-alpine3.17 as base


FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat
# Set working directory
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN npx turbo prune --scope=ws --docker

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
ARG JWT_SECRET
ARG WS_PORT

ENV DATABASE_URL=${DATABASE_URL}
ENV JWT_SECRET=${JWT_SECRET}
ENV WS_PORT=${WS_PORT}

RUN cd packages/db && npx prisma generate
RUN cd packages/db && npx prisma migrate deploy

RUN npm run build

FROM base AS runner
WORKDIR /app


COPY --from=installer /app .

EXPOSE 3001

CMD cd apps/ws && npm run dev