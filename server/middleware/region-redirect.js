import config from '../../nuxt.config'
import { urlJoin } from '@nuxt/utils'
import getLoggerFor from '../../utils/getLoggerFor'

/**
 * This middleware redirects the page visitor from the base url
 * to the currently specified region. It needs to be adjusted
 * when we implement the multi nuxt application soultion, where
 * every nuxt server represents a single region.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns
 */
export default function (req, res, next) {
  const logger = getLoggerFor('region-redirect')
  const routerBase = decodeURI(config.router.base)
  const isEmptyBase = (routerBase || '').length === 0
  const isRootBase = routerBase === '/'
  const isCurrentBase = decodeURI(req.url).startsWith(routerBase)
  const regionCodes = config.publicRuntimeConfig.REGION_CODES

  if (isEmptyBase || isRootBase || isCurrentBase) {
    return next()
  }

  const firstLevel = decodeURI(req.url)
    .split('/')
    .filter((v) => !!v)
    .shift()

  /**
   * If a defined region was processed by the router which is not
   * the current one, an error will be thrown, informing the user
   * that the region is currently unavailable.
   */
  if (!isCurrentBase && regionCodes.includes(firstLevel)) {
    const err = `The server for the region ${firstLevel} is currently not implemented.`
    res.statusCode = 425
    res.write(err)
    return res.end()
  }

  const to = urlJoin(routerBase, req.url)

  logger.info(
    `Redirecting from \`${decodeURI(req.url)}\` to \`${decodeURI(
      to
    )}\` (router.base specified)`
  )

  res.writeHead(302, {
    Location: to,
  })

  res.end()
}
