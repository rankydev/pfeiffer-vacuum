import { useLogger } from '../../composables/useLogger'
import { createProxyMiddleware } from 'http-proxy-middleware'
import https from 'https'
import nuxtConfig from '../../nuxt.config'
import { PATH_DATASOURCES, PATH_STORYBLOK_API_REDIRECT } from '../constants.js'

const { logger } = useLogger('datasources-proxy')

const agent = new https.Agent({
  keepAlive: true,
  rejectUnauthorized: process.env.IGNORE_SSL_CERT !== 'true',
})

const regionCodes = nuxtConfig.publicRuntimeConfig.REGION_CODES
const regionsForRegex = regionCodes.replaceAll(',', '|')

export default createProxyMiddleware({
  target: `${PATH_STORYBLOK_API_REDIRECT}/cdn`,
  changeOrigin: true,
  agent,
  pathRewrite: { [`^(/(${regionsForRegex}))${PATH_DATASOURCES}`]: '/' },
  // eslint-disable-next-line no-unused-vars,unused-imports/no-unused-vars
  onProxyReq: (proxyReq, _req) => {
    const cmsToken = `${nuxtConfig.privateRuntimeConfig.STORYBLOK_ACCESS_TOKEN}`

    if (proxyReq.path.includes('token=')) {
      proxyReq.path = proxyReq.path.replace(
        RegExp('token=[^&]*'),
        `token=${cmsToken}`
      )
      logger.trace('new path: ', proxyReq.path)
    } else {
      proxyReq.path = `${proxyReq.path}&token=${cmsToken}`
    }
    proxyReq.removeHeader('cookie')

    logger.trace('new path: ', proxyReq.path)
  },
})
