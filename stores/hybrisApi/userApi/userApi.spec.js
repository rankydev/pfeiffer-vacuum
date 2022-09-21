import { expect, jest, test } from '@jest/globals'
import { getUserApi } from './userApi.js'
import { createPinia, setActivePinia } from 'pinia'
import { useAuthStore } from '~/stores/auth'

const context = {
  $getLoggerFor: () => ({
    error: jest.fn(),
  }),
}

describe('UserApiPlugin', () => {
  beforeEach(() => setActivePinia(createPinia()))
  describe('getUserData', () => {
    test('should return user data', async () => {
      const mockedGetFunction = jest
        .fn()
        .mockReturnValue({ test: 'test user data' })
      const mockedAxios = { $get: mockedGetFunction }
      const userApi = getUserApi(mockedAxios, context)

      const result = await userApi.getUserData()
      expect(result).toStrictEqual({ test: 'test user data' })
      expect(mockedGetFunction).toHaveBeenCalledWith(
        '/pfeifferwebservices/v2/pfeiffer/users/current',
        {}
      )
    })
  })

  describe('verify', () => {
    test('should work successfully with valid token', async () => {
      const mockedPostFunction = jest
        .fn()
        .mockReturnValue({ success: 'no error' })
      const mockedAxios = { $post: mockedPostFunction }
      const userApi = getUserApi(mockedAxios, context)

      const result = await userApi.verify('valid token')
      expect(result).toStrictEqual({ success: true })
      expect(mockedPostFunction).toHaveBeenCalledWith(
        '/pfeifferwebservices/v2/pfeiffer/doubleOptIn/verifyEmail',
        {
          token: 'valid token',
        }
      )
    })

    test.each([
      ['invalid token', 'InvalidTokenError'],
      ['token of unknown customer', 'CustomerNotFoundError'],
      ['inconsistent token', 'TokenInconsistentError'],
      ['expired token', 'TokenExpiredError'],
      ['another corrupt token', 'UnknownError'],
    ])('should fail with %s', async (token, errorType) => {
      const mockedPostFunction = jest.fn().mockReturnValue({
        error: true,
        errors: [{ type: errorType }],
      })
      const mockedAxios = { $post: mockedPostFunction }
      const userApi = getUserApi(mockedAxios, context)

      const result = await userApi.verify(token)
      expect(result).toStrictEqual({ error: errorType })
      expect(mockedPostFunction).toHaveBeenCalledWith(
        '/pfeifferwebservices/v2/pfeiffer/doubleOptIn/verifyEmail',
        {
          token,
        }
      )
    })
  })

  describe('resendToken', () => {
    test('should work with valid payload', async () => {
      const mockedPostFunction = jest.fn().mockReturnValue({
        success: 'token sent',
      })
      const mockedAxios = { $post: mockedPostFunction }
      const userApi = getUserApi(mockedAxios, context)

      const result = await userApi.resendToken('valid payload')
      expect(result).toStrictEqual({ success: 'token sent' })
      expect(mockedPostFunction).toHaveBeenCalledWith(
        '/pfeifferwebservices/v2/pfeiffer/doubleOptIn/sendVerificationMail',
        'valid payload'
      )
    })

    test('should fail with invalid payload', async () => {
      const mockedPostFunction = jest.fn().mockReturnValue({
        error: 'could not send token',
      })
      const mockedAxios = { $post: mockedPostFunction }
      const userApi = getUserApi(mockedAxios, context)

      const result = await userApi.resendToken('invalid payload')
      expect(result).toStrictEqual({ error: 'could not send token' })
      expect(mockedPostFunction).toHaveBeenCalledWith(
        '/pfeifferwebservices/v2/pfeiffer/doubleOptIn/sendVerificationMail',
        'invalid payload'
      )
    })
  })

  describe('getBillingAddress', () => {
    test('should return value', async () => {
      const mockedGetFunction = jest.fn().mockReturnValue({
        address: 'some address',
      })
      const mockedAxios = { $get: mockedGetFunction }
      const userApi = getUserApi(mockedAxios, context)

      const result = await userApi.getBillingAddress()
      expect(result).toStrictEqual({ address: 'some address' })
      expect(mockedGetFunction).toHaveBeenCalledWith(
        '/pfeifferwebservices/v2/pfeiffer/users/current/billingaddress'
      )
    })

    test('should return null if the result has an error', async () => {
      const mockedGetFunction = jest.fn().mockReturnValue({
        error: 'some error',
      })
      const mockedAxios = { $get: mockedGetFunction }
      const userApi = getUserApi(mockedAxios, context)

      const result = await userApi.getBillingAddress()
      expect(result).toBeNull()
      expect(mockedGetFunction).toHaveBeenCalledWith(
        '/pfeifferwebservices/v2/pfeiffer/users/current/billingaddress'
      )
    })

    test('should return null if the result is not an object', async () => {
      const mockedGetFunction = jest.fn().mockReturnValue('error')
      const mockedAxios = { $get: mockedGetFunction }
      const userApi = getUserApi(mockedAxios, context)

      const result = await userApi.getBillingAddress()
      expect(result).toBeNull()
      expect(mockedGetFunction).toHaveBeenCalledWith(
        '/pfeifferwebservices/v2/pfeiffer/users/current/billingaddress'
      )
    })
  })

  describe('getDeliveryAddresses', () => {
    test('should return value', async () => {
      const mockedGetFunction = jest.fn().mockReturnValue({
        addresses: [{ address: 'no1' }, { address: 'no2' }],
      })
      const mockedAxios = { $get: mockedGetFunction }
      const userApi = getUserApi(mockedAxios, context)

      const result = await userApi.getDeliveryAddresses()
      expect(result).toStrictEqual([{ address: 'no1' }, { address: 'no2' }])
      expect(mockedGetFunction).toHaveBeenCalledWith(
        '/pfeifferwebservices/v2/pfeiffer/users/current/deliveryaddresses',
        { params: { fields: 'FULL' } }
      )
    })

    test('should return empty array if result is not an object', async () => {
      const mockedGetFunction = jest.fn().mockReturnValue('error')
      const mockedAxios = { $get: mockedGetFunction }
      const userApi = getUserApi(mockedAxios, context)

      const result = await userApi.getDeliveryAddresses()
      expect(result).toStrictEqual([])
      expect(mockedGetFunction).toHaveBeenCalledWith(
        '/pfeifferwebservices/v2/pfeiffer/users/current/deliveryaddresses',
        { params: { fields: 'FULL' } }
      )
    })

    test('should return empty array if result has an error', async () => {
      const mockedGetFunction = jest
        .fn()
        .mockReturnValue({ error: 'something went wrong' })
      const mockedAxios = { $get: mockedGetFunction }
      const userApi = getUserApi(mockedAxios, context)

      const result = await userApi.getDeliveryAddresses()
      expect(result).toStrictEqual([])
      expect(mockedGetFunction).toHaveBeenCalledWith(
        '/pfeifferwebservices/v2/pfeiffer/users/current/deliveryaddresses',
        { params: { fields: 'FULL' } }
      )
    })

    test('should return empty array if result does not have addresses', async () => {
      const mockedGetFunction = jest
        .fn()
        .mockReturnValue({ something: 'no addresses here' })
      const mockedAxios = { $get: mockedGetFunction }
      const userApi = getUserApi(mockedAxios, context)

      const result = await userApi.getDeliveryAddresses()
      expect(result).toStrictEqual([])
      expect(mockedGetFunction).toHaveBeenCalledWith(
        '/pfeifferwebservices/v2/pfeiffer/users/current/deliveryaddresses',
        { params: { fields: 'FULL' } }
      )
    })

    test('should return empty array if result addresses are not an array', async () => {
      const mockedGetFunction = jest
        .fn()
        .mockReturnValue({ addresses: { address: 'wrong' } })
      const mockedAxios = { $get: mockedGetFunction }
      const userApi = getUserApi(mockedAxios, context)

      const result = await userApi.getDeliveryAddresses()
      expect(result).toStrictEqual([])
      expect(mockedGetFunction).toHaveBeenCalledWith(
        '/pfeifferwebservices/v2/pfeiffer/users/current/deliveryaddresses',
        { params: { fields: 'FULL' } }
      )
    })
  })

  describe('updateCurrentUserData', () => {
    test('should return changed data', async () => {
      const authStore = useAuthStore()
      const user = { user: { name: 'Torsten Tester' } }
      const mockedPatchFunction = jest
        .fn()
        .mockImplementation((_, data) => data)
      const mockedGetFunction = jest.fn().mockReturnValue(user)
      const mockedAxios = {
        $patch: mockedPatchFunction,
        $get: mockedGetFunction,
      }

      expect(authStore.currentUser).toBeNull()

      const userApi = getUserApi(mockedAxios, context)
      const result = await userApi.updateCurrentUserData(user)

      expect(result).toStrictEqual(user)
      expect(mockedPatchFunction).toHaveBeenCalledWith(
        '/pfeifferwebservices/v2/pfeiffer/users/current',
        user
      )
      expect(mockedGetFunction).toHaveBeenCalledWith(
        '/pfeifferwebservices/v2/pfeiffer/users/current',
        {}
      )
      expect(authStore.currentUser).toStrictEqual(user)
    })
    test('should return error if changed data did not work', async () => {
      const authStore = useAuthStore()
      const user = { user: { name: 'Torsten Tester' } }
      const mockedPatchFunction = jest
        .fn()
        .mockReturnValue({ error: 'something went wrong' })
      const mockedGetFunction = jest.fn().mockReturnValue(user)
      const mockedAxios = {
        $patch: mockedPatchFunction,
        $get: mockedGetFunction,
      }

      const userApi = getUserApi(mockedAxios, context)
      const result = await userApi.updateCurrentUserData(user)

      expect(result).toStrictEqual({ error: 'something went wrong' })
      expect(mockedPatchFunction).toHaveBeenCalledWith(
        '/pfeifferwebservices/v2/pfeiffer/users/current',
        user
      )
      expect(mockedGetFunction).toHaveBeenCalledTimes(0)
      expect(authStore.currentUser).toBeNull()
    })
    test('should return error if user has error', async () => {
      const authStore = useAuthStore()
      const user = {
        user: { name: 'Torsten Tester' },
      }
      const mockedPatchFunction = jest
        .fn()
        .mockImplementation((_, data) => data)
      const mockedGetFunction = jest
        .fn()
        .mockReturnValue({ ...user, error: 'something is wrong' })
      const mockedAxios = {
        $patch: mockedPatchFunction,
        $get: mockedGetFunction,
      }

      expect(authStore.currentUser).toBeNull()

      const userApi = getUserApi(mockedAxios, context)
      const result = await userApi.updateCurrentUserData(user)

      expect(result).toStrictEqual(user)
      expect(mockedPatchFunction).toHaveBeenCalledWith(
        '/pfeifferwebservices/v2/pfeiffer/users/current',
        user
      )
      expect(mockedGetFunction).toHaveBeenCalledWith(
        '/pfeifferwebservices/v2/pfeiffer/users/current',
        {}
      )
      expect(authStore.currentUser).toBeNull()
    })
  })

  describe('updateDeliveryAddress', () => {
    test('should return value', async () => {
      const mockedPutFunction = jest.fn().mockReturnValue({
        addresses: [{ address: 'no1' }, { address: 'no2' }],
      })
      const mockedAxios = { $put: mockedPutFunction }
      const userApi = getUserApi(mockedAxios, context)

      const result = await userApi.updateDeliveryAddress(1, { address: 'no1' })
      expect(result).toStrictEqual([{ address: 'no1' }, { address: 'no2' }])
      expect(mockedPutFunction).toHaveBeenCalledWith(
        '/pfeifferwebservices/v2/pfeiffer/users/current/deliveryaddresses/1',
        { address: 'no1' }
      )
    })

    test('should return empty array if result is not an object', async () => {
      const mockedPutFunction = jest.fn().mockReturnValue('error')
      const mockedAxios = { $put: mockedPutFunction }
      const userApi = getUserApi(mockedAxios, context)

      const result = await userApi.updateDeliveryAddress(1, { address: 'no1' })
      expect(result).toStrictEqual([])
      expect(mockedPutFunction).toHaveBeenCalledWith(
        '/pfeifferwebservices/v2/pfeiffer/users/current/deliveryaddresses/1',
        { address: 'no1' }
      )
    })

    test('should return empty array if result has an error', async () => {
      const mockedPutFunction = jest
        .fn()
        .mockReturnValue({ error: 'something went wrong' })
      const mockedAxios = { $put: mockedPutFunction }
      const userApi = getUserApi(mockedAxios, context)

      const result = await userApi.updateDeliveryAddress(1, { address: 'no1' })
      expect(result).toStrictEqual([])
      expect(mockedPutFunction).toHaveBeenCalledWith(
        '/pfeifferwebservices/v2/pfeiffer/users/current/deliveryaddresses/1',
        { address: 'no1' }
      )
    })

    test('should return empty array if result does not have addresses', async () => {
      const mockedPutFunction = jest
        .fn()
        .mockReturnValue({ something: 'no addresses here' })
      const mockedAxios = { $put: mockedPutFunction }
      const userApi = getUserApi(mockedAxios, context)

      const result = await userApi.updateDeliveryAddress(1, { address: 'no1' })
      expect(result).toStrictEqual([])
      expect(mockedPutFunction).toHaveBeenCalledWith(
        '/pfeifferwebservices/v2/pfeiffer/users/current/deliveryaddresses/1',
        { address: 'no1' }
      )
    })

    test('should return empty array if result addresses are not an array', async () => {
      const mockedPutFunction = jest
        .fn()
        .mockReturnValue({ addresses: { address: 'not an array' } })
      const mockedAxios = { $put: mockedPutFunction }
      const userApi = getUserApi(mockedAxios, context)

      const result = await userApi.updateDeliveryAddress(1, { address: 'no1' })
      expect(result).toStrictEqual([])
      expect(mockedPutFunction).toHaveBeenCalledWith(
        '/pfeifferwebservices/v2/pfeiffer/users/current/deliveryaddresses/1',
        { address: 'no1' }
      )
    })
  })

  describe('setDefaultDeliveryAddress', () => {
    test('should return value', async () => {
      const mockedPostFunction = jest.fn().mockReturnValue({
        success: true,
      })
      const mockedAxios = { $post: mockedPostFunction }
      const userApi = getUserApi(mockedAxios, context)

      const result = await userApi.setDefaultDeliveryAddress(1)
      expect(result).toStrictEqual([])
      expect(mockedPostFunction).toHaveBeenCalledWith(
        '/pfeifferwebservices/v2/pfeiffer/users/current/deliveryaddresses/1/default'
      )
    })

    test('should return empty array if result is not an object', async () => {
      const mockedPostFunction = jest.fn().mockReturnValue('error')
      const mockedAxios = { $post: mockedPostFunction }
      const userApi = getUserApi(mockedAxios, context)

      const result = await userApi.setDefaultDeliveryAddress(1)
      expect(result).toStrictEqual([])
      expect(mockedPostFunction).toHaveBeenCalledWith(
        '/pfeifferwebservices/v2/pfeiffer/users/current/deliveryaddresses/1/default'
      )
    })

    test('should return empty array if result has an error', async () => {
      const mockedPostFunction = jest.fn().mockReturnValue({ error: true })
      const mockedAxios = { $post: mockedPostFunction }
      const userApi = getUserApi(mockedAxios, context)

      const result = await userApi.setDefaultDeliveryAddress(1)
      expect(result).toStrictEqual([])
      expect(mockedPostFunction).toHaveBeenCalledWith(
        '/pfeifferwebservices/v2/pfeiffer/users/current/deliveryaddresses/1/default'
      )
    })
  })

  describe('createDeliveryAddress', () => {
    test('should return value', async () => {
      const mockedPostFunction = jest.fn().mockReturnValue({
        success: true,
      })
      const mockedAxios = { $post: mockedPostFunction }
      const userApi = getUserApi(mockedAxios, context)

      const result = await userApi.createDeliveryAddress({ address: 'no1' })
      expect(result).toStrictEqual({ success: true })
      expect(mockedPostFunction).toHaveBeenCalledWith(
        '/pfeifferwebservices/v2/pfeiffer/users/current/deliveryaddresses',
        { address: 'no1' }
      )
    })

    test('should return empty array if result is not an object', async () => {
      const mockedPostFunction = jest.fn().mockReturnValue('error')
      const mockedAxios = { $post: mockedPostFunction }
      const userApi = getUserApi(mockedAxios, context)

      const result = await userApi.createDeliveryAddress({ address: 'no1' })
      expect(result).toBeNull()
      expect(mockedPostFunction).toHaveBeenCalledWith(
        '/pfeifferwebservices/v2/pfeiffer/users/current/deliveryaddresses',
        { address: 'no1' }
      )
    })

    test('should return empty array if result has an error', async () => {
      const mockedPostFunction = jest.fn().mockReturnValue({ error: true })
      const mockedAxios = { $post: mockedPostFunction }
      const userApi = getUserApi(mockedAxios, context)

      const result = await userApi.createDeliveryAddress({ address: 'no1' })
      expect(result).toBeNull()
      expect(mockedPostFunction).toHaveBeenCalledWith(
        '/pfeifferwebservices/v2/pfeiffer/users/current/deliveryaddresses',
        { address: 'no1' }
      )
    })
  })

  describe('deleteDeliveryAddress', () => {
    test('should return value', async () => {
      const mockedDeleteFunction = jest.fn().mockReturnValue({
        success: true,
      })
      const mockedAxios = { $delete: mockedDeleteFunction }
      const userApi = getUserApi(mockedAxios, context)

      const result = await userApi.deleteDeliveryAddress(1)
      expect(result).toStrictEqual({ success: true })
      expect(mockedDeleteFunction).toHaveBeenCalledWith(
        '/pfeifferwebservices/v2/pfeiffer/users/current/deliveryaddresses/1'
      )
    })

    test('should return empty array if result is not an object', async () => {
      const mockedDeleteFunction = jest.fn().mockReturnValue('error')
      const mockedAxios = { $delete: mockedDeleteFunction }
      const userApi = getUserApi(mockedAxios, context)

      const result = await userApi.deleteDeliveryAddress(1)
      expect(result).toBeNull()
      expect(mockedDeleteFunction).toHaveBeenCalledWith(
        '/pfeifferwebservices/v2/pfeiffer/users/current/deliveryaddresses/1'
      )
    })

    test('should return empty array if result has an error', async () => {
      const mockedDeleteFunction = jest.fn().mockReturnValue({ error: true })
      const mockedAxios = { $delete: mockedDeleteFunction }
      const userApi = getUserApi(mockedAxios, context)

      const result = await userApi.deleteDeliveryAddress(1)
      expect(result).toBeNull()
      expect(mockedDeleteFunction).toHaveBeenCalledWith(
        '/pfeifferwebservices/v2/pfeiffer/users/current/deliveryaddresses/1'
      )
    })
  })

  describe('requestPasswordForgottenToken', () => {
    test('should return server response', async () => {
      const mockedPostFunction = jest.fn().mockReturnValue({ success: true })
      const mockedAxios = { $post: mockedPostFunction }
      const userApi = getUserApi(mockedAxios, context)

      const result = await userApi.requestPasswordForgottenToken('testuser')
      expect(result).toStrictEqual({ success: true })
      expect(mockedPostFunction).toHaveBeenCalledWith(
        '/pfeifferwebservices/v2/pfeiffer/forgottenpasswordtokens?userId=testuser',
        null
      )
    })
  })

  describe('resetPassword', () => {
    test('should return server response', async () => {
      const mockedPostFunction = jest.fn().mockReturnValue({ success: true })
      const mockedAxios = { $post: mockedPostFunction }
      const userApi = getUserApi(mockedAxios, context)

      const result = await userApi.resetPassword('password', 'valid token')
      expect(result).toStrictEqual({ success: true })
      expect(mockedPostFunction).toHaveBeenCalledWith(
        '/pfeifferwebservices/v2/pfeiffer/resetpassword',
        { newPassword: 'password', token: 'valid token' }
      )
    })
  })

  describe('changePassword', () => {
    test('should return server response', async () => {
      const mockedChangePassword = jest.fn().mockReturnValue({ success: true })
      const userApi = getUserApi(null, {
        ...context,
        $authApi: { changePassword: mockedChangePassword },
      })

      const result = await userApi.changePassword('oldPW', 'newPW', 'newPW')
      expect(result).toStrictEqual({ success: true })
      expect(mockedChangePassword).toHaveBeenCalledWith(
        'oldPW',
        'newPW',
        'newPW'
      )
    })
  })

  describe('getAccountManager', () => {
    test('should return value', async () => {
      const authStore = useAuthStore()
      authStore.auth = { access_token: 'some token' }
      authStore.currentUser = {
        registrationStatus: { code: 'APPROVED' },
        orgUnit: { uid: '123' },
        name: 'Tester',
      }
      const mockedGetFunction = jest.fn().mockReturnValue({
        user: { name: 'AccountManager' },
      })
      const mockedAxios = { $get: mockedGetFunction }
      const userApi = getUserApi(mockedAxios, context)

      const result = await userApi.getAccountManager()
      expect(result).toStrictEqual({ user: { name: 'AccountManager' } })
      expect(mockedGetFunction).toHaveBeenCalledWith(
        '/pfeifferwebservices/v2/pfeiffer/users/current/orgUnits/123/salesengineer'
      )
    })

    test('should return empty object if user is not logged in', async () => {
      const userApi = getUserApi(null, context)

      const result = await userApi.getAccountManager()
      expect(result).toStrictEqual({})
    })

    test('should return empty object if user is not approved', async () => {
      const authStore = useAuthStore()
      authStore.currentUser = {
        registrationStatus: { code: 'OPEN' },
        orgUnit: { uid: '123' },
        name: 'Tester',
      }
      const userApi = getUserApi(null, context)

      const result = await userApi.getAccountManager()
      expect(result).toStrictEqual({})
    })

    test('should return empty object if result is not object', async () => {
      const authStore = useAuthStore()
      authStore.auth = { access_token: 'some token' }
      authStore.currentUser = {
        registrationStatus: { code: 'APPROVED' },
        orgUnit: { uid: '123' },
        name: 'Tester',
      }
      const mockedGetFunction = jest.fn().mockReturnValue('error')
      const mockedAxios = { $get: mockedGetFunction }
      const userApi = getUserApi(mockedAxios, context)

      const result = await userApi.getAccountManager()
      expect(result).toStrictEqual({})
      expect(mockedGetFunction).toHaveBeenCalledWith(
        '/pfeifferwebservices/v2/pfeiffer/users/current/orgUnits/123/salesengineer'
      )
    })

    test('should return empty object if result contains error', async () => {
      const authStore = useAuthStore()
      authStore.auth = { access_token: 'some token' }
      authStore.currentUser = {
        registrationStatus: { code: 'APPROVED' },
        orgUnit: { uid: '123' },
        name: 'Tester',
      }
      const mockedGetFunction = jest.fn().mockReturnValue({ error: true })
      const mockedAxios = { $get: mockedGetFunction }
      const userApi = getUserApi(mockedAxios, context)

      const result = await userApi.getAccountManager()
      expect(result).toStrictEqual({})
      expect(mockedGetFunction).toHaveBeenCalledWith(
        '/pfeifferwebservices/v2/pfeiffer/users/current/orgUnits/123/salesengineer'
      )
    })
  })

  describe('register', () => {
    test('should work for anonymous user ', async () => {
      const mockedPostFunction = jest.fn().mockReturnValue({ success: true })
      const mockedAxios = { $post: mockedPostFunction }
      const userApi = getUserApi(mockedAxios, context)

      const result = await userApi.register({ customer: { name: 'Tester' } })
      expect(result).toStrictEqual({ success: true })
      expect(mockedPostFunction).toHaveBeenCalledWith(
        '/pfeifferwebservices/v2/pfeiffer/users/anonymous/orgCustomers',
        { customer: { name: 'Tester' } }
      )
    })

    test('should work for known user ', async () => {
      const mockedPostFunction = jest.fn().mockReturnValue({ success: true })
      const mockedAxios = { $post: mockedPostFunction }
      const userApi = getUserApi(mockedAxios, context)

      const result = await userApi.register(
        { customer: { name: 'Tester' } },
        false
      )
      expect(result).toStrictEqual({ success: true })
      expect(mockedPostFunction).toHaveBeenCalledWith(
        '/pfeifferwebservices/v2/pfeiffer/users/current/orgCustomers',
        { customer: { name: 'Tester' } }
      )
    })
  })
})
