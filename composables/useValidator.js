import { computed, ref } from '@nuxtjs/composition-api'
import useVuelidate from '@vuelidate/core'

export const useInputValidator = (rules, data) => {
  const v$ = useVuelidate(
    {
      internalValue: {
        ...rules,
      },
    },
    { internalValue: data }
  )

  const validateInput = async () => {
    await v$.value.$validate()
  }

  const getError = computed(() => {
    return () => {
      const error = v$.value.$errors?.find(
        (i) => i.$property === 'internalValue'
      )
      return error?.$message
    }
  })

  return {
    v$,
    validateInput,
    getError,
  }
}
