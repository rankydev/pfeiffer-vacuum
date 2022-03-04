########################################################################################################################
# begin frontend-build image
########################################################################################################################
FROM node:16-alpine  as frontend-build

# !!! IMPORTANT NOTE !!!
# ENV variables will be set by either
#   - pipeline
#   - docker-compose
#   - orchestrating environment, i.e., kubernetes

# port of frontend application
ARG PORT
ARG HOST

ARG BASE_URL

# please read the note above
ARG NODE_ENV

# please read the note above
ARG DEFAULT_LANGUAGE_CODE

# please read the note above
ARG STORYBLOK_OAUTH_TOKEN

ARG STORYBLOK_ACCESS_TOKEN
ARG STORYBLOK_SPACE_ID
ARG STORYBLOK_VERSION

# please read the note above
ARG STORYBLOK_RESOLVE_RELATIONS
ARG STORYBLOK_RESOLVE_LINKS
ARG STORYBLOK_RESOLVE_ASSETS
ARG STORYBLOK_CONTENT_TYPES
ARG STORYBLOK_EXCLUDE_ROUTES

RUN \
  apk update \
  && apk add gettext

WORKDIR /src/

ADD package.json ./
ADD . ./

RUN cat .env.template | envsubst >> .env
RUN \
  npm install  \
  && npm ci  \
  && npm run build

########################################################################################################################
# end frontend-build image
########################################################################################################################
########################################################################################################################
# begin production image
########################################################################################################################
FROM node:16-alpine

# !!! IMPORTANT NOTE !!!
# ENV variables will be set by either
#   - pipeline
#   - docker-compose
#   - orchestrating environment, i.e., kubernetes

# port of frontend application
ENV PORT=3000
ENV HOST='0'

ENV BASE_URL='https://localhost:3000'

# please read the note above
ENV NODE_ENV=development

# please read the note above
ENV DEFAULT_LANGUAGE_CODE='en'

# please read the note above
ENV STORYBLOK_OAUTH_TOKEN=''

ENV STORYBLOK_ACCESS_TOKEN=''
ENV STORYBLOK_SPACE_ID=''
ENV STORYBLOK_VERSION=''

# please read the note above
ENV STORYBLOK_RESOLVE_RELATIONS=Page.template
ENV STORYBLOK_RESOLVE_LINKS=''
ENV STORYBLOK_RESOLVE_ASSETS=''
ENV STORYBLOK_CONTENT_TYPES=Page
ENV STORYBLOK_EXCLUDE_ROUTES=^\/[a-z]{2}\/home$

# Create app directory
WORKDIR /opt/pvac-frontend


# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY --from=frontend-build /src/package*.json ./
COPY --from=frontend-build /src/nuxt.config.js ./

# Bundle app source
COPY --from=frontend-build /src/.nuxt .nuxt/
COPY --from=frontend-build /src/node_modules/ ./node_modules/
COPY --from=frontend-build /src/static ./static/

EXPOSE 3000

CMD [ "npm", "start" ]
