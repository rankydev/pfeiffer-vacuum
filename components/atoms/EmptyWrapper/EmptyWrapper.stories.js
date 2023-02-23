import EmptyWrapper from '~/components/atoms/EmptyWrapper/EmptyWrapper.vue'
import { icon, description, buttons } from './EmptyWrapper.stories.content.js'

const argTypes = {
  icon: {
    control: { type: 'text' },
    defaultValue: icon,
  },
  description: {
    control: { type: 'text' },
    defaultValue: description,
  },
  buttons: {
    control: { type: 'boolean' },
    defaultValue: buttons,
  },
}

export default {
  title: 'Molecules/a_??? Empty Wrapper',
  component: EmptyWrapper,
  parameters: {
    docs: {
      description: {
        component:
          'The EmptyWrapper component can be used to display a box with an icon, a description and some buttons ',
      },
      source: {
        code: '<EmptyWrapper v-bind="{ icon, description, buttons }"  />',
      },
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: { EmptyWrapper },
  setup() {
    return { args }
  },
  template: `
    <div class="documentation-preview">
    <EmptyWrapper v-bind="args"/>
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = { icon, description, buttons }
