import { useLogger } from '~/composables/useLogger'

export default (isLoading) => {
  const { logger } = useLogger('GRAPHQL API')

  logger.debug(
    'Apollo loading handler:',
    isLoading ? 'loading...' : 'loading finished'
  )
}
