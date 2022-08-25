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

# please read the note above
ARG NODE_ENV=development

# please read the note above
ARG DEFAULT_LANGUAGE_CODE
ARG LANGUAGE_CODES

# please read the note above
ARG REGION_CODES
ARG DEFAULT_REGION_CODE
ARG CURRENT_REGION_CODE

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

# hybris
ARG SHOP_BASE_URL
ARG SHOP_IMAGE_URL

# logging
ARG CONSOLA_LEVEL

# usercentrics
ARG USERCENTRICS_PRIVACY_PATH
ARG USERCENTRICS_ID

RUN \
  apk update \
  && apk add gettext

WORKDIR /src/

ADD . ./

RUN cat .env.template | envsubst >> .env

RUN mkdir -p build_logs

RUN npm ci && npm run build

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
ENV PORT=${PORT}
ENV HOST=${HOST}

ENV BASE_URL="${BASE_URL}"

# please read the note above
ENV NODE_ENV=${NODE_ENV}

# please read the note above
ENV DEFAULT_LANGUAGE_CODE="${DEFAULT_LANGUAGE_CODE}"
ENV LANGUAGE_CODES="${LANGUAGE_CODES}"

# please read the note above
ENV REGION_CODES="${REGION_CODES}"
ENV DEFAULT_REGION_CODE="${DEFAULT_REGION_CODE}"
ENV CURRENT_REGION_CODE="${CURRENT_REGION_CODE}"

# please read the note above
ENV STORYBLOK_OAUTH_TOKEN=''

ENV STORYBLOK_ACCESS_TOKEN=''
ENV STORYBLOK_SPACE_ID=${STORYBLOK_SPACE_ID}
ENV STORYBLOK_VERSION=${STORYBLOK_VERSION}

# please read the note above
ENV STORYBLOK_RESOLVE_RELATIONS="${STORYBLOK_RESOLVE_RELATIONS}"
ENV STORYBLOK_RESOLVE_LINKS="${STORYBLOK_RESOLVE_LINKS}"
ENV STORYBLOK_RESOLVE_ASSETS="${STORYBLOK_RESOLVE_ASSETS}"
ENV STORYBLOK_CONTENT_TYPES="${STORYBLOK_CONTENT_TYPES}"
ENV STORYBLOK_EXCLUDE_ROUTES="${STORYBLOK_EXCLUDE_ROUTES}"

ENV CI_COMMIT_SHORT_SHA="${CI_COMMIT_SHORT_SHA}"
ENV CI_COMMIT_REF_NAME="${CI_COMMIT_REF_NAME}"
ENV CI_PROJECT_URL="${CI_PROJECT_URL}"

#hybris
ENV SHOP_BASE_URL="${SHOP_BASE_URL}"
ENV SHOP_IMAGE_URL="${SHOP_IMAGE_URL}"

# logging
ENV CONSOLA_LEVEL="${CONSOLA_LEVEL}"

# usercentrics
ENV USERCENTRICS_PRIVACY_PATH="${USERCENTRICS_PRIVACY_PATH}"
ENV USERCENTRICS_ID="${USERCENTRICS_ID}"

# Create app directory
WORKDIR /opt/pvac-frontend

COPY --from=frontend-build /src/build_logs ./build_logs/

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY --from=frontend-build /src/package*.json ./
COPY --from=frontend-build /src/nuxt.config.js ./
COPY --from=frontend-build /src/i18n.config.js ./
COPY --from=frontend-build /src/.env ./

# Bundle app source
COPY --from=frontend-build /src/.nuxt .nuxt/
COPY --from=frontend-build /src/node_modules/ ./node_modules/
COPY --from=frontend-build /src/static ./static/
COPY --from=frontend-build /src/resolver ./resolver/
COPY --from=frontend-build /src/server ./server/
COPY --from=frontend-build /src/providers ./providers/
COPY --from=frontend-build /src/utils ./utils/

EXPOSE 3000

CMD [ "npm", "start" ]
