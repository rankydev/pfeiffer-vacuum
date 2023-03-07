########################################################################################################################
# begin frontend-build image
########################################################################################################################
FROM node:16-alpine  as frontend-build

# only for build-image
ARG CI

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

ARG STORYBLOK_IMAGE_BASE_URL

ARG CI_COMMIT_SHORT_SHA
ARG CI_COMMIT_REF_NAME
ARG CI_PROJECT_URL

# hybris
ARG SHOP_BASE_URL
ARG SHOP_IMAGE_URL

# keycloak
ARG KEYCLOAK_BASE_URL
ARG KEYCLOAK_REALM_NAME
ARG KEYCLOAK_CLIENT_ID

# empolis
ARG EMPOLIS_TIMEOUT
ARG EMPOLIS_STAGE
ARG EMPOLIS_PATH
ARG EMPOLIS_GUEST_TOKEN_URL
ARG EMPOLIS_SSO_PATH
ARG EMPOLIS_AUTH_URL
ARG EMPOLIS_USERNAME_CUSTOMER
ARG EMPOLIS_PASSWORD_CUSTOMER
ARG EMPOLIS_USERNAME_INTERNAL_LEVEL_0
ARG EMPOLIS_PASSWORD_INTERNAL_LEVEL_0
ARG EMPOLIS_USERNAME_INTERNAL_LEVEL_1
ARG EMPOLIS_PASSWORD_INTERNAL_LEVEL_1
ARG EMPOLIS_USERNAME_INTERNAL_LEVEL_2
ARG EMPOLIS_PASSWORD_INTERNAL_LEVEL_2
ARG EMPOLIS_CLIENT_ID
ARG EMPOLIS_CLIENT_SECRET

# logging
ARG CONSOLA_LEVEL

# usercentrics
ARG USERCENTRICS_PRIVACY_PATH
ARG USERCENTRICS_ID

# google tag manager
ARG GOOGLE_TAG_MANAGER_ID

ARG STORYBLOK_API_BASE_URL
ARG DISABLE_SECURITY_POLICY_FORM_ACTION_SELF

# only for build-image
ENV CI=${CI}
ENV NODE_ENV=${NODE_ENV}

RUN \
  apk update \
  && apk add gettext

WORKDIR /src/

ADD . ./

RUN cat .env.template | envsubst >> .env

RUN mkdir -p build_logs

# Due to an error in the '@nuxtjs/eslint-module' (https://github.com/nuxt-community/eslint-module/issues/37)
# the es-lint dependency needs to be in node_modules even for builds with NODE_ENV=production
# (Solution: https://github.com/nuxt-community/eslint-module/issues/37#issuecomment-674745140)
# thus we ensure using NODE_ENV=development for npm ci to get all dependencies
# and than run npm run build with NODE_ENV with the given value from the pipeline.
ENV NODE_ENV=development

RUN npm ci

# see comment in lines 108 ff
ENV NODE_ENV=${NODE_ENV}

RUN npm run build

########################################################################################################################
# end frontend-build image
########################################################################################################################
########################################################################################################################
# begin production image
########################################################################################################################
FROM node:16-alpine

# port of frontend application
ARG PORT
ARG HOST

ARG BASE_URL

# please read the note above
ARG NODE_ENV

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

ARG STORYBLOK_IMAGE_BASE_URL

ARG CI_COMMIT_SHORT_SHA
ARG CI_COMMIT_REF_NAME
ARG CI_PROJECT_URL

# hybris
ARG SHOP_BASE_URL
ARG SHOP_IMAGE_URL

# keycloak
ARG KEYCLOAK_BASE_URL
ARG KEYCLOAK_REALM_NAME
ARG KEYCLOAK_CLIENT_ID

# empolis
ARG EMPOLIS_TIMEOUT
ARG EMPOLIS_STAGE
ARG EMPOLIS_PATH
ARG EMPOLIS_GUEST_TOKEN_URL
ARG EMPOLIS_SSO_PATH
ARG EMPOLIS_AUTH_URL
ARG EMPOLIS_USERNAME_CUSTOMER
ARG EMPOLIS_PASSWORD_CUSTOMER
ARG EMPOLIS_USERNAME_INTERNAL_LEVEL_0
ARG EMPOLIS_PASSWORD_INTERNAL_LEVEL_0
ARG EMPOLIS_USERNAME_INTERNAL_LEVEL_1
ARG EMPOLIS_PASSWORD_INTERNAL_LEVEL_1
ARG EMPOLIS_USERNAME_INTERNAL_LEVEL_2
ARG EMPOLIS_PASSWORD_INTERNAL_LEVEL_2
ARG EMPOLIS_CLIENT_ID
ARG EMPOLIS_CLIENT_SECRET

# logging
ARG CONSOLA_LEVEL

# usercentrics
ARG USERCENTRICS_PRIVACY_PATH
ARG USERCENTRICS_ID

# google tag manager
ARG GOOGLE_TAG_MANAGER_ID

ARG STORYBLOK_API_BASE_URL

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
ENV STORYBLOK_OAUTH_TOKEN=${STORYBLOK_OAUTH_TOKEN}

ENV STORYBLOK_ACCESS_TOKEN=${STORYBLOK_ACCESS_TOKEN}
ENV STORYBLOK_SPACE_ID=${STORYBLOK_SPACE_ID}
ENV STORYBLOK_VERSION=${STORYBLOK_VERSION}

# please read the note above
ENV STORYBLOK_RESOLVE_RELATIONS="${STORYBLOK_RESOLVE_RELATIONS}"
ENV STORYBLOK_RESOLVE_LINKS="${STORYBLOK_RESOLVE_LINKS}"
ENV STORYBLOK_RESOLVE_ASSETS="${STORYBLOK_RESOLVE_ASSETS}"
ENV STORYBLOK_CONTENT_TYPES="${STORYBLOK_CONTENT_TYPES}"
ENV STORYBLOK_EXCLUDE_ROUTES="${STORYBLOK_EXCLUDE_ROUTES}"

ENV STORYBLOK_IMAGE_BASE_URL="${STORYBLOK_IMAGE_BASE_URL}"

ENV CI_COMMIT_SHORT_SHA="${CI_COMMIT_SHORT_SHA}"
ENV CI_COMMIT_REF_NAME="${CI_COMMIT_REF_NAME}"
ENV CI_PROJECT_URL="${CI_PROJECT_URL}"

# hybris
ENV SHOP_BASE_URL="${SHOP_BASE_URL}"
ENV SHOP_IMAGE_URL="${SHOP_IMAGE_URL}"

# keycloak
ENV KEYCLOAK_BASE_URL="${KEYCLOAK_BASE_URL}"
ENV KEYCLOAK_REALM_NAME="${KEYCLOAK_REALM_NAME}"
ENV KEYCLOAK_CLIENT_ID="${KEYCLOAK_CLIENT_ID}"

# empolis
ENV EMPOLIS_TIMEOUT="${EMPOLIS_TIMEOUT}"
ENV EMPOLIS_STAGE="${EMPOLIS_STAGE}"
ENV EMPOLIS_PATH="${EMPOLIS_PATH}"
ENV EMPOLIS_GUEST_TOKEN_URL="${EMPOLIS_GUEST_TOKEN_URL}"
ENV EMPOLIS_SSO_PATH="${EMPOLIS_SSO_PATH}"
ENV EMPOLIS_AUTH_URL="${EMPOLIS_AUTH_URL}"
ENV EMPOLIS_USERNAME_CUSTOMER="${EMPOLIS_USERNAME_CUSTOMER}"
ENV EMPOLIS_PASSWORD_CUSTOMER="${EMPOLIS_PASSWORD_CUSTOMER}"
ENV EMPOLIS_USERNAME_INTERNAL_LEVEL_0="${EMPOLIS_USERNAME_INTERNAL_LEVEL_0}"
ENV EMPOLIS_PASSWORD_INTERNAL_LEVEL_0="${EMPOLIS_PASSWORD_INTERNAL_LEVEL_0}"
ENV EMPOLIS_USERNAME_INTERNAL_LEVEL_1="${EMPOLIS_USERNAME_INTERNAL_LEVEL_1}"
ENV EMPOLIS_PASSWORD_INTERNAL_LEVEL_1="${EMPOLIS_PASSWORD_INTERNAL_LEVEL_1}"
ENV EMPOLIS_USERNAME_INTERNAL_LEVEL_2="${EMPOLIS_USERNAME_INTERNAL_LEVEL_2}"
ENV EMPOLIS_PASSWORD_INTERNAL_LEVEL_2="${EMPOLIS_PASSWORD_INTERNAL_LEVEL_2}"
ENV EMPOLIS_CLIENT_ID="${EMPOLIS_CLIENT_ID}"
ENV EMPOLIS_CLIENT_SECRET="${EMPOLIS_CLIENT_SECRET}"

# logging
ENV CONSOLA_LEVEL="${CONSOLA_LEVEL}"

# usercentrics
ENV USERCENTRICS_PRIVACY_PATH="${USERCENTRICS_PRIVACY_PATH}"
ENV USERCENTRICS_ID="${USERCENTRICS_ID}"

# google tag manager
ENV GOOGLE_TAG_MANAGER_ID="${GOOGLE_TAG_MANAGER_ID}"

ENV STORYBLOK_API_BASE_URL="${STORYBLOK_API_BASE_URL}"
ENV DISABLE_SECURITY_POLICY_FORM_ACTION_SELF="${DISABLE_SECURITY_POLICY_FORM_ACTION_SELF}"

RUN \
  apk update \
  && apk add gettext

# Create app directory
WORKDIR /opt/pvac-frontend

COPY --from=frontend-build /src/build_logs ./build_logs/

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY --from=frontend-build /src/package*.json ./
COPY --from=frontend-build /src/nuxt.config.js ./
COPY --from=frontend-build /src/i18n.config.js ./

# Bundle app source
COPY --from=frontend-build /src/.nuxt .nuxt/
COPY --from=frontend-build /src/node_modules/ ./node_modules/
COPY --from=frontend-build /src/static ./static/
COPY --from=frontend-build /src/resolver ./resolver/
COPY --from=frontend-build /src/server ./server/
COPY --from=frontend-build /src/providers ./providers/
COPY --from=frontend-build /src/composables ./composables/

COPY /.env.template ./
RUN cat .env.template | envsubst >> .env
RUN rm .env.template

EXPOSE 3000

CMD [ "npm", "start" ]
