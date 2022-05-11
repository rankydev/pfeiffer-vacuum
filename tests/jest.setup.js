import { config } from '@vue/test-utils'
import clientOnly from './mocks/ClientOnly.mock.vue'
import failOnConsole from 'jest-fail-on-console'

config.stubs['client-only'] = clientOnly
failOnConsole()
