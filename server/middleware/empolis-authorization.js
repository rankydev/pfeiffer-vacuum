import { useLogger } from '../../composables/useLogger'
import { parseJwt } from './utils/jsonTransform'
const axios = require('axios').default

const { logger } = useLogger('empolis-authorization')

const EMPOLIS_AUTH_HEADER =
  'Basic ' +
  Buffer.from(
    `${process.env.EMPOLIS_CLIENT_ID}:${process.env.EMPOLIS_CLIENT_SECRET}`
  ).toString('base64')
const tokenCache = new Map()

// public level will never occur in role mapping but is used for default
const empolisRoleMap = {
  public_level: {
    username: process.env.EMPOLIS_USERNAME_CUSTOMER,
    password: process.env.EMPOLIS_PASSWORD_CUSTOMER,
  },
  internal_level_0: {
    username: process.env.EMPOLIS_USERNAME_INTERNAL_LEVEL_0,
    password: process.env.EMPOLIS_PASSWORD_INTERNAL_LEVEL_0,
  },
  internal_level_1: {
    username: process.env.EMPOLIS_USERNAME_INTERNAL_LEVEL_1,
    password: process.env.EMPOLIS_PASSWORD_INTERNAL_LEVEL_1,
  },
  internal_level_2: {
    username: process.env.EMPOLIS_USERNAME_INTERNAL_LEVEL_2,
    password: process.env.EMPOLIS_PASSWORD_INTERNAL_LEVEL_2,
  },
}

export const getAccessToken = async (req) => {
  logger.debug('getAccessToken start')
  const formData = {
    ...empolisRoleMap.public_level,
    grant_type: 'password',
  }

  const headers = req.headers

  if ((headers.authorization || '').startsWith('Bearer')) {
    logger.debug('Bearer Token found')
    const authToken = headers.authorization.split(' ')[1]
    const jwt = parseJwt(authToken)

    if ((jwt.iss || '').startsWith(process.env.KEYCLOAK_BASE_URL)) {
      const roles = (jwt.realm_access || {}).roles || []
      const empolisRoleMapKeys = Object.keys(empolisRoleMap)

      empolisRoleMapKeys.forEach((empolisRoleKey) => {
        if (roles.includes(empolisRoleKey)) {
          logger.debug('New login data set')
          formData.username = empolisRoleMap[empolisRoleKey].username
          formData.password = empolisRoleMap[empolisRoleKey].password
        }
      })
    }
  }

  let currentToken = tokenCache.get(formData.username)

  // Test if the currentToken is still valid
  const now = new Date()
  if (now < ((currentToken || {}).expires || -1)) {
    logger.debug(
      `Current Empolis Token '${formData.username}' will expire at ${currentToken.expires}`
    )
    return currentToken.access_token
  }

  const config = {
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: EMPOLIS_AUTH_HEADER,
    },
  }

  try {
    const result = await axios.default.post(
      process.env.EMPOLIS_AUTH_URL,
      new URLSearchParams(formData).toString(),
      config
    )
    logger.info('axios result', result)
    currentToken = result.data
    // We want to request a new token 5 minutes before the current one expires
    currentToken.expires = new Date(
      new Date().getTime() + (currentToken.expires_in - 320) * 1000
    )

    // Write token into tokenCache
    tokenCache.set(formData.username, currentToken)

    return currentToken.access_token
  } catch (e) {
    logger.error('Error when fetching empolis access token.')
  }

  return ''
}
