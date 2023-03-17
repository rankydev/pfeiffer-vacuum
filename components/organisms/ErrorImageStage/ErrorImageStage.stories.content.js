import { errorStageTeaserContent } from '~/components/organisms/HomeStage/HomeStageSlide/partials/HomeStageSlideContent/HomeStageSlideContent.stories.content'

const requiredContent = {
  image: {
    alt: 'Sky',
    name: '',
    focus: null,
    title: '',
    originalFilename:
      '/global/cms/assets/f/156817/2560x1138/8e3823801e/sky.jpg',
    originalFilenameRelative: '/f/156817/2560x1138/8e3823801e/sky.jpg',
    copyright: '',
    fieldtype: 'asset',
  },
  component: 'HomeStageSlide',
  stageContent: [errorStageTeaserContent],
}

export const errorStageContent = {
  interlay: {
    alt: 'Astronaut',
    name: '',
    focus: null,
    title: '',
    originalFilename:
      '/global/cms/assets/f/156817/2699x1800/6d91cb1a0f/astronaut-min.png',
    originalFilenameRelative:
      '/f/156817/2699x1800/6d91cb1a0f/astronaut-min.png',
    copyright: null,
    fieldtype: 'asset',
  },
  ...requiredContent,
}

export default {}
