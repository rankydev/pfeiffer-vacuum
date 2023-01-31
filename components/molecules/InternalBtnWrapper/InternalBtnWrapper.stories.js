import InternalBtnWrapper from '~/components/molecules/InternalBtnWrapper/InternalBtnWrapper.vue'
import {
  variants,
  shapes,
  sizes,
  icon,
  label,
} from '~/components/atoms/Button/Button.stories.content'
import { internalVariants } from '~/components/molecules/InternalBtnWrapper/InternalBtnWrapper.stories.content'

export default {
  title: 'Technical Components/ InternalBtnWrapper',
  component: InternalBtnWrapper,
  parameters: {
    docs: {
      description: {
        component:
          'The InternalBtnWrapper component which can be used to add buttons in the project, which override the stylings of the Button component.',
      },
    },
  },
  argTypes: {
    internalVariant: {
      options: internalVariants,
      control: { type: 'inline-radio' },
    },
    variant: {
      options: variants,
      control: { type: 'inline-radio' },
    },
    shape: {
      options: shapes,
      control: { type: 'inline-radio' },
    },
    size: {
      options: sizes,
      control: { type: 'inline-radio' },
    },
    prependIcon: { control: { type: 'boolean' } },
    disabled: { control: { type: 'boolean' } },
    allowLabelLineBreak: { control: { type: 'boolean' } },
  },
}

const Template = (args) => ({
  components: { InternalBtnWrapper },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <div style="padding: 20px;" :style="args.variant === 'inverted' && 'background-color: #000;'">
      <InternalBtnWrapper v-bind="args" />
    </div>
  </div>
`,
})

export const Default = Template.bind({})
Default.args = {
  variant: variants[0],
  shape: shapes[0],
  size: sizes[sizes.length - 1],
  icon: icon,
  label: label,
}
