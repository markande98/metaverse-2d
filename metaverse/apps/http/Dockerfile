FROM node:20-alpine3.17 as base


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

ARG DATABASE_URL
ARG HTTP_PORT
ARG JWT_SECRET
ARG ADMIN_USER
ARG ADMIN_SECRET

ENV DATABASE_URL=${DATABASE_URL}
ENV HTTP_PORT=${HTTP_PORT}
ENV JWT_SECRET=${JWT_SECRET}
ENV ADMIN_USER=${ADMIN_USER}
ENV ADMIN_SECRET=${ADMIN_SECRET}

RUN cd packages/db && npx prisma generate
RUN cd packages/db && npx prisma migrate deploy

RUN npm run build

FROM base AS runner
WORKDIR /app


COPY --from=installer /app .

EXPOSE 3000

CMD cd apps/http && npm run dev