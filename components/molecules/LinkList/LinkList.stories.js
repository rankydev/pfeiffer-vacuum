import { footerMenuOne } from './LinkList.stories.content'
import LinkList from '~/components/molecules/LinkList/LinkList.vue'

const argTypes = {
  links: {
    control: { type: 'object' },
    defaultValue: footerMenuOne.links,
  },
  title: {
    defaultValue: footerMenuOne.title,
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
        <LinkList :links="links" :title="title" />
      </div>
    `

export const SimpleLinkList = (args, { argTypes }) => ({
  components: { LinkList },
  props: Object.keys(argTypes),
  template,
})
