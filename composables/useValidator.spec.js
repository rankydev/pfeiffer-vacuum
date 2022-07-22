import { useInputValidator } from './useValidator'
import { required, email } from '@vuelidate/validators'
import { ref } from '@nuxtjs/composition-api'

describe('useInputValidator ', () => {
  it('should pass validation given a valid mail address', () => {
    const internalValue = 'test@mail.com'
    const rules = { required, email }
    const validation = ref(
      useInputValidator(
        {
          internalValue: rules,
        },
        { internalValue }
      )
    )
    validation.value.validateInput()

    expect(!!validation.value.getError()).toBeFalsy()
  })

  it('should not pass mail validation given an invalid mail address', () => {
    const internalValue = 'test'
    const rules = { email }
    const validation = ref(
      useInputValidator(
        {
          internalValue: rules,
        },
        { internalValue }
      )
    )
    validation.value.validateInput()

    expect(!!validation.value.getError()).toBeTruthy()
    expect(validation.value.getError()).toBe(
      'Value is not a valid email address'
    )
  })

  it('should not pass required validation given an empty string', () => {
    const internalValue = ''
    const rules = { required }
    const validation = ref(
      useInputValidator(
        {
          internalValue: rules,
        },
        { internalValue }
      )
    )
    validation.value.validateInput()

    expect(!!validation.value.getError()).toBeTruthy()
    expect(validation.value.getError()).toBe('Value is required')
  })
})
