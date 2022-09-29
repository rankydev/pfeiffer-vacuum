import { expect } from '@jest/globals'
import { setActivePinia, createPinia } from 'pinia'
import { useContactStore } from './contact'

const mockLogger = jest.fn()

jest.mock('~/composables/useLogger', () => ({
  useLogger: () => {
    return {
      logger: {
        error: mockLogger,
      },
    }
  },
}))

const mockLoggedIn = jest.fn()
const mockAuth = jest.fn()

jest.mock('~/stores/user', () => ({
  useUserStore: () => {
    return {
      loggedIn: mockLoggedIn(),
      auth: mockAuth(),
    }
  },
}))

const mockPost = jest.fn()

jest.mock('~/composables/useAxiosForHybris', () => ({
  useAxiosForHybris: () => {
    return { axios: { post: mockPost } }
  },
}))

describe('contact store', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    setActivePinia(createPinia())
  })

  describe('initial state', () => {
    test('should initialize store and return functions', () => {
      const contactStore = useContactStore()
      expect(contactStore.submitContact).toBeInstanceOf(Function)
    })
  })

  describe('during interaction', () => {
    describe('submitContact', () => {
      test('should submit given contact and logged in', async () => {
        mockPost.mockReturnValue(Promise.resolve({ status: 200 }))
        mockLoggedIn.mockReturnValue(true)

        const contactStore = useContactStore()
        const result = await contactStore.submitContact({
          someInformation: 'test',
        })

        expect(mockPost).toBeCalledWith(
          '/pfeifferwebservices/v2/pfeiffer/contact/current',
          { someInformation: 'test' }
        )
        expect(result).toBeTruthy()
      })
      test('should submit given contact and not logged in', async () => {
        mockPost.mockReturnValue(Promise.resolve({ status: 200 }))
        mockLoggedIn.mockReturnValue(false)

        const contactStore = useContactStore()
        const result = await contactStore.submitContact({
          someInformation: 'test',
        })

        expect(mockPost).toBeCalledWith(
          '/pfeifferwebservices/v2/pfeiffer/contact/anonymous',
          { someInformation: 'test' }
        )
        expect(result).toBeTruthy()
      })

      test('should log error if post failed', async () => {
        mockPost.mockReturnValue(Promise.reject('something went wrong'))
        mockLoggedIn.mockReturnValue(false)

        const contactStore = useContactStore()
        const result = await contactStore.submitContact({
          someInformation: 'test',
        })

        expect(mockLogger).toBeCalledWith(
          'Error when sending contact form. Returning false.',
          'something went wrong'
        )
        expect(result).toBeFalsy()
      })
    })
  })
})
