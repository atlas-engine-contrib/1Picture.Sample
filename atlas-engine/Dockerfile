FROM node AS builder

# Create Directory for the Container
WORKDIR /usr/src/
# Only copy the package.json file to work directory
COPY plugins/package.json .
# Install all Packages
RUN npm install
# Copy all other source code to work directory
COPY plugins/ /usr/src/
# TypeScript
RUN npm run build

FROM 5minds/atlas_engine_fullstack_server:12.0.3

COPY --from=builder /usr/src/dist /plugins/telegraf_plugin/dist
COPY --from=builder /usr/src/node_modules /plugins/telegraf_plugin/node_modules
COPY --from=builder /usr/src/package.json /plugins/telegraf_plugin/




CMD ["/bin/index.js", "--extensions-dir", "/plugins/"]
