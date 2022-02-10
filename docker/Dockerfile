
FROM node:16-alpine

# TODO: Dies muss noch in das docker-compose file wandern
ARG NODE_PROFILE=ci
# TODO: Dies wird noch aufgelöst in die entsprechenden Variablen
ENV NODE_PROFILE="${NODE_PROFILE}"
# port of frontend application
ENV PORT=3000
ENV HOST=0.0.0.0

# Create app directory
WORKDIR /opt/pvac-frontend

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY nuxt.config.js ./

# Bundle app source
COPY .nuxt .nuxt/
COPY node_modules/ ./node_modules/
COPY static ./

EXPOSE 3000

CMD [ "npm", "start" ]
