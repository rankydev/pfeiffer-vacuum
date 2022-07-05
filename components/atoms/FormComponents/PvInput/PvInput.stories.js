import PvInput from '~/components/atoms/FormComponents/PvInput/PvInput.vue'

export default {
  title: 'Form components/PvInput',
  component: PvInput,
  parameters: {
    docs: {
      description: {
        component:
          'The basic input field, which offers the possibility to enter a text, set a label and specify whether the input field is required or not. Over a boolean hasError can a error message be displayed. The input field can hold an optional icon and will render an error icon if an error occures.',
      },
      source: {
        code: '<PvInput v-bind="{ value icon placeholder label required disabled hasError errorMessage }"/>',
      },
    },
  },
}

const Template = (args) => ({
  components: { PvInput },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <PvInput v-bind="args" />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = {
  placeholder: 'Some placeholder',
}

export const Icon = Template.bind({})
Icon.args = {
  placeholder: 'Some placeholder',
  icon: 'search',
}

export const Disabled = Template.bind({})
Disabled.args = {
  placeholder: 'Some placeholder',
  disabled: true,
}

export const Error = Template.bind({})
Error.args = {
  placeholder: 'Some placeholder',
  hasError: true,
  errorMessage: 'Sorry, an error occured',
}
