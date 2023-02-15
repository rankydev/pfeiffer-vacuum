// COPIED FROM PVAC. Needs to be refactored before usage!
import { useAxiosForEmpolis } from '~/composables/useAxiosForEmpolis'
import { useContext } from '@nuxtjs/composition-api'
import { useLogger } from '~/composables/useLogger'

export const useEmpolis = () => {
  const { axios } = useAxiosForEmpolis()
  const { i18n } = useContext()
  const { logger } = useLogger('empolis-suggest')

  const getSearchSuggestions = async (text, maxCount) => {
    try {
      const suggestions = await axios.$post('/suggest', {
        query: text,
        maxCount,
        language: i18n.locale === 'de' ? 'de' : 'en',
      })

      if (suggestions && Array.isArray(suggestions) && !suggestions.error) {
        return suggestions
      }

      logger.error(
        `Error when fetching suggestions for '${text}'. Returning empty array.`,
        suggestions.error ? suggestions.error : ''
      )
      return []
    } catch (e) {
      logger.error(
        `Error when fetching suggestions for '${text}'. Returning empty array.`,
        e ? e : ''
      )
      return []
    }
  }

  return { getSearchSuggestions }
}
