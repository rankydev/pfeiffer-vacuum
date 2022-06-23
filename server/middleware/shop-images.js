import { createProxyMiddleware } from 'http-proxy-middleware'
import https from 'https'
import { PATH_SHOP_IMAGES } from '../constants.js'

const agent = new https.Agent({
  keepAlive: true,
  rejectUnauthorized: process.env.IGNORE_SSL_CERT !== 'true',
})

export default createProxyMiddleware({
  target: process.env.SHOP_IMAGE_URL,
  changeOrigin: true,
  agent,
  pathRewrite: { [`^${PATH_SHOP_IMAGES}`]: '/' },
})
