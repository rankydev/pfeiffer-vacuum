import {
  homeStageModuleContent,
  homeStageModuleContent2,
  homeStageModuleContent3,
} from '~/components/organisms/HomeStageCarousel/HomeStageModule/HomeStageModule.stories.content'

export default {
  slides: [
    homeStageModuleContent,
    homeStageModuleContent2,
    homeStageModuleContent3,
  ],
  infinite: false,
  autoplay: true,
  autoplaySpeed: '5',
}
