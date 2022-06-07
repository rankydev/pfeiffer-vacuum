import HomeStageContent from '~/components/organisms/HomeStageCarousel/HomeStageModule/partials/HomeStageContent/HomeStageContent.stories.content'
import { bubbleText } from '~/components/atoms/Richtext/Richtext.stories.content'

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
  component: 'HomeStageModule',
  stageContent: [HomeStageContent],
}

export const bubble = [
  {
    title: 'Hochvakuum',
    position: 'right',
    richtext: [bubbleText],
    component: 'Bubble',
  },
]

export const bubble2 = [
  {
    title: 'Hochvakuum',
    position: 'left',
    richtext: [bubbleText],
    component: 'Bubble',
  },
]

export const homeStageModuleContent = {
  bubble,
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

export const homeStageModuleContent2 = {
  bubble: bubble2,
  interlay: {
    alt: 'Everest',
    name: '',
    focus: null,
    title: '',
    originalFilename:
      'https://a.storyblok.com/f/158540/2699x1800/349cc6dbbf/everest-min.png',
    copyright: null,
    fieldtype: 'asset',
  },
  ...requiredContent,
}

export const homeStageModuleContent3 = {
  bubble,
  interlay: {
    alt: 'Aurora',
    name: '',
    focus: null,
    title: '',
    originalFilename:
      'https://a.storyblok.com/f/158540/2699x1800/d793f38761/aurora-min.png',
    copyright: null,
    fieldtype: 'asset',
  },
  ...requiredContent,
}

export default {}
