import { createProxyMiddleware } from 'http-proxy-middleware'
import https from 'https'
import nuxtConfig from '../../nuxt.config'
import { PATH_DATASOURCES } from '../constants.js'

const agent = new https.Agent({
  keepAlive: true,
  rejectUnauthorized: process.env.IGNORE_SSL_CERT !== 'true',
})

const regionCodes = nuxtConfig.publicRuntimeConfig.REGION_CODES
const regionsForRegex = regionCodes.replaceAll(',', '|')

export default createProxyMiddleware({
  target: `${nuxtConfig.privateRuntimeConfig.STORYBLOK_API_BASE_URL}`,
  changeOrigin: true,
  agent,
  pathRewrite: (path, req) => {
    let newPath = path.replace(
      `^(/(${regionsForRegex}))${PATH_DATASOURCES}`,
      '/'
    )

    const newQuery = { ...req.query } // copy object
    if (Object.keys(newQuery).length) {
      // There were more query parameters than just _csrf
      newPath = `${newPath.split('?')[0]}?${querystring.stringify(
        newQuery
      )}&token=${nuxtConfig.privateRuntimeConfig.STORYBLOK_ACCESS_TOKEN}`
    } else {
      // _csrf was the only query parameter
      newPath = `${newPath.split('?')[0]}?token=${
        nuxtConfig.privateRuntimeConfig.STORYBLOK_ACCESS_TOKEN
      }`
    }
    console.log('newPath: ', newPath)
    return newPath
  },
})
