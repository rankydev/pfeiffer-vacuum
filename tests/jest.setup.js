import { config } from '@vue/test-utils'
import clientOnly from './mocks/ClientOnly.mock.vue'
import failOnConsole from 'jest-fail-on-console'
import { locales } from '~/i18n.config.js'

config.stubs['client-only'] = clientOnly

// add i18n mocks
config.mocks.localePath = (val) => val
config.mocks.switchLocalePath = (val) => val
config.mocks.$t = (val) => val
config.mocks.$d = (val) => val
config.mocks.$i18n = { locales }

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
