import { useContext, onBeforeMount, ssrRef } from '@nuxtjs/composition-api'
import { useLogger } from '~/composables/useLogger'

export const useErrorHandler = () => {
  const { logger } = useLogger()
  const context = useContext()
  const hasError = ssrRef(false)

  const show404 = (error) =>
    context.error({ statusCode: 404, message: error?.message })

  /**
   * Executes an async function to load data
   * Redirects the user to the 404 page if no data was retreived
   * @param {*} cb
   */
  const redirectOnError = async (cb) => {
    try {
      await cb()
    } catch (error) {
      logger.error(error)

      if (process.server) {
        context.res.statusCode = 404
        hasError.value = { message: error?.message }
      } else {
        show404(error)
      }
    }
  }

  onBeforeMount(() => hasError.value && show404(hasError.value))

  return { redirectOnError }
}
