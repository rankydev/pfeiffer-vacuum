import { shallowMount, createLocalVue } from '@vue/test-utils'

import GenericCard from '~/components/molecules/GenericCard/GenericCard.vue'
import ResponsiveImage from '~/components/atoms/ResponsiveImage/ResponsiveImage.vue'

import CustomContentCard from './CustomContentCard.vue'
import {
  image,
  date,
  title,
  description,
  href,
} from './CustomContentCard.stories.content'

let wrapper

function createComponent(propsData = {}) {
  const stubs = { AnimatedCollapse: true, Icon: true, NuxtDynamic: true }
  const localVue = createLocalVue()
  const editable = (el, key) => (el.innerText = key.value)
  localVue.directive('editable', editable)

  const options = {
    localVue,
    stubs,
    propsData,
  }

  wrapper = shallowMount(CustomContentCard, options)
}

describe('CustomContentCard', () => {
  describe('initial state', () => {
    it('should render without props', () => {
      createComponent()
      expect(wrapper.exists()).toBeTruthy()
    })

    it('should place href to GenericCard component given a href', () => {
      const props = { href }
      createComponent(props)

      const domGenericCard = wrapper.findComponent(GenericCard)
      expect(domGenericCard.vm.href).toBe(props.href)
    })

    it('should place the correct props for the image', () => {
      const props = { image }
      createComponent(props)

      const domResponsiveImage = wrapper.findComponent(ResponsiveImage)
      expect(domResponsiveImage.vm.provider).toBe('storyblok')
      expect(domResponsiveImage.vm.image).toEqual(props.image)
      expect(domResponsiveImage.vm.aspectRatio).toBe('3:2')
      expect(domResponsiveImage.vm.rounded).toBe(false)
    })

    it('should set key as expected given different combinations', () => {
      const configs = [
        { props: {}, result: 'falsefalsefalse' },
        { props: { date }, result: 'truefalsefalse' },
        { props: { title }, result: 'falsetruefalse' },
        { props: { description }, result: 'falsefalsetrue' },
        { props: { date, title, description }, result: 'truetruetrue' },
      ]

      configs.forEach(({ props, result }) => {
        createComponent(props)
        expect(wrapper.vm.key).toBe(result)
      })
    })
  })

  // describe('during interaction', () => {})

  // describe('business requirements', () => {})
})
