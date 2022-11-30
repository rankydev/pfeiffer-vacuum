import { createProxyMiddleware } from 'http-proxy-middleware'
import https from 'https'
import { PATH_EMPOLIS } from '../constants.js'
import config from '../../nuxt.config'

const agent = new https.Agent({
  keepAlive: true,
  rejectUnauthorized: process.env.IGNORE_SSL_CERT !== 'true',
})

const regionCodes = config.publicRuntimeConfig.REGION_CODES
const regionsForRegex = regionCodes.replaceAll(',', '|')

export default createProxyMiddleware({
  target: `${process.env.EMPOLIS_PATH}api/latest/`,
  changeOrigin: true,
  agent,
  pathRewrite: { [`^(/(${regionsForRegex}))?${PATH_EMPOLIS}`]: '/' },
})
