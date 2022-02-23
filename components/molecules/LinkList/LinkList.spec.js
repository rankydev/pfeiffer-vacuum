import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import LinkList from '~/components/molecules/LinkList/LinkList.vue'
import { footerMenuOne } from '~/components/molecules/LinkList/LinkList.stories.content'

const defaultProps = () => ({ linkList: footerMenuOne })

describe('LinkList', () => {
  describe('initial state', () => {
    it('should render a list with a title', () => {
      const propsData = { ...defaultProps() }
      const wrapper = shallowMount(LinkList, {
        propsData,
        stubs: {
          NuxtLink: RouterLinkStub,
        },
      })
      const linkListTitle = wrapper.find('.link-list__title')
      expect(linkListTitle.text()).toBe('Pfeiffer Vacuum')
    })

    it('should render a list of 5 entries', () => {
      const propsData = { ...defaultProps() }
      const wrapper = shallowMount(LinkList, {
        propsData,
        stubs: {
          NuxtLink: RouterLinkStub,
        },
      })

      const linkList = wrapper.findAll('.link-list__item')
      expect(linkList).toHaveLength(5)
    })
  })
})
