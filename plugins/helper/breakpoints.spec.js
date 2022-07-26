import { jest } from '@jest/globals'
import breakpointsPlugin from './breakpoints.js'

let injectMock
let getComputedStyleMock
let addEventListenerMock
let currentBreakpoint
let breakpoints
let callback

Object.defineProperty(global, 'window', { writable: true })

const createPlugin = ({ client = false } = {}) => {
  if (client) {
    currentBreakpoint = 'sm'
    getComputedStyleMock = jest.fn(() => ({ content: currentBreakpoint }))
    addEventListenerMock = jest.fn((_, cb) => (callback = cb))
    window = {
      getComputedStyle: getComputedStyleMock,
      addEventListener: addEventListenerMock,
    }
    process.client = true
  } else {
    process.client = false
  }

  injectMock = jest.fn((_, obj) => (breakpoints = obj))
  breakpointsPlugin(null, injectMock)
}

describe('BreakpointsPlugin', () => {
  describe('initial state', () => {
    test('should inject breakpoints into nuxt', () => {
      createPlugin()
      expect(injectMock).toBeCalledTimes(1)
      expect(injectMock).toBeCalledWith(
        'breakpoints',
        expect.objectContaining({
          current: expect.any(Object),
          isMobile: expect.any(Object),
          isTablet: expect.any(Object),
          isDesktop: expect.any(Object),
        })
      )
    })

    test('should watch update the breakpoint on client side', () => {
      createPlugin({ client: true })

      expect(getComputedStyleMock).toBeCalledTimes(1)
      expect(addEventListenerMock).toBeCalledTimes(1)
      expect(addEventListenerMock).toBeCalledWith(
        'resize',
        expect.any(Function),
        false
      )
    })
  })

  describe('during interaction', () => {
    test.each([
      ['sm', true, false, false],
      ['md', false, true, false],
      ['lg', false, false, true],
      ['xl', false, false, true],
    ])(
      'should update breakpoints on resize to %s',
      async (breakpoint, isMobile, isTablet, isDesktop) => {
        createPlugin({ client: true })

        currentBreakpoint = breakpoint
        callback()

        await new Promise(process.nextTick)

        expect(breakpoints.current.value).toBe(breakpoint)
        expect(breakpoints.isMobile.value).toBe(isMobile)
        expect(breakpoints.isTablet.value).toBe(isTablet)
        expect(breakpoints.isDesktop.value).toBe(isDesktop)
      }
    )
  })

  // describe('business requirements', () => {})
})
