import { createProxyMiddleware } from 'http-proxy-middleware'
import https from 'https'
import { PATH_STORYBLOK_IMAGES } from '../constants.js'
import nuxtConfig from '../../nuxt.config'

const agent = new https.Agent({
  keepAlive: true,
  rejectUnauthorized: process.env.IGNORE_SSL_CERT !== 'true',
})

const regionCodes = nuxtConfig.publicRuntimeConfig.REGION_CODES
const regionsForRegex = regionCodes.replaceAll(',', '|')

export default createProxyMiddleware({
  target: process.env.STORYBLOK_IMAGE_BASE_URL || 'https://img2.storyblok.com',
  changeOrigin: true,
  agent,
  pathRewrite: { [`^(/(${regionsForRegex}))?${PATH_STORYBLOK_IMAGES}`]: '/' },
  onProxyReq: (proxyReq) => {
    proxyReq.removeHeader('cookie')
  },
})
