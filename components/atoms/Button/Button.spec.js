import { shallowMount } from '@vue/test-utils'
import Button from './Button.vue'
import Link from '~/components/atoms/Link/Link.vue'
import Icon from '~/components/atoms/Icon/Icon.vue'
import { icon, label } from '~/components/atoms/Button/Button.stories.content'

describe('Button', () => {
  describe('initial state', () => {
    it('should render label when it was provided', () => {
      const propsData = { label }
      const wrapper = shallowMount(Button, { propsData })

      expect(wrapper.text()).toBe(label)
    })

    describe('given an icon', () => {
      it('should render the icon', () => {
        const propsData = { icon }
        const wrapper = shallowMount(Button, { propsData })

        const iconTag = wrapper.findComponent(Icon)

        expect(iconTag.exists()).toBeTruthy()
        expect(iconTag.vm.icon).toBe(icon)
      })

      it.each([['normal'], ['small']])(
        'should add base size when size=%p',
        (size) => {
          const propsData = { icon, size }
          const wrapper = shallowMount(Button, { propsData })

          const iconTag = wrapper.findComponent(Icon)
          expect(iconTag.vm.size).toBe('base')
        }
      )

      it('should add xsmall size when size="xsmall"', () => {
        const propsData = { icon, size: 'xsmall' }
        const wrapper = shallowMount(Button, { propsData })

        const iconTag = wrapper.findComponent(Icon)
        expect(iconTag.vm.size).toBe(propsData.size)
      })

      it('should not render appand class when no label was provided', () => {
        const propsData = { icon }
        const wrapper = shallowMount(Button, { propsData })

        const iconTag = wrapper.findComponent(Icon)
        expect(iconTag.attributes('class')).not.toMatch('button__icon--append')
      })

      it('should not render prepend class when prepend=true without a label', () => {
        const propsData = { icon, prependIcon: true }
        const wrapper = shallowMount(Button, { propsData })

        const iconTag = wrapper.findComponent(Icon)
        expect(iconTag.attributes('class')).not.toMatch('button__icon--prepend')
      })

      describe('given a label', () => {
        it('should render append class', () => {
          const propsData = { icon, label }
          const wrapper = shallowMount(Button, { propsData })

          const iconTag = wrapper.findComponent(Icon)
          expect(iconTag.attributes('class')).toMatch('button__icon--append')
        })

        it('should render prepend class when prepend=true', () => {
          const propsData = { icon, label, prependIcon: true }
          const wrapper = shallowMount(Button, { propsData })

          const iconTag = wrapper.findComponent(Icon)
          expect(iconTag.attributes('class')).toMatch('button__icon--prepend')
        })
      })
    })

    describe('given variant primary', () => {
      it('should add the primary modifier', () => {
        const propsData = { variant: 'primary' }
        const wrapper = shallowMount(Button, { propsData })

        const button = wrapper.find('button')
        expect(button.attributes('class')).toMatch('button--primary')
      })

      it('should add the filled modifier', () => {
        const propsData = { variant: 'primary' }
        const wrapper = shallowMount(Button, { propsData })

        const button = wrapper.find('button')
        expect(button.attributes('class')).toMatch('button--filled')
      })

      it('should ignore the shape when shape="outlined"', () => {
        const propsData = { variant: 'primary', shape: 'outlined' }
        const wrapper = shallowMount(Button, { propsData })

        const button = wrapper.find('button')
        expect(button.attributes('class')).not.toMatch('button--outlined')
      })

      it('should ignore the shape when shape="plain"', () => {
        const propsData = { variant: 'primary', shape: 'plain' }
        const wrapper = shallowMount(Button, { propsData })

        const button = wrapper.find('button')
        expect(button.attributes('class')).not.toMatch('button--plain')
      })
    })

    describe.each([['secondary'], ['inverted']])(
      'given variant %p',
      (variant) => {
        it('should add the secondary modifier', () => {
          const propsData = { variant }
          const wrapper = shallowMount(Button, { propsData })

          const button = wrapper.find('button')
          expect(button.attributes('class')).toMatch(`button--${variant}`)
        })

        it('should add the shape modifier when shape="filled', () => {
          const propsData = { variant, shape: 'filled' }
          const wrapper = shallowMount(Button, { propsData })

          const button = wrapper.find('button')
          expect(button.attributes('class')).toMatch('button--filled')
        })

        it('should add the shape modifier when shape="outlined"', () => {
          const propsData = { variant, shape: 'outlined' }
          const wrapper = shallowMount(Button, { propsData })

          const button = wrapper.find('button')
          expect(button.attributes('class')).toMatch('button--outlined')
        })

        it('should add the shape modifier shape="plain"', () => {
          const propsData = { variant, shape: 'plain' }
          const wrapper = shallowMount(Button, { propsData })

          const button = wrapper.find('button')
          expect(button.attributes('class')).toMatch('button--plain')
        })
      }
    )

    it.each([['xsmall'], ['small'], ['normal']])(
      'should add the size modifier when size=%p',
      (size) => {
        const propsData = { size }
        const wrapper = shallowMount(Button, { propsData })

        const button = wrapper.find('button')
        expect(button.attributes('class')).toMatch(`button--${size}`)
      }
    )

    it.each([['normal'], ['narrow']])(
      'should add the gap modifier when gap=%p',
      (gap) => {
        const propsData = { gap }
        const wrapper = shallowMount(Button, { propsData })

        const button = wrapper.find('button')
        expect(button.attributes('class')).toMatch(`button--gap-${gap}`)
      }
    )

    describe('given disabled=true', () => {
      it('should add the disabled modifier', () => {
        const propsData = { disabled: true }
        const wrapper = shallowMount(Button, { propsData })

        const button = wrapper.find('button')
        expect(button.attributes('class')).toMatch(`button--disabled`)
      })

      it('should add the disabled tag', () => {
        const propsData = { disabled: true }
        const wrapper = shallowMount(Button, { propsData })

        const button = wrapper.find('button')
        expect(button.attributes('disabled')).toBe('disabled')
      })
    })

    describe('given href and target', () => {
      it('should not use button tag', () => {
        const propsData = { href: 'https://www.example.com', target: '_blank' }
        const wrapper = shallowMount(Button, { propsData })

        const button = wrapper.find('button')

        expect(button.exists()).toBe(false)
      })
      it('should use Link', () => {
        const propsData = { href: 'https://www.example.com', target: '_blank' }
        const wrapper = shallowMount(Button, { propsData })

        const link = wrapper.findComponent(Link)

        expect(link.exists()).toBe(true)
      })
      it('should add href on Link', () => {
        const propsData = { href: 'https://www.example.com', target: '_blank' }
        const wrapper = shallowMount(Button, { propsData })

        const link = wrapper.findComponent(Link)

        expect(link.attributes('href')).toBe(propsData.href)
      })
      it('should add target on Link', () => {
        const propsData = { href: 'https://www.example.com', target: '_blank' }
        const wrapper = shallowMount(Button, { propsData })

        const link = wrapper.findComponent(Link)

        expect(link.attributes('target')).toBe(propsData.target)
      })
    })

    describe('not given href and target', () => {
      it('should use button tag', () => {
        const wrapper = shallowMount(Button)

        const button = wrapper.find('button')

        expect(button.exists()).toBe(true)
      })
      it('should not use Link', () => {
        const wrapper = shallowMount(Button)

        const link = wrapper.findComponent(Link)

        expect(link.exists()).toBe(false)
      })
    })
  })

  describe('during interaction', () => {
    it('should emit click event on click', async () => {
      const wrapper = shallowMount(Button)
      const btn = wrapper.find('.button')
      const mockEmit = jest.fn()

      wrapper.vm.$emit = mockEmit

      await btn.trigger('click')

      expect(mockEmit).toBeCalledWith('click')
    })
  })

  // describe('business requirements', () => {})
})
