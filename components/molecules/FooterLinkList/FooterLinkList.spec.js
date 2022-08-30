import { shallowMount, RouterLinkStub, createLocalVue } from '@vue/test-utils'
import FooterLinkList from '~/components/molecules/FooterLinkList/FooterLinkList.vue'
import {
  footerMenuOne,
  footerMenuTwo,
} from '~/components/molecules/FooterLinkList/FooterLinkList.stories.content'

const NuxtDynamicStub = {
  template: '<div />',
}

const PrivacyLinkStub = {
  template: '<div class="privacy-link" />',
}

const localVue = createLocalVue()
localVue.directive('editable', (el, key) => {
  el.innerText = key.value
})

const { links, title } = footerMenuOne

const defaultProps = () => ({ links, title })

describe('FooterLinkList', () => {
  describe('initial state', () => {
    it('should render component given no props', () => {
      const wrapper = shallowMount(FooterLinkList, {
        stubs: {
          NuxtLink: RouterLinkStub,
          NuxtDynamic: NuxtDynamicStub,
        },
        localVue,
      })
      expect(wrapper.exists()).toBeTruthy()
    })

    it('should render a list with a title given example links', () => {
      const propsData = { ...defaultProps() }
      const wrapper = shallowMount(FooterLinkList, {
        propsData,
        stubs: {
          NuxtLink: RouterLinkStub,
          NuxtDynamic: NuxtDynamicStub,
        },
        localVue,
      })
      const footerLinkListTitle = wrapper.find('.link-list__title')
      expect(footerLinkListTitle.text()).toBe('Pfeiffer Vacuum')
    })

    it('should render a list of 5 entries given an array of 5 links', () => {
      const propsData = { ...defaultProps() }
      const wrapper = shallowMount(FooterLinkList, {
        propsData,
        stubs: {
          NuxtLink: RouterLinkStub,
          NuxtDynamic: NuxtDynamicStub,
        },
        localVue,
      })

      const links = wrapper.findAll('.link-list__item')
      expect(links).toHaveLength(5)
    })

    it('should render a privacy link given an privacy link entry', () => {
      const { links, title } = footerMenuTwo
      const privacyProps = () => ({ links, title })
      const propsData = { ...privacyProps() }
      const wrapper = shallowMount(FooterLinkList, {
        propsData,
        stubs: {
          NuxtLink: RouterLinkStub,
          NuxtDynamic: NuxtDynamicStub,
          PrivacyLink: PrivacyLinkStub,
        },
        localVue,
      })

      const privacyLink = wrapper.findAll('[name="PrivacyLink"]')
      expect(privacyLink.exists()).toBeTruthy()
    })
  })
})
