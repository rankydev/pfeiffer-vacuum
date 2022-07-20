import { computed } from '@nuxtjs/composition-api'
import useVuelidate from '@vuelidate/core'

export const useInputValidator = (rules, data) => {
  const v$ = useVuelidate(rules, data)

  const validateInput = async () => {
    await v$.value.$validate()
  }

  const getError = computed(() => {
    return () => {
      const error = v$.value.$errors?.find(
        (i) => i.$property === 'internalValue'
      )
      const errorMsg = error?.$message
      return error ? errorMsg : null
    }
  })

  return {
    v$,
    validateInput,
    getError,
  }
}
