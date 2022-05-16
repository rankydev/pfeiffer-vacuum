import HomeStageContent from '~/components/organisms/HomeStageModule/partials/HomeStageContent/HomeStageContent.stories.content'
import { bubbleText } from '~/components/atoms/Richtext/Richtext.stories.content.js'

export const bubble = [
  {
    title: 'Hochvakuum',
    position: 'right',
    richtext: bubbleText.richtext,
    component: 'Bubble',
  },
]

export default {
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
  component: 'HomeStageModule',
  stageContent: [HomeStageContent],
}
