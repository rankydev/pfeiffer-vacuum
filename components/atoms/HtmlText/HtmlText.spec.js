import { shallowMount } from '@vue/test-utils'
import HtmlText from './HtmlText.vue'

describe('HtmlText', () => {
  test('displays plain text', () => {
    const wrapper = shallowMount(HtmlText, {
      propsData: {
        html: 'expected text',
      },
    })
    expect(wrapper.html()).toContain('expected text')
  })

  test('displays html', () => {
    const wrapper = shallowMount(HtmlText, {
      propsData: {
        html: '<p>expected text with html and <a href="https://www.pfeiffer-vacuum.com/">link</a></p>',
      },
    })
    expect(wrapper.html()).toContain(
      '<p>expected text with html and <a href="https://www.pfeiffer-vacuum.com/">link</a></p>'
    )
  })
})
