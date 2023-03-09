import ErrorHandling from '~/components/molecules/ErrorHandling/ErrorHandling.vue'
import { headline, icon } from './ErrorHandling.stories.content'

const argTypes = {
  icon: {
    defaultValue: icon,
    control: { type: 'text' },
  },
  headline: {
    defaultValue: headline,
    control: { type: 'text' },
  },
  subline: {
    defaultValue: headline,
    control: { type: 'text' },
  },
}

export default {
  title: 'Molecules/m_154 Error Handling',
  component: ErrorHandling,
  parameters: {
    docs: {
      description: {
        component:
          'The Error Handling component can be used to display that it didnt work to load something',
      },
    },
  },
  argTypes: argTypes,
}

const Template = (args) => ({
  components: {
    ErrorHandling,
  },
  setup() {
    return {
      args,
    }
  },
  template: `
    <div class="documentation-preview">
    <ErrorHandling
      v-bind="args"/>
    </div>
  `,
})

export const Default = Template.bind({})
