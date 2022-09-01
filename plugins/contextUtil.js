function getCurrentHostUrl(ctx) {
  const { req, getLoggerFor } = ctx
  const logger = getLoggerFor('contextUtil')

  if (req) {
    // server side
    return req.protocol + '://' + req.headers.host
  }
  if (window) {
    // client side
    return window.location.protocol + '//' + window.location.host
  }
  logger.error('Error getting current host url.')
}

export default (ctx) => {
  const { app } = ctx
  const contextUtil = {
    getCurrentHostUrl: function () {
      return getCurrentHostUrl(ctx)
    },
  }

  app.$contextUtil = contextUtil
  ctx.$contextUtil = contextUtil
}
