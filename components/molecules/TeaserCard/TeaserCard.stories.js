import TeaserCard from '~/components/molecules/TeaserCard/TeaserCard'
import {
  headline,
  image,
  href,
  target,
  targets,
} from '~/components/molecules/TeaserCard/TeaserCard.stories.content.js'

const argTypes = {
  image: {
    control: { type: 'object' },
  },
  target: {
    options: targets,
    control: { type: 'inline-radio' },
  },
}

export default {
  title: 'Molecules/General Teaser Component',
  component: TeaserCard,
  parameters: {
    docs: {
      description: {
        component:
          'A card with and image and headline that links to a ressource',
      },
      source: {
        code: '<TeaserCard v-bind="{ headline, image, href, target }" />',
      },
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: { TeaserCard },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <TeaserCard v-bind="args" />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = { headline, image, href, target }
