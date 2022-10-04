import { createProxyMiddleware } from 'http-proxy-middleware'
import https from 'https'
import { PATH_SHOP } from '../constants.js'
import config from '../../nuxt.config'

const agent = new https.Agent({
  keepAlive: true,
  rejectUnauthorized: process.env.IGNORE_SSL_CERT !== 'true',
})

const regionCodes = config.publicRuntimeConfig.REGION_CODES
const regionsForRegex = regionCodes.replaceAll(',', '|')

export default createProxyMiddleware({
  target: process.env.SHOP_BASE_URL,
  changeOrigin: true,
  agent,
  pathRewrite: { [`^(/(${regionsForRegex}))?${PATH_SHOP}`]: '/' },
})
