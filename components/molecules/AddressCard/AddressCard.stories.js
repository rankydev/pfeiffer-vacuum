import AddressCard from './AddressCard'
import Button from '~/components/atoms/Button/Button.vue'
import { addressData } from './AddressCard.stories.content'

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
  title: 'Molecules/m_140 AddressCard',
  component: AddressCard,
  parameters: {
    docs: {
      description: {
        component:
          'Address Card displays information about the customer address, contact details and has buttons to edit and delete the adress or set address as a default address.',
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
