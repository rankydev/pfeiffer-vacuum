import { homeStageSlideContentMock } from '~/components/organisms/HomeStage/HomeStageSlide/partials/HomeStageSlideContent/HomeStageSlideContent.stories.content'

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
  stageContent: [homeStageSlideContentMock],
}

export const bubbleText =
  '<p>10<sup class="superscript">3 </sup>- 10<sup class="superscript">-6 </sup>hPa</p>'

export const bubble = [
  {
    title: 'Hochvakuum',
    position: 'right',
    richtext: bubbleText,
    component: 'Bubble',
  },
]

export const bubble2 = [
  {
    title: 'Hochvakuum',
    position: 'left',
    richtext: bubbleText,
    component: 'Bubble',
  },
]

export const homeStageSlideContent = {
  bubble,
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

export const homeStageSecondSlideContent = {
  bubble: bubble2,
  interlay: {
    alt: 'Everest',
    name: '',
    focus: null,
    title: '',
    originalFilename:
      '/global/cms/assets/f/158540/2699x1800/349cc6dbbf/everest-min.png',
    originalFilenameRelative: '/f/158540/2699x1800/349cc6dbbf/everest-min.png',
    copyright: null,
    fieldtype: 'asset',
  },
  ...requiredContent,
}

export const homeStageThirdSlideContent = {
  bubble,
  interlay: {
    alt: 'Aurora',
    name: '',
    focus: null,
    title: '',
    originalFilename:
      '/global/cms/assets/f/158540/2699x1800/d793f38761/aurora-min.png',
    originalFilenameRelative: '/f/158540/2699x1800/d793f38761/aurora-min.png',
    copyright: null,
    fieldtype: 'asset',
  },
  ...requiredContent,
}

export default {}
