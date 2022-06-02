import HomeStageModule from '~/components/organisms/HomeStageCarousel/HomeStageModule/HomeStageModule.vue'
import { homeStageModuleContent } from '~/components/organisms/HomeStageCarousel/HomeStageModule/HomeStageModule.stories.content'

const argTypes = {
  stageContent: {
    defaultValue: homeStageModuleContent.stageContent,
  },
  image: {
    defaultValue: homeStageModuleContent.image,
  },
  interlay: {
    defaultValue: homeStageModuleContent.interlay,
  },
  bubble: {
    defaultValue: homeStageModuleContent.bubble,
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
