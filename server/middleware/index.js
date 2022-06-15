import { createProxyMiddleware } from 'http-proxy-middleware'
import express from 'express'
import https from 'https'

const agent = new https.Agent({
  keepAlive: true,
  rejectUnauthorized: process.env.IGNORE_SSL_CERT !== 'true',
})

const app = express()
app.use(
  '/image',
  createProxyMiddleware({
    target: process.env.SHOP_IMAGE_URL,
    changeOrigin: true,
    agent,
    pathRewrite: { '^/api/image': '/' },
  })
)

module.exports = app
