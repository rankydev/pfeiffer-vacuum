import Carousel from './Carousel'
import { carouselEntries } from './Carousel.stories.content'
import Card from '../Card/Card'

const argTypes = {
  settings: {
    control: { type: 'object' },
    defaultValue: {
      autoplay: false,
      autoplaySpeed: 5000,
      dots: false,
      pauseOnFocus: true,
      speed: 800,
      arrows: true,
      centerPadding: '16px',
      slidesToShow: 3,
      slidesToScroll: 3,
      touchThreshold: 5,
    },
  },
  centerMode: {
    control: { type: 'boolean' },
  },
  infinite: {
    control: { type: 'boolean' },
  },
}

export default {
  title: 'Technical components/Carousel',
  component: Carousel,
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
  components: { Carousel, Card },
  props: Object.keys(argTypes),
  setup() {
    const data = carouselEntries
    return { args, data }
  },
  template: `
    <div class="documentation-preview">
    <div class="tw-grid-container">
      <div class="tw-col-span-full">
        <div class="tw-col-span-12">
          <Carousel v-bind="args">
            <template v-slot:carousel>
              <Card to="#" v-for="(index) in data" :key="index" />
            </template>
          </Carousel>
        </div>
      </div>
    </div>
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = {}
