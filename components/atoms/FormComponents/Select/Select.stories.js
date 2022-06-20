import Select from '~/components/atoms/FormComponents/Select/Select.vue'

export default {
  title: 'Form components/Select',
  component: Select,
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
}

const Template = (args) => ({
  components: { Select },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <Select v-bind="args" />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = {}
