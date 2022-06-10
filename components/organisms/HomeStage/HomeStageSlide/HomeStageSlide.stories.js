import HomeStageSlide from '~/components/organisms/HomeStage/HomeStageSlide/HomeStageSlide.vue'
import { homeStageSlideContent } from '~/components/organisms/HomeStage/HomeStageSlide/HomeStageSlide.stories.content'

const argTypes = {
  stageContent: {
    defaultValue: homeStageSlideContent.stageContent,
  },
  image: {
    defaultValue: homeStageSlideContent.image,
  },
  interlay: {
    defaultValue: homeStageSlideContent.interlay,
  },
  bubble: {
    defaultValue: homeStageSlideContent.bubble,
  },
}

export default {
  title: 'organisms/HomeStageSlide',
  component: HomeStageSlide,
  parameters: {
    docs: {
      description: {
        component:
          'This is one home stage slide which is used in the home stage of the application. <br>' +
          'It nests the home-stage-slide-content and the bubble component. <br><br>' +
          'Further information on how the home stage is structured can be found here: <br>' +
          'https://confluence.diva-e.com/display/PVWEB/HomeStage+Component',
      },
      source: {
        code: '<HomeStageSlide v-bind="{ stageContent, image, interlay, bubble }"  />',
      },
    },
  },
  argTypes: argTypes,
}

const Template = (args) => ({
  components: { HomeStageSlide },
  setup() {
    return {
      args,
    }
  },
  template: `
  <div class="documentation-preview">
    <HomeStageSlide v-bind="args"/>
  </div>
`,
})

export const Default = Template.bind({})
