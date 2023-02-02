import AddressDataForm from './AddressDataForm'

const argTypes = {
  selectedCountry: {
    type: Object,
    default: () => ({}),
  },
  selectedRegion: {
    type: Object,
    default: () => undefined,
  },
  addressData: {
    type: Object,
    default: () => undefined,
  },
}

export default {
  title: 'Molecules/m_141 AddressDataForm',
  component: AddressDataForm,
  parameters: {
    docs: {
      description: {
        component:
          'Address data form that is used on the address data pages in the my-account area.',
      },
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: { AddressDataForm },
  setup() {
    return { args }
  },
  template: `
  <div>
    <AddressDataForm v-bind="args" />
  </div>`,
})

export const Default = Template.bind({})
Default.args = {
  selectedCountry: {
    isocode: 'DE',
    name: 'Germany',
  },
}
