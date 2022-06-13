import {
  homeStageSlideContent,
  homeStageSecondSlideContent,
  homeStageThirdSlideContent,
} from '~/components/organisms/HomeStage/HomeStageSlide/HomeStageSlide.stories.content'

export const homeStageSingleSlideContent = {
  slides: [homeStageSlideContent],
}

export default {
  slides: [
    homeStageSlideContent,
    homeStageSecondSlideContent,
    homeStageThirdSlideContent,
  ],
  infinite: false,
  autoplay: true,
  autoplaySpeed: '5',
}
