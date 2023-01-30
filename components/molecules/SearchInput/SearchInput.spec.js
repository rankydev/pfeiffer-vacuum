import { mount } from '@vue/test-utils'
import SearchInput from './SearchInput.vue'
import PvInput from '~/components/atoms/FormComponents/PvInput/PvInput.vue'

const mockSearchTerm = 'hipace'
const mockRouterPush = jest.fn()

jest.mock('~/stores/category/category', () => {
  const useCategoryStore = () => {
    return { loadSuggestions: jest.fn(), blurSuggestions: jest.fn() }
  }
  return { useCategoryStore }
})

jest.mock('@nuxtjs/composition-api', () => {
  const originalModule = jest.requireActual('@nuxtjs/composition-api')
  return {
    __esModule: true,
    ...originalModule,
    useRoute: jest.fn(() => ({
      value: { query: { searchTerm: mockSearchTerm } },
    })),
    useRouter: jest.fn(() => ({
      push: jest.fn((e) => mockRouterPush(e)),
    })),
    useContext: jest.fn(() => ({
      app: { localePath: jest.fn((e) => e) },
    })),
  }
})

beforeEach(() => {
  jest.clearAllMocks()
})

describe('SearchInput', () => {
  describe('initial state', () => {
    describe('given an icon', () => {
      it('should render', () => {
        const wrapper = mount(SearchInput)

        const inputField = wrapper.findComponent(PvInput)

        expect(inputField.vm.icon).toBe('search')
        expect(inputField.vm.placeholder).toBe('form.input.search.placeholder')
      })
    })
  })

  describe('during interaction', () => {
    it('should push searchTerm when event is triggered', async () => {
      const wrapper = mount(SearchInput)
      const input = wrapper.findComponent(PvInput)
      await input.vm.$emit('submit', mockSearchTerm)

      expect(mockRouterPush).toBeCalledTimes(1)
      expect(mockRouterPush).toBeCalledWith({
        path: 'shop-search',
        query: { searchTerm: mockSearchTerm },
      })
    })
  })

  // describe('business requirements', () => {})
})
