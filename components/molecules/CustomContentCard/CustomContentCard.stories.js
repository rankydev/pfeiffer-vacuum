import CustomContentCard from '~/components/molecules/CustomContentCard/CustomContentCard.vue'
import {
  image,
  date,
  title,
  description,
  href,
} from './CustomContentCard.stories.content.js'

const argTypes = {
  image: {
    control: { type: 'array' },
    defaultValue: image,
  },
}

export default {
  title: 'Molecules/m_110 Custom content-Card',
  component: CustomContentCard,
  parameters: {
    docs: {
      description: {
        component:
          'The CustomContentCard component cn be used within a slider to present conetent which is defined within storyblok.',
      },
      source: {
        code: '<CustomContentCard v-bind="{ date, image, title, description, href }"  />',
      },
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: { CustomContentCard },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview card-wrapper">
    <CustomContentCard v-bind="args" />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = {
  date,
  title,
  description,
  href,
}
