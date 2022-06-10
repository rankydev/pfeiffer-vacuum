import { createLocalVue, shallowMount } from '@vue/test-utils'
import DocumentCard from './DocumentCard'
import Link from '~/components/atoms/Link/Link'
import ResponsiveImage from '~/components/atoms/ResponsiveImage/ResponsiveImage'
import Icon from '~/components/atoms/Icon/Icon'
import documentCardContent from './DocumentCard.stories.content'

let wrapper

function createComponent(propsData = {}) {
  const localVue = createLocalVue()
  const editable = (el, key) => (el.innerText = key.value)
  localVue.directive('editable', editable)

  const options = {
    localVue,
    propsData,
  }

  wrapper = shallowMount(DocumentCard, options)
}

describe('DocumentCard', () => {
  describe('initial state', () => {
    it('should render without props', () => {
      createComponent()

      expect(wrapper.findComponent(Link).exists()).toBeTruthy()
      expect(wrapper.findComponent(ResponsiveImage).exists()).toBeTruthy()
      expect(wrapper.findComponent(Icon).exists()).toBeTruthy()
    })

    it('should render correct data given props', () => {
      createComponent(documentCardContent)

      const link = wrapper.findComponent(Link)
      const image = wrapper.findComponent(ResponsiveImage)

      expect(link.attributes('href')).toBe(documentCardContent.href)
      expect(image.vm.image).toStrictEqual(documentCardContent.image)
      expect(image.vm.aspectRatio).toBe('21:28')
    })
  })
})
