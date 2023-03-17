import { createProxyMiddleware } from 'http-proxy-middleware'
import https from 'https'
import { PATH_SHOP } from '../constants.js'
import nuxtConfig from '../../nuxt.config'
import { removeCookie } from './utils/onProxyReq.js'

const agent = new https.Agent({
  keepAlive: true,
  rejectUnauthorized: process.env.IGNORE_SSL_CERT !== 'true',
})

const regionCodes = nuxtConfig.publicRuntimeConfig.REGION_CODES
const regionsForRegex = regionCodes.replaceAll(',', '|')

export default createProxyMiddleware({
  target: nuxtConfig.privateRuntimeConfig.SHOP_BASE_URL,
  changeOrigin: true,
  followRedirects: true,
  agent,
  pathRewrite: { [`^(/(${regionsForRegex}))?${PATH_SHOP}`]: '/' },
  onProxyReq: removeCookie,
})
