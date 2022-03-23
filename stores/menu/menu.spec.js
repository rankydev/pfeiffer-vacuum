import { shallowMount } from '@vue/test-utils'
import { useMenuStore } from '~/stores/menu'

let menu = null
let addListenerSpy = null
let remListenerSpy = null

const setup = ({ isOpen = false } = {}) => {
  jest.useFakeTimers()
  menu = useMenuStore()
  isOpen ? menu.open() : menu.close()
  addListenerSpy = jest.fn()
  remListenerSpy = jest.fn()
  window.addEventListener = addListenerSpy
  window.removeEventListener = remListenerSpy
}
describe('Menu', () => {
  describe('initial state', () => {
    describe('given is Active=false', () => {
      it('should only register resize listener once', () => {
        setup()
        menu.open()
        jest.runAllTimers()

        expect(addListenerSpy).toBeCalledTimes(3)
        expect(addListenerSpy).nthCalledWith(1, 'click', menu.close)
        expect(addListenerSpy).nthCalledWith(2, 'keydown', expect.any(Function))
        expect(addListenerSpy).nthCalledWith(3, 'resize', menu.close, {
          passive: true,
        })

        setup()
        menu.open()
        jest.runAllTimers()

        expect(addListenerSpy).toBeCalledTimes(2)
        expect(addListenerSpy).nthCalledWith(1, 'click', menu.close)
        expect(addListenerSpy).nthCalledWith(2, 'keydown', expect.any(Function))
      })

      it('should set isActive=true when open was called', () => {
        setup()
        menu.open()
        jest.runAllTimers()
        expect(menu.isActive.value).toBe(true)
      })

      it('should register all event listeners when open was called', () => {
        expect(addListenerSpy).toBeCalledTimes(2)
        expect(addListenerSpy).nthCalledWith(1, 'click', menu.close)
        expect(addListenerSpy).nthCalledWith(2, 'keydown', expect.any(Function))
      })

      it('should set isActive=true when toggle was called', () => {
        setup()
        menu.toggle()
        jest.runAllTimers()
        expect(menu.isActive.value).toBe(true)
      })

      it('should register all event listeners when toggle was called', () => {
        expect(addListenerSpy).toBeCalledTimes(2)
        expect(addListenerSpy).nthCalledWith(1, 'click', menu.close)
        expect(addListenerSpy).nthCalledWith(2, 'keydown', expect.any(Function))
      })

      it('should remove no event listeners when close was called', () => {
        setup()
        menu.close()
        jest.runAllTimers()

        expect(remListenerSpy).toBeCalledTimes(0)
      })
    })

    describe('given is Active=true', () => {
      it('should set isActive=false when close was called', () => {
        setup({ isOpen: true })
        menu.close()
        expect(menu.isActive.value).toBe(false)
      })

      it('should remove all event listeners when close was called', () => {
        expect(remListenerSpy).toBeCalledTimes(2)
        expect(remListenerSpy).nthCalledWith(1, 'click', menu.close)
        expect(remListenerSpy).nthCalledWith(2, 'keydown', expect.any(Function))
      })

      it('should set isActive=false when toggle was called', () => {
        setup({ isOpen: true })
        menu.toggle()
        expect(menu.isActive.value).toBe(false)
      })

      it('should remove all event listeners when toggle was called', () => {
        expect(remListenerSpy).toBeCalledTimes(2)
        expect(remListenerSpy).nthCalledWith(1, 'click', menu.close)
        expect(remListenerSpy).nthCalledWith(2, 'keydown', expect.any(Function))
      })

      it('should register no new event listeners when open was called', () => {
        setup({ isOpen: true })
        menu.open()
        expect(addListenerSpy).toBeCalledTimes(0)
      })
    })
  })

  // describe('during interaction', () => {})

  // describe('business requirements', () => {})
})
