import Facets from './Facets.vue'
import { shallowMount } from '@vue/test-utils'
import { currentQuery, facets, sorts } from './Facets.stories.content.js'
import FilterModal from '~/components/molecules/FilterModal/FilterModal'
import PvSelect from '~/components/atoms/FormComponents/PvSelect/PvSelect'
import Popup from '~/components/atoms/Popup/Popup'

jest.mock('@nuxtjs/composition-api', () => {
  const originalModule = jest.requireActual('@nuxtjs/composition-api')
  return {
    __esModule: true,
    ...originalModule,
    useContext: () => {
      return {
        app: {
          $breakpoints: {
            isMobile: { value: jest.fn() },
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

    it('should render vm correctly given props', () => {
      const propsData = {
        facets,
        sorts,
      }
      createComponent(propsData)

      expect(wrapper.vm.isExtended).toBeFalsy()
      expect(wrapper.vm.multiSelectFacets[0]).toBe(facets[2])
      expect(wrapper.vm.shrinkedFacets[0]).toBe(facets[2])
      expect(wrapper.vm.selectedFacets).toEqual([])
      expect(wrapper.vm.isVacuumRangePresent).toBeTruthy()
      expect(wrapper.vm.suctionSpeedPresent).toBeTruthy()
      expect(wrapper.vm.isVacuumRangeActive).toBeFalsy()
      expect(wrapper.vm.isSuctionSpeedActive).toBeFalsy()
      expect(wrapper.vm.updateFacets).toBeInstanceOf(Function)
      expect(wrapper.vm.removeFacet).toBeInstanceOf(Function)
    })
  })

  describe('during interaction', () => {
    it('should update facet properly', () => {
      const propsData = {
        facets,
        sorts,
      }
      createComponent(propsData)

      wrapper.vm.updateFacets(facets[0].code, facets[0].values)
    })

    it('should remove facet properly', () => {
      const propsData = {
        facets,
        sorts,
      }
      createComponent(propsData)

      wrapper.vm.removeFacet(facets[0])
    })
  })
})
