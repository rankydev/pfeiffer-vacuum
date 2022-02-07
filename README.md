# pvweb

## Installation Guide
[Confluence Installation Guide](https://confluence.diva-e.com/display/PVWEB/Installation+Guide)

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
yarn storyblok:sync
```

### Sync one component
```bash
yarn storyblok:sync ./components/atoms/YourComponent
```
