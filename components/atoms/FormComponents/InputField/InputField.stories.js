import InputField from '~/components/atoms/FormComponents/InputField/InputField.vue'

export default {
  title: 'Atoms/InputField',
  component: InputField,
  parameters: {
    docs: {
      description: {
        component: 'The basic input field',
      },
    },
  },
}

const Template = (args) => ({
  components: { InputField },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <InputField v-bind="args" />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = {
  placeholder: 'Some placeholder',
}
