import Button from '~/components/atoms/Button/Button.vue'

export default {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          'The icon component which handles all material icons. For a full searchable icon list please go to: https://fonts.google.com/icons?selected=Material+Buttons',
      },
    },
  },
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'inverted'],
      control: { type: 'inline-radio' },
    },
    outlined: { control: { type: 'boolean' } },
    plain: { control: { type: 'boolean' } },
    size: {
      options: ['xsmall', 'small', 'normal'],
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
  icon: 'arrow_forward',
  label: 'Button text',
}
