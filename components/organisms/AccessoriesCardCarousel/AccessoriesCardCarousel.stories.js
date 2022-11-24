import AccessoriesCardCarousel from './AccessoriesCardCarousel'
import { carouselEntries } from './AccessoriesCardCarousel.stories.content'

const argTypes = {
  entries: {
    control: { type: 'array' },
    defaultValue: carouselEntries,
  },
}

export default {
  title: 'Organisms/o_XXX Accessories Card Carousel',
  component: AccessoriesCardCarousel,
  parameters: {
    docs: {
      description: {
        component:
          'Carousel component rendering the content carousel and product cards, based on product codes maintained in Storyblok.',
      },
    },
  },
  argTypes,
}

const Template = (args, { argTypes: types }) => ({
  components: { AccessoriesCardCarousel },
  props: Object.keys(types),
  setup() {
    return { args }
  },
  template: `
    <div class="documentation-preview">
      <AccessoriesCardCarousel v-bind="args" />
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = {}
