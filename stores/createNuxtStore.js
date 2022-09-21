import { getCurrentInstance, useContext } from '@nuxtjs/composition-api'

export default function createNuxtStore(createStoreFn) {
  return (context) => {
    if (!context) {
      context = useContext()
      if (context === undefined) {
        throw new Error(
          'This must be called within a setup function or you must manually pass Nuxt Context'
        )
      }
    }
    return createStoreFn(context)(context.$pinia)
  }
}
