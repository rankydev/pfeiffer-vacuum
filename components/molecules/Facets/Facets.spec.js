import Facets from './Facets.vue'
import { mount } from '@vue/test-utils'
import { facets, sorts } from './Facets.stories.content.js'

const mockIsMobile = jest.fn()
jest.mock('@nuxtjs/composition-api', () => {
  const originalModule = jest.requireActual('@nuxtjs/composition-api')
  return {
    __esModule: true,
    ...originalModule,
    useContext: () => {
      return {
        app: {
          $breakpoints: {
            isMobile: mockIsMobile(),
          },
        },
      }
    },
  }
})

let wrapper

function createComponent(propsData = {}) {
  wrapper = mount(Facets, { propsData })
}

describe('Facets', () => {
  describe('initial state', () => {
    it('should render with given only required props', () => {
      const propsData = {
        facets,
        sorts,
      }
      createComponent(propsData)
    })
  })
})
