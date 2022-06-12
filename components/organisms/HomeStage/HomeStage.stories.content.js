import {
  homeStageSlideContent,
  homeStageSlideContent2,
  homeStageSlideContent3,
} from '~/components/organisms/HomeStage/HomeStageSlide/HomeStageSlide.stories.content'

export const homeStageSingleSlideContent = {
  slides: [homeStageSlideContent],
}

export default {
  slides: [
    homeStageSlideContent,
    homeStageSlideContent2,
    homeStageSlideContent3,
  ],
  infinite: false,
  autoplay: true,
  autoplaySpeed: '5',
}
