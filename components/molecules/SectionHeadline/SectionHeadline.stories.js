import SectionHeadline from '~/components/molecules/SectionHeadline/SectionHeadline.vue'
import {
  headline,
  buttons,
  mobileLink,
} from './SectionHeadline.stories.content'

export default {
  title: 'Molecules/m_124 SectionHeadline',
  component: SectionHeadline,
  parameters: {
    docs: {
      description: {
        component:
          'The Section Headline is used to device the my account dashboard sections. It can have buttons on the right side and a mobile link which is used for the arrow button on mobile devices instead of the desktop buttons.',
      },
      source: {
        code: '<SectionHeadline v-bind="{ buttons, mobileLink }"> Headline </SectionHeadline>',
      },
    },
  },
}

const Template = (args) => ({
  components: { SectionHeadline },
  setup() {
    return { args, headline }
  },
  template: `
  <div class="documentation-preview">
  <SectionHeadline v-bind="args">
    {{ headline }}
  </SectionHeadline>
  </div>
`,
})

export const Default = Template.bind({})
Default.args = { buttons, mobileLink }
