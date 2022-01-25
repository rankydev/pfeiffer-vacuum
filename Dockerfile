
FROM node:16-alpine

# TODO: Dies muss noch in das docker-compose file wandern
ARG NODE_PROFILE=ci
# TODO: Dies wird noch aufgelöst in die entsprechenden Variablen
ENV NODE_PROFILE="${NODE_PROFILE}"
# port of frontend application
ENV PORT=3000

# Create app directory
WORKDIR /opt/pvac-frontend

# Bundle app source
COPY .npm/ .
COPY .nuxt/ .
COPY node_modules/ .

EXPOSE 3000

CMD [ "npm", "start" ]
