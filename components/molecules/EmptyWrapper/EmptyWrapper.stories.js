import EmptyWrapper from '~/components/molecules/EmptyWrapper/EmptyWrapper.vue'
import { label, icon, buttons } from './EmptyWrapper.stories.content'

const argTypes = {
  label: {
    defaultValue: label,
    control: { type: 'text' },
  },
  icon: {
    defaultValue: icon,
    control: { type: 'text' },
  },
  buttons: {
    defaultValue: buttons,
    control: { type: 'array' },
  },
}

export default {
  title: 'Molecules/m_142 Empty Wrapper',
  component: EmptyWrapper,
  parameters: {
    docs: {
      description: {
        component:
          'The Empty Wrapper will be displayed if no data is available in my account.',
      },
    },
  },
  argTypes: argTypes,
}

const Template = (args) => ({
  components: { EmptyWrapper },
  setup() {
    return {
      args,
    }
  },
  template: `
  <div class="documentation-preview">
    <EmptyWrapper v-bind="args"/>
  </div>
`,
})

export const Default = Template.bind({})
