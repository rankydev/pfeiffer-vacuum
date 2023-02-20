import { useLogger } from '../../composables/useLogger'
import { createProxyMiddleware } from 'http-proxy-middleware'
import https from 'https'
import nuxtConfig from '../../nuxt.config'
import { PATH_DATASOURCES } from '../constants.js'

const { logger } = useLogger('datasources-proxy')

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
  pathRewrite: { [`^(/(${regionsForRegex}))${PATH_DATASOURCES}`]: '/' },
  onProxyReq: (proxyReq, req) => {
    const cmsToken = `${nuxtConfig.privateRuntimeConfig.STORYBLOK_ACCESS_TOKEN}`

    if (proxyReq.path.includes('token=')) {
      proxyReq.path = proxyReq.path.replace('token=[^&]*', 'token=' + cmsToken)
    } else {
      proxyReq.path = `${proxyReq.path}&token=${cmsToken}`
    }
    proxyReq.removeHeader('cookie')
  },
})
