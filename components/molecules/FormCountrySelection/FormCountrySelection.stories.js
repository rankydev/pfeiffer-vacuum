import FormCountrySelection from './FormCountrySelection.vue'

export default {
  title: 'Molecules/FormCountrySelection',
  component: FormCountrySelection,
  parameters: {
    docs: {
      description: {
        component: 'The select fields for country and region in forms',
      },
    },
  },
}

const Template = () => ({
  components: { FormCountrySelection },
  template: `
    <FormCountrySelection />
`,
})

export const Default = Template.bind({})
