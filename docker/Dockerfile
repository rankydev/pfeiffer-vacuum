
FROM node:16-alpine

# !!! IMPORTANT NOTE !!!
# ENV variables will be set by either
#   - pipeline
#   - docker-compose
#   - orchestrating environment, i.e., kubernetes

# port of frontend application
ENV PORT=3000
ENV HOST=0.0.0.0

# please read the note above
ENV NODE_ENV=development

# please read the note above
ENV DEFAULT_LANGUAGE_CODE='en'

# please read the note above
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
COPY package*.json ./
COPY nuxt.config.js ./

# Bundle app source
COPY .nuxt .nuxt/
COPY node_modules/ ./node_modules/
COPY static ./static/

EXPOSE 3000

CMD [ "npm", "start" ]
