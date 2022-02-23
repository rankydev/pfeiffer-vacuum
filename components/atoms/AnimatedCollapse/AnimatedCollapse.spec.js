import { shallowMount, mount } from '@vue/test-utils'
import AnimatedCollapse from './AnimatedCollapse.vue'

describe('AnimatedCollapse', () => {
  describe('initial state', () => {
    describe('given any direction', () => {
      it('should render the direction value as a class', () => {
        ;['vertical', 'horizontal'].forEach((direction) => {
          const propsData = { direction }
          const wrapper = shallowMount(AnimatedCollapse, { propsData })

          const transition = wrapper.findComponent({ name: 'transition' })

          expect(transition.vm.enterActiveClass).toMatch(
            `transition--${direction}`
          )
          expect(transition.vm.leaveActiveClass).toMatch(
            `transition--${direction}`
          )
        })
      })

      it('should render the speed value as a class', () => {
        ;['slow', 'medium', 'fast'].forEach((speed) => {
          const propsData = { speed }
          const wrapper = shallowMount(AnimatedCollapse, { propsData })

          const transition = wrapper.findComponent({ name: 'transition' })

          expect(transition.vm.enterActiveClass).toMatch(`transition--${speed}`)
          expect(transition.vm.leaveActiveClass).toMatch(`transition--${speed}`)
        })
      })
    })
  })

  describe('during interaction', () => {
    describe('given direction horizontal', () => {
      it('should animate to the full width when element is shown', async () => {
        const propsData = { direction: 'horizontal' }
        const wrapper = mount(AnimatedCollapse, { propsData })

        jest
          .spyOn(window, 'requestAnimationFrame')
          .mockImplementation(
            async (cb) => (await wrapper.vm.$nextTick()) && cb()
          )

        const element = document.createElement('div')
        const transition = wrapper.findComponent({ name: 'transition' })

        const spy = jest.spyOn(element.style, 'width', 'set')
        jest.spyOn(element, 'scrollWidth', 'get').mockImplementation(() => 300)

        transition.vm.$emit('before-enter', element)
        transition.vm.$emit('enter', element)

        await wrapper.vm.$nextTick()
        expect(spy).toBeCalledTimes(1)
        expect(spy).lastCalledWith('0px')

        await wrapper.vm.$nextTick()
        expect(spy).toBeCalledTimes(2)
        expect(spy).lastCalledWith('300px')

        transition.vm.$emit('after-enter', element)
        expect(spy).toBeCalledTimes(3)
        expect(spy).lastCalledWith(null)
      })

      it('should animate to zero width when element is hidden', async () => {
        const propsData = { direction: 'horizontal' }
        const wrapper = mount(AnimatedCollapse, { propsData })

        jest
          .spyOn(window, 'requestAnimationFrame')
          .mockImplementation(
            async (cb) => (await wrapper.vm.$nextTick()) && cb()
          )

        const element = document.createElement('div')
        const transition = wrapper.findComponent({ name: 'transition' })

        const spy = jest.spyOn(element.style, 'width', 'set')
        jest.spyOn(element, 'offsetWidth', 'get').mockImplementation(() => 300)

        transition.vm.$emit('before-leave', element)
        transition.vm.$emit('leave', element)

        await wrapper.vm.$nextTick()
        expect(spy).toBeCalledTimes(1)
        expect(spy).lastCalledWith('300px')

        await wrapper.vm.$nextTick()
        expect(spy).toBeCalledTimes(2)
        expect(spy).lastCalledWith('0px')

        transition.vm.$emit('after-leave', element)
        expect(spy).toBeCalledTimes(3)
        expect(spy).lastCalledWith(null)
      })
    })

    describe('given direction vertical', () => {
      it('should animate to the full height when element is shown', async () => {
        const propsData = { direction: 'vertical' }
        const wrapper = mount(AnimatedCollapse, { propsData })

        jest
          .spyOn(window, 'requestAnimationFrame')
          .mockImplementation(
            async (cb) => (await wrapper.vm.$nextTick()) && cb()
          )

        const element = document.createElement('div')
        const transition = wrapper.findComponent({ name: 'transition' })

        const spy = jest.spyOn(element.style, 'height', 'set')
        jest.spyOn(element, 'scrollHeight', 'get').mockImplementation(() => 300)

        transition.vm.$emit('before-enter', element)
        transition.vm.$emit('enter', element)

        await wrapper.vm.$nextTick()
        expect(spy).toBeCalledTimes(1)
        expect(spy).lastCalledWith('0px')

        await wrapper.vm.$nextTick()
        expect(spy).toBeCalledTimes(2)
        expect(spy).lastCalledWith('300px')

        transition.vm.$emit('after-enter', element)
        expect(spy).toBeCalledTimes(3)
        expect(spy).lastCalledWith(null)
      })

      it('should animate to zero height when element is hidden', async () => {
        const propsData = { direction: 'vertical' }
        const wrapper = mount(AnimatedCollapse, { propsData })

        jest
          .spyOn(window, 'requestAnimationFrame')
          .mockImplementation(
            async (cb) => (await wrapper.vm.$nextTick()) && cb()
          )

        const element = document.createElement('div')
        const transition = wrapper.findComponent({ name: 'transition' })

        const spy = jest.spyOn(element.style, 'height', 'set')
        jest.spyOn(element, 'offsetHeight', 'get').mockImplementation(() => 300)

        transition.vm.$emit('before-leave', element)
        transition.vm.$emit('leave', element)

        await wrapper.vm.$nextTick()
        expect(spy).toBeCalledTimes(1)
        expect(spy).lastCalledWith('300px')

        await wrapper.vm.$nextTick()
        expect(spy).toBeCalledTimes(2)
        expect(spy).lastCalledWith('0px')

        transition.vm.$emit('after-leave', element)
        expect(spy).toBeCalledTimes(3)
        expect(spy).lastCalledWith(null)
      })
    })
  })

  // describe('business requirements', () => {})
})
