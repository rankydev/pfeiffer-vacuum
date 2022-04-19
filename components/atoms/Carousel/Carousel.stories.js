import Carousel from './Carousel'
import mockData from './Carousel.stories.content'

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

const Template = (args) => ({
  components: { Carousel },
  setup() {
    const data = mockData
    return { args, data }
  },
  template: `
  <div class="documentation-preview">
    <Carousel v-bind="args">
      <template v-for="slide in data.carousel">
        <div class="tw-bg-pv-red-darker">
          <h3>{{ slide.title }}</h3>
          <p>{{ slide.text }}</p>
        </div>
      </template>
    </Carousel>
  </div>
`,
})

export const Default = Template.bind({})
Default.args = {}
