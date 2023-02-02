import CTABox from '~/components/molecules/CTABox/CTABox.vue'
import { image, description, button } from './CTABox.stories.content.js'

export default {
  title: 'Molecules/m_109 CTA-Box',
  component: CTABox,
  parameters: {
    docs: {
      description: {
        component:
          'The CTA Box component is used to display a combination of an image and a section below that contains text and buttons. The buttons should always be filled and inverted.',
      },
      source: {
        code: '<CTABox v-bind="{ image, title, description, buttons }"  />',
      },
    },
  },
}

const Template = (args) => ({
  components: { CTABox },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <CTABox v-bind="args" />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = { image, description, button }
