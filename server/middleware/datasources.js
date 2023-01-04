import { createProxyMiddleware } from 'http-proxy-middleware'
import https from 'https'
import config from '../../nuxt.config'
import { PATH_DATASOURCES } from '../constants.js'

const agent = new https.Agent({
  keepAlive: true,
  rejectUnauthorized: process.env.IGNORE_SSL_CERT !== 'true',
})

const regionCodes = config.publicRuntimeConfig.REGION_CODES
const regionsForRegex = regionCodes.replaceAll(',', '|')

export default createProxyMiddleware({
  target: `${process.env.STORYBLOK_API_BASE_URL}`,
  changeOrigin: true,
  agent,
  pathRewrite: { [`^(/(${regionsForRegex}))${PATH_DATASOURCES}`]: '/' },
})
