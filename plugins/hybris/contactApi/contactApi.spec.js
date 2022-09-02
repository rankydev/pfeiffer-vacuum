import { setActivePinia, createPinia } from 'pinia'
import { getContactApi } from './contactApi'
import { expect, jest } from '@jest/globals'

const formData = { lorem: 'ipsum', dolor: 'sit' }
const mockedErrorFunction = jest.fn()

const ctx = {
  $getLoggerFor: () => ({
    error: mockedErrorFunction,
  }),
}

describe('contactApi', () => {
  beforeEach(() => setActivePinia(createPinia()))
  describe('initial state', () => {
    test('should send valid form data', () => {
      const axiosInstance = {
        post: jest.fn(() => {
          return {
            status: 200,
          }
        }),
      }
      const contactApi = getContactApi(axiosInstance, ctx)

      contactApi.submitContact(formData).then((data) => {
        // TODO: Adapt when vue toast is implemented
        expect(data).toBe(true)
      })
    })

    test('should throw error when hybris provides status other than 200', () => {
      const axiosInstance = {
        post: jest.fn(() => {
          return {
            status: 401,
          }
        }),
      }
      const contactApi = getContactApi(axiosInstance, ctx)

      contactApi.submitContact(formData).then((data) => {
        expect(data).toBe(false)
        expect(mockedErrorFunction).toBeCalledWith(
          'Error when sending contact form. Returning false.',
          undefined
        )
      })
    })

    test('should give error to logger given error from hybris', () => {
      const error = 'Lorem error ipsum'
      const axiosInstance = {
        post: jest.fn(() => {
          return {
            status: 401,
            error,
          }
        }),
      }
      const contactApi = getContactApi(axiosInstance, ctx)

      contactApi.submitContact(formData).then((data) => {
        expect(data).toBe(false)
        expect(mockedErrorFunction).toBeCalledWith(
          'Error when sending contact form. Returning false.',
          'Lorem error ipsum'
        )
      })
    })
  })
})
