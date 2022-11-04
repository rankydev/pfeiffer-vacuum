import Button from '~/components/atoms/Button/Button.vue'
import {
  buttonVariants,
  variants,
  shapes,
  sizes,
  icon,
  label,
} from '~/components/atoms/Button/Button.stories.content'

export default {
  title: 'Atoms/a_100 Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          'The button component which can be used to add buttons or signal an opportunity for a user to interact',
      },
    },
  },
  argTypes: {
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
  },
}

const Template = (args) => ({
  components: { Button },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <div style="padding: 20px;" :style="args.variant === 'inverted' && 'background-color: #000;'">
      <Button v-bind="args" />
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

const OverviewTemplate = () => ({
  components: { Button },
  setup() {
    return { buttonVariants }
  },
  template: `
  <div class="documentation-preview">
    <div style="display: flex;">
      <div
        v-for="(col, index) in buttonVariants"
        :key="index"
        :style="col[0].variant === 'inverted' && 'background-color: #000;'"
      >
        <template  v-for="(ele, idx) in col">
          <Button
            :key="'button-' + index"
            v-bind="ele"
            style="margin:10px;"
          />
          <br :key="'linebreak-' + index" />
      </template>
      </div>
    </div>
  </div>
`,
})

export const Overview = OverviewTemplate.bind({})
