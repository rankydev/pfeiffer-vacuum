import Icon from '~/components/atoms/Icon/Icon.vue'

export default {
  title: 'Atoms/a_106 Icon',
  component: Icon,
  parameters: {
    docs: {
      description: {
        component:
          'The icon component which handles all material icons. For a full searchable icon list please go to: https://fonts.google.com/icons?selected=Material+Icons',
      },
    },
  },
  argTypes: {
    size: {
      options: ['small', 'base', 'large', 'xlarge', 'h3', 'paragraph'],
      control: { type: 'inline-radio' },
    },
  },
}

const Template = (args) => ({
  components: { Icon },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <Icon v-bind="args" />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = {
  icon: 'search',
  size: 'base',
}
