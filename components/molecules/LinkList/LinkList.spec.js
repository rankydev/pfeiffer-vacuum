import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import LinkList from '~/components/molecules/LinkList/LinkList.vue'
import { footerMenuOne } from '~/components/molecules/LinkList/LinkList.stories.content'

const { links, title } = footerMenuOne

const defaultProps = () => ({ links, title })

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

      const links = wrapper.findAll('.link-list__item')
      expect(links).toHaveLength(5)
    })
  })
})
