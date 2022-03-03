import TextLink from './TextLink.vue'
import LinkContent from '~/components/atoms/Link/Link.stories.content'
import TextLinkContent from './TextLink.stories.content'

export default {
  title: 'Atoms/TextLink',
  component: TextLink,
  parameters: {
    docs: {
      description: {
        component: 'A wrapper for a text link item provided by Storyblok',
      },
    },
  },
  argTypes: {
    target: {
      options: ['_self', '_blank'],
      control: { type: 'inline-radio' },
    },
  },
}

const Template = (args) => ({
  components: { TextLink },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <TextLink v-bind="args" />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = {
  ...LinkContent,
  ...TextLinkContent,
}
