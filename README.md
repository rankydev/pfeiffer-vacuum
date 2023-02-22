# pvweb

## Installation Guide

[Confluence Installation Guide](https://confluence.diva-e.com/display/PVAC/Setup+PVWEB+-+Installation+Guide)

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Node version

16.x

## Create or update Storyblok Components from schema.json

### Sync all components

```bash
npm run storyblok:sync
npm run cms:sync
```

### Sync one component

```bash
npm run storyblok:sync ./components/atoms/YourComponent
```

### Pull Components Schemas from Storyblok

```bash
npm run storyblok pull-components --space <SPACE_ID>
```
https://www.storyblok.com/docs/Guides/command-line-interface

## Run living style guide

```bash
npm run lsg
```

## Make Storyblok v2 work

Start a development server with https proxy:

```bash
# Install mkcert for creating a valid certificate (Mac OS):
$ brew install mkcert
$ mkcert -install
$ mkcert localhost

# Then install and run the proxy (make sure to run it globally, not in the project folder)

$ npm install -g local-ssl-proxy
$ local-ssl-proxy --source 3010 --target 3000 --cert localhost.pem --key localhost-key.pem
```

Got o space settings and set port to 3010
https is now running on port 3010 and forwarding requests to http 3000
