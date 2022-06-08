import HomeStageModule from './HomeStageModule.vue'
import HomeStageModuleContent from './HomeStageModule.stories.content'

const argTypes = {
  slides: {
    control: { type: 'array' },
    defaultValue: HomeStageModuleContent.slides,
  },
  autoplay: {
    control: { type: 'boolean' },
    defaultValue: HomeStageModuleContent.autoplay,
  },
  autoplaySpeed: {
    control: { type: 'number' },
    defaultValue: HomeStageModuleContent.autoplaySpeed,
  },
  infinite: {
    control: { type: 'boolean' },
    defaultValue: HomeStageModuleContent.infinite,
  },
}

export default {
  title: 'organisms/HomeStageModule',
  component: HomeStageModule,
  parameters: {
    docs: {
      description: {
        component:
          'Homestage carousel component used as the stage of the homepage.',
      },
    },
  },
  argTypes,
}

const Template = (args, { argTypes }) => ({
  components: { HomeStageModule },
  props: Object.keys(argTypes),
  setup() {
    return { args }
  },
  template: `
    <div class="documentation-preview">
      <HomeStageModule v-bind="args" />
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = {}
