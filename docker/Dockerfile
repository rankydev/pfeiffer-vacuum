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
ARG PORT=3000
ARG HOST='0.0.0.0'

ARG BASE_URL='https://localhost:3000'
ARG DOMAIN='https://localhost:3000'

# please read the note above
ARG NODE_ENV=development

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

ARG CI_COMMIT_SHORT_SHA
ARG CI_COMMIT_REF_NAME
ARG CI_PROJECT_URL

RUN \
  apk update \
  && apk add gettext

WORKDIR /src/

ADD . ./

RUN cat .env.template | envsubst >> .env

RUN mkdir -p build_logs

RUN \
  npm install &> build_logs/npm_install.log \
  && npm ci  &> build_logs/npm_ci.log \
  && npm run build &> build_logs/npm_build.log

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
ENV HOST='0.0.0.0'

ENV BASE_URL='https://localhost:3000'

# please read the note above
ENV NODE_ENV=development

# please read the note above
ENV DEFAULT_LANGUAGE_CODE='en'
ENV LANGUAGE_CODES='de,ko,zh,en'

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
ENV STORYBLOK_REGIONS=global
ENV STORYBLOK_DEFAULT_REGION=global

ENV CI_COMMIT_SHORT_SHA="${CI_COMMIT_SHORT_SHA}"
ENV CI_COMMIT_REF_NAME="${CI_COMMIT_REF_NAME}"
ENV CI_PROJECT_URL="${CI_PROJECT_URL}"

# Create app directory
WORKDIR /opt/pvac-frontend

COPY --from=frontend-build /src/build_logs ./build_logs/

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY --from=frontend-build /src/package*.json ./
COPY --from=frontend-build /src/nuxt.config.js ./
COPY --from=frontend-build /src/.env ./

# Bundle app source
COPY --from=frontend-build /src/.nuxt .nuxt/
COPY --from=frontend-build /src/node_modules/ ./node_modules/
COPY --from=frontend-build /src/static ./static/
COPY --from=frontend-build /src/resolver ./resolver/

EXPOSE 3000

CMD [ "npm", "start" ]
