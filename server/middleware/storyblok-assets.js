import { createProxyMiddleware } from 'http-proxy-middleware'
import https from 'https'
import {
  PATH_STORYBLOK_ASSETS,
  PATH_STORYBLOK_ASSETS_REDIRECT,
} from '../constants.js'
import nuxtConfig from '../../nuxt.config'
import { removeCookie } from './utils/onProxyReq.js'

const agent = new https.Agent({
  keepAlive: true,
  rejectUnauthorized: process.env.IGNORE_SSL_CERT !== 'true',
})

const regionCodes = nuxtConfig.publicRuntimeConfig.REGION_CODES
const regionsForRegex = regionCodes.replaceAll(',', '|')

export default createProxyMiddleware({
  target: PATH_STORYBLOK_ASSETS_REDIRECT,
  changeOrigin: true,
  followRedirects: true,
  agent,
  pathRewrite: { [`^(/(${regionsForRegex}))?${PATH_STORYBLOK_ASSETS}`]: '/' },
  onProxyReq: removeCookie,
})
