import { useLogger } from '~/composables/useLogger'

export default ({ graphQLErrors, networkError, operation, forward }) => {
  const { logger } = useLogger('GRAPHQL API')

  logger.error(
    'Error accessing GraphQL API:',
    graphQLErrors,
    networkError,
    operation,
    forward
  )
}
