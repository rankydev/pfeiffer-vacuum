import Password from '~/components/atoms/FormComponents/Password/Password.vue'

export default {
  title: 'Atoms/a_104 Password',
  component: Password,
  parameters: {
    docs: {
      description: {
        component:
          'The basic password input field, which offers the possibility to enter a text, set a label and specify whether the input field is required or not. Over a boolean hasError can a error message be displayed. The input field can hold an optional icon and will render an error icon if an error occures.',
      },
      source: {
        code: '<Password v-bind="{ value placeholder label required disabled hasError errorMessage }"/>',
      },
    },
  },
}

const Template = (args) => ({
  components: { Password },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <Password v-bind="args['Required']" />
    <br/>
    <Password v-bind="args['Label']" />
    <br/>
    <Password v-bind="args['Disabled']" />
    <br/>
    <Password v-bind="args['Error']" />
    <br/>
    <Password v-bind="args['Validate']" />
    <br/>
  </div>
`,
})

export const Default = Template.bind({})
Default.args = {
  Required: {
    placeholder: 'Some placeholder',
  },
  Label: {
    placeholder: 'Some placeholder',
    label: 'Label',
  },
  Disabled: {
    placeholder: 'Some placeholder',
    disabled: true,
  },
  Error: {
    placeholder: 'Some placeholder',
    hasError: true,
    errorMessage: 'Sorry, an error occured',
  },
  Validate: {
    placeholder: 'Some placeholder',
    validate: true,
  },
}
