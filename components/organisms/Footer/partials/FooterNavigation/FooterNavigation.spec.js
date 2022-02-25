import { shallowMount } from '@vue/test-utils'
import FooterNavigation from './FooterNavigation'
import LinkList from '~/components/molecules/LinkList/LinkList'
import NewsletterInput from '~/components/molecules/NewsletterInput/NewsletterInput'

describe('FooterNavigation', () => {
  describe('initial state', () => {
    it('sholud...', () => {
      const wrapper = shallowMount(FooterNavigation)

      const linkList = wrapper.findComponent(LinkList)
      const newsletterInput = wrapper.findComponent(NewsletterInput)
    })
  })
})
