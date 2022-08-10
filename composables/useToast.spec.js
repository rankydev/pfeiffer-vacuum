import { useToast } from './useToast'
import GlobalMessage from '~/components/organisms/GlobalMessage/GlobalMessage'
import messageProps from '~/components/organisms/GlobalMessage/GlobalMessage.stories.content.js'

const mockToastLibrary = {
  success: jest.fn(),
  warning: jest.fn(),
  error: jest.fn(),
}

jest.mock('@nuxtjs/composition-api', () => {
  const originalModule = jest.requireActual('@nuxtjs/composition-api')
  return {
    ...originalModule,
    useContext: () => ({
      $toast: mockToastLibrary,
    }),
  }
})

describe('useToast', () => {
  const toast = useToast(mockToastLibrary)
  describe('should trigger toast functions given content', () => {
    test('should trigger success function', () => {
      toast.success(messageProps)
      expect(mockToastLibrary.success).toBeCalledWith(
        {
          component: GlobalMessage,
          props: {
            variant: 'success',
            ...messageProps,
          },
        },
        {}
      )
    })
    test('should trigger warning function', () => {
      toast.warning(messageProps)
      expect(mockToastLibrary.warning).toBeCalledWith(
        {
          component: GlobalMessage,
          props: {
            variant: 'warning',
            ...messageProps,
          },
        },
        {}
      )
    })
    test('should trigger error function', () => {
      toast.error(messageProps)
      expect(mockToastLibrary.error).toBeCalledWith(
        {
          component: GlobalMessage,
          props: {
            variant: 'error',
            ...messageProps,
          },
        },
        {}
      )
    })
  })

  describe('should trigger toast functions given no props data', () => {
    test('should trigger success function', () => {
      toast.success()
      expect(mockToastLibrary.success).toBeCalledWith(
        {
          component: GlobalMessage,
          props: {
            variant: 'success',
            headline: '',
            description: '',
            button: null,
          },
        },
        {}
      )
    })
    test('should trigger warning function', () => {
      toast.warning()
      expect(mockToastLibrary.warning).toBeCalledWith(
        {
          component: GlobalMessage,
          props: {
            variant: 'warning',
            headline: '',
            description: '',
            button: null,
          },
        },
        {}
      )
    })
    test('should trigger error function', () => {
      toast.error()
      expect(mockToastLibrary.error).toBeCalledWith(
        {
          component: GlobalMessage,
          props: {
            variant: 'error',
            headline: '',
            description: '',
            button: null,
          },
        },
        {}
      )
    })
  })
})
