import { shallowMount } from '@vue/test-utils'
import Button from './Button.vue'
import Icon from '~/components/atoms/Icon/Icon.vue'
import {
  buttonVariants,
  variants,
  shapes,
  sizes,
  icon,
  label,
} from '~/components/atoms/Button/Button.stories.content'

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
        'should add base size when size="%i"',
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
      'given variant %i',
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

    describe.each([['xsmall'], ['small'], ['normal']])(
      'should add the size modifier when size="%i"',
      (size) => {
        const propsData = { size }
        const wrapper = shallowMount(Button, { propsData })

        const button = wrapper.find('button')
        expect(button.attributes('class')).toMatch(`button--${size}`)
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
  })

  // describe('during interaction', () => {})

  // describe('business requirements', () => {})
})
