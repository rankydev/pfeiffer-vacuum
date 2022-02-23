import { shallowMount } from '@vue/test-utils'
import LinkList from '~/components/molecules/LinkList/LinkList.vue'
import { footerMenuOne } from '~/components/molecules/LinkList/LinkList.stories.content'

const defaultProps = () => footerMenuOne

describe('LinkList', () => {
  describe('initial state', () => {
    it('should render a list with a title', () => {
      const propsData = { ...defaultProps() }
      const wrapper = shallowMount(LinkList, { propsData })
      const linkListTitle = wrapper.find('.link-list__title')
      console.log('##', linkListTitle)

      expect(linkListTitle.text()).toBe(propsData.title)
    })
  })
})
