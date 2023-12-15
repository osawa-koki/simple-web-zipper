FROM node:20 as builder
WORKDIR /work/
COPY ./package.json ./yarn.lock ./
RUN yarn install --frozen-lockfile --non-interactive --production
COPY ./ ./
RUN yarn build

FROM nginx:1.25 as server
EXPOSE 80
COPY --from=builder /work/dist/ /usr/share/nginx/html/
