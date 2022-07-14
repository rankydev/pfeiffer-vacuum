import Link from '~/components/atoms/Link/Link.vue'
import LinkContent from './Link.stories.content'
import { variants, targets } from './Link.stories.content'

export default {
  title: 'Atoms/a_105 Link',
  component: Link,
  parameters: {
    docs: {
      description: {
        component: 'A wrapper for a link item provided by Storyblok',
      },
    },
  },
  argTypes: {
    target: {
      options: targets,
      control: { type: 'inline-radio' },
    },
    variant: {
      options: variants,
      control: { type: 'inline-radio' },
    },
  },
}

const Template = (args) => ({
  components: { Link },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <Link v-bind="args">
      Some Link
    </Link>
  </div>
`,
})

export const Default = Template.bind({})
Default.args = LinkContent
