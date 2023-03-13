import { createProxyMiddleware } from 'http-proxy-middleware'
import https from 'https'
import { PATH_SHOP_IMAGES } from '../constants.js'
import nuxtConfig from '../../nuxt.config'

const agent = new https.Agent({
  keepAlive: true,
  rejectUnauthorized: process.env.IGNORE_SSL_CERT !== 'true',
})

const regionCodes = nuxtConfig.publicRuntimeConfig.REGION_CODES
const regionsForRegex = regionCodes.replaceAll(',', '|')

export default createProxyMiddleware({
  target: nuxtConfig.privateRuntimeConfig.SHOP_IMAGE_URL,
  changeOrigin: true,
  agent,
  pathRewrite: { [`^(/(${regionsForRegex}))?${PATH_SHOP_IMAGES}`]: '/' },
  onProxyReq: (proxyReq) => {
    proxyReq.removeHeader('cookie')
  },
})
