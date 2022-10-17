import Facets from './Facets.vue'
import data from './Facets.stories.content'
import { shallowMount } from '@vue/test-utils'

jest.mock('@nuxtjs/composition-api', () => {
  const originalModule = jest.requireActual('@nuxtjs/composition-api')
  return {
    ...originalModule,
    useContext: jest.fn(() => {
      return {
        i18n: {
          t: (key) => key,
        },
      }
    }),
  }
})

describe('Facets', () => {
  describe('initial state', () => {
    test('should render facets given mocked hybris data', () => {
      const wrapper = shallowMount(Facets, { propsData: { ...data } })

      console.log(wrapper)
      expect(wrapper.exists()).toBeTruthy()
    })
  })
})
