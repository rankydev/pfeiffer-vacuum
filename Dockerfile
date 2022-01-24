
FROM node:16-alpine

ARG NODE_PROFILE=ci
ENV NODE_PROFILE="${NODE_PROFILE}"
ENV NODE_ENV="production"

ARG CI_COMMIT_SHA
ARG CI_COMMIT_SHORT_SHA
ARG CI_COMMIT_REF_NAME

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY .npm/ .
COPY .nuxt/ .
COPY node_modules/ .

EXPOSE 3000

CMD [ "npm", "start" ]
