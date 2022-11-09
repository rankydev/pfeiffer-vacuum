import { useMenuStore } from '~/stores/menu'

let menu = null
let resizeEvent = null
let escEvent = null
let addListenerSpy = jest.fn((type, func) =>
  type === 'resize' ? (resizeEvent = func) : (escEvent = func)
)
let remListenerSpy = jest.fn()

const mockWarn = jest.fn()
const mockClickOutside = jest.fn()

jest.mock('~/composables/useLogger', () => ({
  useLogger: () => ({
    logger: {
      warn: mockWarn,
    },
  }),
}))

jest.mock('@vueuse/core', () => ({
  onClickOutside: (...args) => mockClickOutside(...args),
}))

const setup = ({ isOpen = false } = {}) => {
  jest.useFakeTimers()
  menu = useMenuStore()
  isOpen ? menu.open(mockElement) : menu.close()
  addListenerSpy.mockClear()
  remListenerSpy.mockClear()
  window.addEventListener = addListenerSpy
  window.removeEventListener = remListenerSpy
  jest.runAllTimers()
}

const mockElement = document.createElement('div')

describe('Menu', () => {
  beforeEach(() => {
    mockWarn.mockClear()
    mockClickOutside.mockClear()
  })

  afterEach(() => menu?.close?.())

  describe('initial state', () => {
    describe('given is Active=false', () => {
      it('should only register resize listener once', () => {
        setup()
        menu.open(mockElement)
        jest.runAllTimers()

        expect(addListenerSpy).toBeCalledTimes(2)
        expect(addListenerSpy).nthCalledWith(1, 'keydown', expect.any(Function))
        expect(addListenerSpy).nthCalledWith(
          2,
          'resize',
          expect.any(Function),
          {
            passive: true,
          }
        )

        setup()
        menu.open(mockElement)
        jest.runAllTimers()

        expect(addListenerSpy).toBeCalledTimes(1)
        expect(addListenerSpy).toBeCalledWith('keydown', expect.any(Function))
      })

      it('should set isActive=true when open was called', () => {
        setup()
        menu.open(mockElement)
        jest.runAllTimers()

        expect(menu.isActive.value).toBe(true)
      })

      it('should register all event listeners when open was called', () => {
        setup()
        menu.open(mockElement)
        jest.runAllTimers()

        expect(addListenerSpy).toBeCalledTimes(1)
        expect(addListenerSpy).toBeCalledWith('keydown', expect.any(Function))

        expect(mockClickOutside).toBeCalledTimes(1)
        expect(mockClickOutside).toBeCalledWith(mockElement, menu.close)
      })

      it('should set isActive=true when toggle was called', () => {
        setup()
        menu.toggle(mockElement)
        jest.runAllTimers()

        expect(menu.isActive.value).toBe(true)
      })

      it('should register all event listeners when toggle was called', () => {
        setup()
        menu.toggle(mockElement)
        jest.runAllTimers()

        expect(addListenerSpy).toBeCalledTimes(1)
        expect(addListenerSpy).toBeCalledWith('keydown', expect.any(Function))

        expect(mockClickOutside).toBeCalledTimes(1)
        expect(mockClickOutside).toBeCalledWith(mockElement, menu.close)
      })

      it('should remove no event listeners when close was called', () => {
        setup()

        expect(remListenerSpy).toBeCalledTimes(0)
      })

      it('should log a warning when no taget was provided on menu open call', () => {
        setup()
        menu.open()
        jest.runAllTimers()

        expect(mockWarn).toBeCalledTimes(1)
        expect(mockWarn).toBeCalledWith(
          "Click outside event listener can't be registered. No taget provided."
        )
      })
    })

    describe('given is Active=true', () => {
      it('should set isActive=false when close was called', () => {
        setup({ isOpen: true })
        menu.close()
        expect(menu.isActive.value).toBe(false)
      })

      it('should remove all event listeners when close was called', () => {
        expect(remListenerSpy).toBeCalledTimes(1)
        expect(remListenerSpy).nthCalledWith(1, 'keydown', expect.any(Function))
      })

      it('should set isActive=false when toggle was called', () => {
        setup({ isOpen: true })
        menu.toggle()
        expect(menu.isActive.value).toBe(false)
      })

      it('should remove all event listeners when toggle was called', () => {
        expect(remListenerSpy).toBeCalledTimes(1)
        expect(remListenerSpy).nthCalledWith(1, 'keydown', expect.any(Function))
      })

      it('should register no new event listeners when open was called twice', () => {
        setup({ isOpen: true })
        menu.open(mockElement)

        expect(addListenerSpy).toBeCalledTimes(1)
      })

      it('should not remove any event listeners if resize was called without a different window width', () => {
        setup({ isOpen: true })

        expect(resizeEvent).toStrictEqual(expect.any(Function))

        resizeEvent()

        expect(remListenerSpy).toBeCalledTimes(0)
      })

      it('should remove all event listeners if resize was called with a different window width', () => {
        setup({ isOpen: true })

        expect(resizeEvent).toStrictEqual(expect.any(Function))

        window.innerWidth = 500
        resizeEvent()

        expect(remListenerSpy).toBeCalledTimes(1)
        expect(remListenerSpy).nthCalledWith(1, 'keydown', expect.any(Function))
      })

      it('should not remove any event listeners if not esc key was pressed', () => {
        setup({ isOpen: true })

        expect(escEvent).toStrictEqual(expect.any(Function))

        escEvent({ key: 'Any key' })

        expect(remListenerSpy).toBeCalledTimes(0)
      })

      it('should remove all event listeners if esc key was pressed', () => {
        setup({ isOpen: true })

        expect(escEvent).toStrictEqual(expect.any(Function))

        escEvent({ key: 'Escape' })

        expect(remListenerSpy).toBeCalledTimes(1)
        expect(remListenerSpy).nthCalledWith(1, 'keydown', expect.any(Function))
      })
    })
  })

  // describe('during interaction', () => {})

  // describe('business requirements', () => {})
})
