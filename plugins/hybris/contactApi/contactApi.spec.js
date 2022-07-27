import { getContactApi } from './contactApi'
import { jest } from '@jest/globals'

const formData = { lorem: 'ipsum', dolor: 'sit' }

describe('productApi', () => {
  describe('initial state', () => {
    test('should send valid form data', () => {
      const alertMock = jest.fn()
      window.alert = alertMock
      const ctx = {
        $logger: {
          error: jest.fn(),
        },
      }
      const axiosInstance = {
        post: jest.fn(() => {
          return {
            status: 200,
          }
        }),
      }
      const contactApi = getContactApi(axiosInstance, ctx)

      contactApi
        .submitContact(formData)
        .then((data) => {
          // TODO: Adapt when vue toast is implemented
          expect(alertMock).toBeCalledWith('PASSED')
        })
        .catch((e) => {
          console.log(e)
        })
    })

    test('should throw error when hybris provides status other than 200', () => {
      const errorMock = jest.fn()
      const alertMock = jest.fn()
      window.alert = alertMock
      const ctx = {
        $logger: {
          error: errorMock,
        },
      }
      const axiosInstance = {
        post: jest.fn(() => {
          return {
            status: 401,
          }
        }),
      }
      const contactApi = getContactApi(axiosInstance, ctx)

      contactApi
        .submitContact(formData)
        .then((data) => {
          // TODO: Adapt when vue toast is implemented
          expect(alertMock).toBeCalledWith('ERROR')
        })
        .catch((e) => {
          console.log(e)
        })
    })

    test('should give error to logger given error from hybris', () => {
      const errorMock = jest.fn()
      const alertMock = jest.fn()
      window.alert = alertMock
      const ctx = {
        $logger: {
          error: errorMock,
        },
      }
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

      contactApi
        .submitContact(formData)
        .then((data) => {
          // TODO: Adapt when vue toast is implemented
          expect(alertMock).toBeCalledWith(error)
        })
        .catch((e) => {
          console.log(e)
        })
    })
  })
})
