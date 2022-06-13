import { createLocalVue, shallowMount } from '@vue/test-utils'
import FooterNewsletter from '~/components/organisms/Footer/partials/FooterNewsletter/FooterNewsletter.vue'
import FooterNewsletterContent from './FooterNewsletter.stories.content'
import { newsletterText } from '~/components/atoms/Richtext/Richtext.stories.content.js'

const defaultProps = () => JSON.parse(JSON.stringify(FooterNewsletterContent))

let wrapper

function createComponent(propsData = {}) {
  const stubs = { NuxtDynamic: true }
  const localVue = createLocalVue()
  const editable = (el, key) => (el.innerText = key.value)
  localVue.directive('editable', editable)

  const options = {
    localVue,
    propsData,
    stubs,
  }
  wrapper = shallowMount(FooterNewsletter, options)
}

describe('FooterNewsletter', () => {
  describe('initial state', () => {
    test('should still render when no data was given', () => {
      createComponent()
      const newsletterWrapper = wrapper.find('.newsletter')
      expect(newsletterWrapper.exists()).toBeTruthy()
    })
  })
  // content
  test('should render correct data given propsData', () => {
    const propsData = {
      ...defaultProps(),
      newsletterText,
    }
    createComponent(propsData, false)
    const newsletterHeadline = wrapper.find('.newsletter__headline')
    const domRichtext = wrapper.find('[name="Richtext"]')
    expect(newsletterHeadline.text()).toEqual(propsData.headline)
    expect(domRichtext.attributes('richtext')).toBe(newsletterText.richtext)
  })
})
