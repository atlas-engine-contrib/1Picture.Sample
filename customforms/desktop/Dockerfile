# build-state
FROM node:10 as react-build

ARG NPM_TOKEN
RUN echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > /root/.npmrc

WORKDIR /app

COPY package-lock.json package.json ./
RUN npm ci

COPY . ./
RUN npm run build

# run-stage
FROM nginx:alpine
COPY --from=react-build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
