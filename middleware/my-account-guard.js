import { defineNuxtMiddleware } from '@nuxtjs/composition-api'
// import { storeToRefs } from 'pinia'
// import { useUserStore } from '~/stores/user'

export default defineNuxtMiddleware((ctx) => {
  // const userStore = useUserStore()
  // const { isLoggedIn } = storeToRefs(userStore)
  // We cannot use pinia (which we need to check if logged in) inside here
  console.log(
    'TODO: create real middleware once we are in nuxt 3',
    JSON.parse(JSON.stringify(ctx.$pinia.state.value))
  )
})
