import Facets from './Facets.vue'
import { shallowMount } from '@vue/test-utils'
import { currentQuery, facets, sorts } from './Facets.stories.content.js'
import FilterModal from '~/components/molecules/FilterModal/FilterModal'
import PvSelect from '~/components/atoms/FormComponents/PvSelect/PvSelect'
import Popup from '~/components/atoms/Popup/Popup'

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
            isMobile: { value: mockIsMobile },
          },
        },
      }
    },
  }
})

let wrapper

function createComponent(propsData = {}) {
  wrapper = shallowMount(Facets, { propsData })
}

describe('Facets.vue', () => {
  describe('initial state', () => {
    it('should render given only required props', () => {
      const propsData = {
        facets,
        sorts,
      }
      createComponent(propsData)

      const facetsComponent = wrapper.find('.facets')
      const filterTags = wrapper.find('.facets__filter-tags')
      const filterModal = wrapper.findComponent(FilterModal)
      const selects = wrapper.findAllComponents(PvSelect)
      const popUps = wrapper.findAllComponents(Popup)

      expect(facetsComponent.exists()).toBeTruthy()
      expect(filterTags.exists()).toBeFalsy()
      expect(filterModal.exists()).toBeTruthy()
      expect(selects).toHaveLength(7)
      expect(popUps).toHaveLength(2)
    })

    it('should render given prop currentQuery', () => {
      const propsData = {
        facets,
        sorts,
        currentQuery,
      }
      createComponent(propsData)

      const filterTags = wrapper.find('.facets__filter-tags')

      expect(filterTags.exists()).toBeTruthy()
    })
  })
})
