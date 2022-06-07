import { createProxyMiddleware } from 'http-proxy-middleware'
import express from 'express'
import https from 'https'

const agent = new https.Agent({
  keepAlive: true,
  rejectUnauthorized: false,
})

const app = express()
app.use(
  '/image',
  createProxyMiddleware({
    target:
      'https://backgroundprocessing.cjgnymr4s2-pfeifferv1-d1-public.model-t.cc.commerce.ondemand.com',
    changeOrigin: true,
    agent,
    pathRewrite: { '^/api/image': '/' },
    onProxyReq: () => {
      console.log('xyz')
    },
  })
)

module.exports = app
