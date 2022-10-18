import { config } from '@vue/test-utils'
import clientOnly from './mocks/ClientOnly.mock.vue'
import failOnConsole from 'jest-fail-on-console'
import { locales } from '~/i18n.config.js'
import { jest } from '@jest/globals'

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
      addListener: () => {
        /* mock match media add event listener */
      },
      removeListener: () => {
        /* mock match media remove event listener */
      },
    }
  }
