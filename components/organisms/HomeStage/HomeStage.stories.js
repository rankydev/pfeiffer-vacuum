import HomeStage from './HomeStage.vue'
import HomeStageContent from './HomeStage.stories.content'

const argTypes = {
  slides: {
    control: { type: 'array' },
    defaultValue: HomeStageContent.slides,
  },
  autoplay: {
    control: { type: 'boolean' },
    defaultValue: HomeStageContent.autoplay,
  },
  autoplaySpeed: {
    control: { type: 'number' },
    defaultValue: HomeStageContent.autoplaySpeed,
  },
  infinite: {
    control: { type: 'boolean' },
    defaultValue: HomeStageContent.infinite,
  },
}

export default {
  title: 'Organisms/o_103 Home Stage Module',
  component: HomeStage,
  parameters: {
    docs: {
      description: {
        component: 'HomeStage component used as the stage of the homepage.',
      },
    },
  },
  argTypes,
}

const Template = (args, { types }) => ({
  components: { HomeStage },
  props: Object.keys(types),
  setup() {
    return { args }
  },
  template: `
    <div class="documentation-preview">
      <HomeStage v-bind="args" />
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = {}
