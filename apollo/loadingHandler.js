import { useLogger } from '~/composables/useLogger'

export default (isLoading, countModifier) => {
  const { logger } = useLogger('GRAPHQL API')

  logger.debug(
    'Apollo loading handler:',
    isLoading ? 'loading...' : 'loading finished'
  )
}
