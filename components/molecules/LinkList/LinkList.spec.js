import { shallowMount, RouterLinkStub, createLocalVue } from '@vue/test-utils'
import LinkList from '~/components/molecules/LinkList/LinkList.vue'
import { footerMenuOne } from '~/components/molecules/LinkList/LinkList.stories.content'

const localVue = createLocalVue()
localVue.directive('editable', (el, key) => {
  el.innerText = key.value
})

const { links, title } = footerMenuOne

const defaultProps = () => ({ links, title })

describe('LinkList', () => {
  describe('initial state', () => {
    it('should render component given no props', () => {
      const wrapper = shallowMount(LinkList, {
        stubs: {
          NuxtLink: RouterLinkStub,
        },
        localVue,
      })
      expect(wrapper.exists()).toBeTruthy()
    })

    it('should render a list with a title given example links', () => {
      const propsData = { ...defaultProps() }
      const wrapper = shallowMount(LinkList, {
        propsData,
        stubs: {
          NuxtLink: RouterLinkStub,
        },
        localVue,
      })
      const linkListTitle = wrapper.find('.link-list__title')
      expect(linkListTitle.text()).toBe('Pfeiffer Vacuum')
    })

    it('should render a list of 5 entries given an array of 5 links', () => {
      const propsData = { ...defaultProps() }
      const wrapper = shallowMount(LinkList, {
        propsData,
        stubs: {
          NuxtLink: RouterLinkStub,
        },
        localVue,
      })

      const links = wrapper.findAll('.link-list__item')
      expect(links).toHaveLength(5)
    })
  })
})
