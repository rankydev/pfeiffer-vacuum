import AddressCard from './AddressCard'
import Button from '~/components/atoms/Button/Button.vue'

const addressData = {
  companyName: 'Company',
  firstName: 'Uwe',
  lastName: 'Unterdruck',
  line1: 'Hochdruckstraße',
  line2: '80',
  remarks: '',
  postalCode: '81541',
  town: 'München',
  country: {
    isocode: 'DE',
  },
  phone: '+49123456789',
  printer: '+49123456789',
  email: 'unterdruck@mail.com',
  defaultShippingAddress: false,
}

const argTypes = {
  icon: {
    type: String,
    default: '',
  },
  address: addressData,
  isBillingAddress: {
    type: Boolean,
    default: false,
  },
  editable: {
    type: Boolean,
    default: false,
  },
}

export default {
  title: 'Molecules/m_134 AddressCard',
  component: AddressCard,
  parameters: {
    docs: {
      description: {
        component:
          'General popup component, to show additional data to a defined activator.',
      },
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: { AddressCard, Button },
  setup() {
    return { args }
  },
  template: `
  <div>
    <AddressCard v-bind="args" />
  </div>`,
})

export const Default = Template.bind({})
Default.args = {
  icon: 'mail',
  address: addressData,
  isBillingAddress: false,
  editable: true,
}
