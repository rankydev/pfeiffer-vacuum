const express = require('express')
const { createProxy } = require('./proxyFactory')
const { responseInterceptor } = require('http-proxy-middleware')
const { replaceStoryblokLinks } = require('../../../utils/storyblok')

// TODO if possible, this should be replaced - not sure if we really need it anymore, look at the other server middleware if this is a better solution
const router = express()
// router.set('x-powered-by', false)
router.disable('x-powered-by')

router.use(
  process.env.PROXY_PATH_SHOP,
  createProxy({
    name: 'Shop',
    source: process.env.PROXY_PATH_SHOP,
    target: process.env.SHOP_BASE_URL,
    onProxyReq: function (proxyReq, _req, _res) {
      proxyReq.removeHeader('cookie')
    },
  })
)

router.use(
  process.env.PROXY_PATH_SHOP_IMAGES,
  createProxy({
    name: 'ShopImages',
    source: process.env.PROXY_PATH_SHOP_IMAGES,
    target: process.env.SHOP_IMAGE_URL,
    onProxyReq: function (proxyReq, _req, _res) {
      proxyReq.removeHeader('cookie')
    },
  })
)

router.use(
  process.env.PROXY_PATH_EMPOLIS,
  createProxy({
    name: 'Empolis',
    source: process.env.PROXY_PATH_EMPOLIS,
    target: `${process.env.EMPOLIS_PATH}api/latest/`,
    onProxyReq: function (proxyReq, req, _res) {
      proxyReq.setHeader('Authorization', `Bearer ${req._empolisToken}`)
      proxyReq.removeHeader('cookie')
    },
  })
)

router.use(
  process.env.PROXY_PATH_VSM,
  createProxy({
    name: 'VSM',
    source: process.env.PROXY_PATH_VSM,
    target: process.env.VSM_BASE_URL,
    onProxyReq: function (proxyReq, _req, _res) {
      proxyReq.removeHeader('cookie')
    },
  })
)

router.use(
  process.env.PROXY_PATH_VACUUM_CALCULATOR,
  createProxy({
    name: 'VacuumCalc',
    source: process.env.PROXY_PATH_VACUUM_CALCULATOR,
    target: process.env.VACUUM_CALCULATOR_BASE_URL,
    onProxyReq: function (proxyReq, _req, _res) {
      proxyReq.removeHeader('cookie')
    },
  })
)

/**
 * Decide which cms key to use
 * @param proxyReq
 * @return {string}
 */
function getCmsToken(proxyReq) {
  const isPreview = proxyReq.hasHeader('CMS-Preview')
  if (isPreview) {
    return process.env.STORYBLOK_API_PREVIEW_KEY
  }
  return process.env.STORYBLOK_API_PUBLIC_KEY
}

router.use(
  process.env.PROXY_PATH_CMS_ASSETS,
  createProxy({
    name: 'CMS',
    source: process.env.PROXY_PATH_CMS_ASSETS,
    target: `https://${process.env.STORYBLOK_ASSET_URL}`,
  })
)

const manipulateContent = responseInterceptor(
  async (responseBuffer, _proxyRes, _req, _res) => {
    const response = responseBuffer.toString('utf8')
    return replaceStoryblokLinks(response)
  }
)

router.use(
  process.env.PROXY_PATH_CMS_GQL,
  createProxy({
    name: 'CMS',
    source: process.env.PROXY_PATH_CMS_GQL,
    target: process.env.STORYBLOK_GQL_API_URL,
    selfHandleResponse: true,
    onProxyReq: function (proxyReq, _req, _res) {
      // add the security token
      const cmsToken = getCmsToken(proxyReq)

      proxyReq.setHeader('Token', cmsToken)
      proxyReq.path = proxyReq.path.replace(/\/$/, '')
      proxyReq.removeHeader('cookie')
    },
    onProxyRes: manipulateContent,
  })
)

router.use(
  process.env.PROXY_PATH_CMS,
  createProxy({
    name: 'CMS',
    source: process.env.PROXY_PATH_CMS,
    target: process.env.STORYBLOK_API_URL,
    selfHandleResponse: true,
    onProxyReq: function (proxyReq, _req, _res) {
      // add the security token
      const cmsToken = getCmsToken(proxyReq)
      proxyReq.path = proxyReq.path.replace('token=', 'token=' + cmsToken)
      proxyReq.removeHeader('cookie')
    },
    onProxyRes: manipulateContent,
  })
)

module.exports = router
