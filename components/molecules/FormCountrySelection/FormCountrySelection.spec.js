import { shallowMount } from '@vue/test-utils'
import FormCountrySelection from '~/components/molecules/FormCountrySelection/FormCountrySelection'
import PvSelect from '~/components/atoms/FormComponents/PvSelect/PvSelect'
import { setActivePinia, createPinia } from 'pinia'
import { ref } from '@nuxtjs/composition-api'

const mockLoadCountries = jest.fn()
jest.mock('~/stores/misc', () => {
  return {
    __esModule: true,
    useMiscStore: () => {
      return {
        loadCountries: mockLoadCountries,
        countries: ['Land1'],
      }
    },
  }
})

const mockLoadRegions = jest.fn(() => {
  mockedRegions.value = ['Region1']
})
const mockedRegions = ref([])
jest.mock('~/composables/useRegions', () => {
  return {
    useRegions: () => {
      return {
        loadRegions: mockLoadRegions,
        regions: mockedRegions,
      }
    },
  }
})

describe('FormCountrySelection', () => {
  describe('initial state', () => {
    beforeEach(() => setActivePinia(createPinia()))
    test('should render component correctly', () => {
      const wrapper = shallowMount(FormCountrySelection)
      const select = wrapper.findComponent(PvSelect)

      expect(wrapper.exists()).toBeTruthy()
      expect(select).toBeTruthy()
    })
  })
  describe('during interaction', () => {
    it('should return regions array when appropriate country was selected', async () => {
      const wrapper = shallowMount(FormCountrySelection)
      const select = wrapper.findComponent(PvSelect)

      const selectedOption = {
        isocode: 'US',
        name: 'United States of America',
      }
      select.vm.$emit('update', selectedOption)
      await select.vm.$nextTick()
      const allSelects = wrapper.findAllComponents(PvSelect)

      expect(mockLoadRegions).toHaveBeenCalled()
      expect(allSelects).toHaveLength(2)
    })
  })
})
