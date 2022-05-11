import { shallowMount } from '@vue/test-utils'
import TeaserCard from './TeaserCard.vue'
import {
  headline,
  href,
  target,
  image,
} from '~/components/molecules/TeaserCard/TeaserCard.stories.content.js'
import Link from '~/components/atoms/Link/Link'
import ResponsiveImage from '~/components/atoms/ResponsiveImage/ResponsiveImage'

let wrapper

function createComponent(propsData = {}) {
  wrapper = shallowMount(TeaserCard, { propsData })
}

describe('TeaserCard', () => {
  describe('initial state', () => {
    it('should render without props', () => {
      createComponent()

      const domImg = wrapper.find('.teaser-card__img')
      const domHeading = wrapper.find('h5')

      expect(domImg.exists()).toBeTruthy()
      expect(domHeading.exists()).toBeTruthy()
    })

    it('should provide all given props to the correct components', () => {
      const propsData = { headline, href, target, image }
      createComponent(propsData)

      const domLink = wrapper.findComponent(Link)
      const domImg = wrapper.findComponent(ResponsiveImage)
      const domHeading = wrapper.find('h5')

      expect(domLink.vm.href).toBe(href)
      expect(domLink.vm.target).toBe(target)

      expect(domImg.vm.image).toEqual(image)
      expect(domImg.vm.provider).toBe('storyblok')
      expect(domImg.vm.aspectRatio).toBe('3:2')
      expect(domImg.vm.withGradient).toBe(true)

      expect(domHeading.text()).toBe(headline)
    })
  })
})
