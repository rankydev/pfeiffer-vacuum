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
  title: 'organisms/HomeStage',
  component: HomeStage,
  parameters: {
    docs: {
      description: {
        component: 'Homestage component used as the stage of the homepage.',
      },
    },
  },
  argTypes,
}

const Template = (args, { argTypes }) => ({
  components: { HomeStage },
  props: Object.keys(argTypes),
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
