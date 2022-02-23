import { footerMenuOne } from './LinkList.stories.content'
import LinkList from '~/components/molecules/LinkList/LinkList.vue'

const argTypes = {
  linkList: {
    control: { type: 'object' },
    defaultValue: footerMenuOne,
  },
}

export default {
  title: 'Molecules/LinkList',
  component: LinkList,
  parameters: {
    docs: {
      description: {
        component:
          'Link Lists to display navigational list (e.g. in the footer nav).',
      },
    },
  },
  argTypes,
}

const template = `
      <div class="documentation-preview">
        <link-list :linkList="linkList" />
      </div>
    `

export const SimpleLinkList = (args, { argTypes }) => ({
  components: { LinkList },
  props: Object.keys(argTypes),
  template,
})
