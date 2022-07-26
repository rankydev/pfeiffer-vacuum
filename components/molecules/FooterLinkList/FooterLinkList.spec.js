import { shallowMount, RouterLinkStub, createLocalVue } from '@vue/test-utils'
import FooterLinkList from '~/components/molecules/FooterLinkList/FooterLinkList.vue'
import { footerMenuOne } from '~/components/molecules/FooterLinkList/FooterLinkList.stories.content'

const nuxtDynamicStub = {
  template: '<div />',
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
          NuxtDynamic: nuxtDynamicStub,
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
          NuxtDynamic: nuxtDynamicStub,
        },
        localVue,
      })
      const FooterLinkListTitle = wrapper.find('.link-list__title')
      expect(FooterLinkListTitle.text()).toBe('Pfeiffer Vacuum')
    })

    it('should render a list of 5 entries given an array of 5 links', () => {
      const propsData = { ...defaultProps() }
      const wrapper = shallowMount(FooterLinkList, {
        propsData,
        stubs: {
          NuxtLink: RouterLinkStub,
          NuxtDynamic: nuxtDynamicStub,
        },
        localVue,
      })

      const links = wrapper.findAll('.link-list__item')
      expect(links).toHaveLength(5)
    })
  })
})
