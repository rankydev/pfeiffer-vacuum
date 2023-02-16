import ContactCard from './ContactCard'
import content from './ContactCard.stories.content'

const { companyName, tags, street, postalCode, city, country, phone } = content

export default {
  title: 'Molecules/m_147 ContactCard',
  component: ContactCard,
  parameters: {
    docs: {
      description: {
        component:
          'This component displays the contact data of the account managers in the contact from section.',
      },
      source: {
        code: '<ContactCard v-bind="{ companyName, street, postalCode, city, country, phone }"/>',
      },
    },
  },
}

const Template = (args) => ({
  components: { ContactCard },
  setup() {
    return { args }
  },
  template: `
    <div class="documentation-preview" style="background-color:#000000; padding: 24px; width: fit-content">
    <ContactCard v-bind="args"/>
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = { companyName, tags, street, postalCode, city, country, phone }
