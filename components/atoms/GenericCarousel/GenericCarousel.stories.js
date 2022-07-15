import GenericCarousel from './GenericCarousel'
import carouselContent from './GenericCarousel.stories.content'

const argTypes = {
  autoplay: {
    control: { type: 'boolean' },
    defaultValue: carouselContent.autoplay,
  },
  autoplaySpeed: {
    control: { type: 'number' },
    defaultValue: carouselContent.autoplaySpeed,
  },
  isWide: {
    control: { type: 'boolean' },
    defaultValue: carouselContent.isWide,
  },
  variant: {
    options: carouselContent.variants,
    control: { type: 'inline-radio' },
  },
  infinite: {
    control: { type: 'boolean' },
    defaultValue: carouselContent.infinite,
  },
  slides: {
    control: { type: 'array' },
    defaultValue: carouselContent.slides,
  },
}

export default {
  title: 'Technical components/Generic Carousel',
  component: GenericCarousel,
  parameters: {
    docs: {
      description: {
        component:
          'Generic carousel component used for various carousel modules',
      },
    },
  },
  argTypes,
}

const Template = (args, { argTypes }) => ({
  components: { GenericCarousel },
  props: Object.keys(argTypes),
  setup() {
    return { args }
  },
  template: `
    <div class="documentation-preview">
      <GenericCarousel v-bind="args">
        <template #slides>
          <NuxtDynamic
            v-for="slide in args.slides"
            :key="slide._uid"
            v-bind="slide"
            :name="slide.uiComponent || slide.component"
          />
        </template>
      </GenericCarousel>
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = {}
