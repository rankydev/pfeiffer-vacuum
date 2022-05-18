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
          'This is the home stage of the application. <br>' +
          'It nests the home-stage-content and the bubble component. <br><br>' +
          'Further information on how the home stage is structured can be found here: <br>' +
          'https://confluence.diva-e.com/display/PVWEB/HomeStage+Component',
      },
      source: {
        code: '<HomeStageModule v-bind="{ stageContent, image, interlay, bubble }"  />',
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
