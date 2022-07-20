import { required } from '@vuelidate/validators'
import { computed, reactive } from '@nuxtjs/composition-api'
import useVuelidate from '@vuelidate/core'

const useInputValidator = () => {
  const rules = {
    firstname: {
      required,
    },
  }

  const formData = reactive({
    firstname: '',
  })

  const v$ = useVuelidate(rules, formData)

  const validateInput = async () => {
    const result = await v$.value.$validate()
  }

  const getError = computed(() => {
    return (field) => {
      const error = v$.value.$errors?.find((i) => i.$property === field)
      const errorMsg = error?.$message
      return error ? errorMsg : null
    }
  })

  return {
    formData,
    rules,
    v$,
    validateInput,
    getError,
  }
}

export default useInputValidator
