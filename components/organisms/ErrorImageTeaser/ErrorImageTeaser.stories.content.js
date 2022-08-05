import { errorImageTeaserContent } from '~/components/organisms/HomeStage/HomeStageSlide/partials/HomeStageSlideContent/HomeStageSlideContent.stories.content'

const requiredContent = {
  image: {
    alt: 'Sky',
    name: '',
    focus: null,
    title: '',
    originalFilename:
      'https://a.storyblok.com/f/156817/2560x1138/8e3823801e/sky.jpg',
    copyright: '',
    fieldtype: 'asset',
  },
  component: 'HomeStageSlide',
  stageContent: [errorImageTeaserContent],
}

export const errorTeaserContent = {
  interlay: {
    alt: 'Astronaut',
    name: '',
    focus: null,
    title: '',
    originalFilename:
      'https://a.storyblok.com/f/156817/2699x1800/6d91cb1a0f/astronaut-min.png',
    copyright: null,
    fieldtype: 'asset',
  },
  ...requiredContent,
}

export default {}
