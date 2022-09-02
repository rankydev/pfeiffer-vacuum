import { config } from '@vue/test-utils'
import clientOnly from './mocks/ClientOnly.mock.vue'
import failOnConsole from 'jest-fail-on-console'

config.stubs['client-only'] = clientOnly

// add i18n mocks
config.mocks.localePath = (val) => val
config.mocks.$t = (val) => val
config.mocks.$d = (val) => val

failOnConsole()

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    }
  }

global.$nuxt = {
  $hybrisApi: {},
}
