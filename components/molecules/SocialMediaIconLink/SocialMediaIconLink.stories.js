import SocialMediaIconLink from './SocialMediaIconLink.vue'
import LinkContent from '~/components/atoms/Link/Link.stories.content'

export default {
  title: 'Molecules/SocialMediaIconLink',
  component: SocialMediaIconLink,
  parameters: {
    docs: {
      description: {
        component: 'This component handles the social media icons',
      },
    },
  },
  argTypes: {
    icon: {
      options: [
        'facebook',
        'twitter',
        'linkedin',
        'youtube',
        'xing',
        'wechat',
        'zhihu',
      ],
      control: { type: 'inline-radio' },
    },
  },
}

const Template = (args) => ({
  components: { SocialMediaIconLink },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <SocialMediaIconLink v-bind="args" />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = {
  ...LinkContent,
  icon: 'facebook',
}
