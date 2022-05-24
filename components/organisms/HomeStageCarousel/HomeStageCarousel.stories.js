import HomeStageCarousel from './HomeStageCarousel'
import HomeStageCarouselContent from './HomeStageCarousel.stories.content'

const argTypes = {
  slides: {
    control: { type: 'array' },
    defaultValue: HomeStageCarouselContent.slides,
  },
  autoplay: {
    control: { type: 'boolean' },
    defaultValue: HomeStageCarouselContent.autoplay,
  },
  autoplaySpeed: {
    control: { type: 'number' },
    defaultValue: HomeStageCarouselContent.autoplaySpeed,
  },
  infinite: {
    control: { type: 'boolean' },
    defaultValue: HomeStageCarouselContent.infinite,
  },
}

export default {
  title: 'Organisms/HomeStageCarousel',
  component: HomeStageCarousel,
  parameters: {
    docs: {
      description: {
        component:
          'Homestage carousel component used as the stage of the homepage',
      },
    },
  },
  argTypes,
}

const Template = (args, { argTypes }) => ({
  components: { HomeStageCarousel },
  props: Object.keys(argTypes),
  setup() {
    return { args }
  },
  template: `
    <div class="documentation-preview">
      <HomeStageCarousel v-bind="args" />
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = {}
