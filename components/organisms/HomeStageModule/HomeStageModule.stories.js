import HomeStageModule from '~/components/organisms/HomeStageModule/HomeStageModule.vue'
import HomeStageModuleContent from '~/components/organisms/HomeStageModule/HomeStageModule.stories.content'

const argTypes = {
  stageContent: {
    defaultValue: HomeStageModuleContent.stageContent,
  },
  image: {
    defaultValue: HomeStageModuleContent.image,
  },
  interlay: {
    defaultValue: HomeStageModuleContent.interlay,
  },
  bubble: {
    defaultValue: HomeStageModuleContent.bubble,
  },
}

export default {
  title: 'Organisms/HomeStageModule',
  component: HomeStageModule,
  parameters: {
    docs: {
      description: {
        component:
          'The home stage component, nesting the home-stage-content component.',
      },
    },
  },
  argTypes: argTypes,
}

const Template = (args) => ({
  components: { HomeStageModule },
  setup() {
    return {
      args,
    }
  },
  template: `
  <div class="documentation-preview">
    <HomeStageModule v-bind="args"/>
  </div>
`,
})

export const Default = Template.bind({})
