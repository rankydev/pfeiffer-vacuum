import Password from '~/components/atoms/FormComponents/Password/Password.vue'

export default {
  title: 'Form components/Password',
  component: Password,
  parameters: {
    docs: {
      description: {
        component:
          'The basic password input field, which offers the possibility to enter a text, set a label and specify whether the input field is required or not. Over a boolean hasError can a error message be displayed. The input field can hold an optional icon and will render an error icon if an error occures.',
      },
      source: {
        code: '<Password v-bind="{ value icon placeholder label required disabled hasError errorMessage }"/>',
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
    <Password v-bind="args['Icon']" />
    <br/>
    <Password v-bind="args['Disabled']" />
    <br/>
    <Password v-bind="args['Error']" />
    <br/>
  </div>
`,
})

export const Default = Template.bind({})
Default.args = {
  Required: {
    placeholder: 'Some placeholder',
  },
  Icon: {
    placeholder: 'Some placeholder',
    icon: 'search',
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
}
