import HomeStageContent from '~/components/organisms/HomeStageModule/partials/HomeStageContent/HomeStageContent.stories.content'
import { bubbleText } from '~/components/atoms/Richtext/Richtext.stories.content.js'

export default {
  image: {
    id: 4704291,
    alt: '',
    name: '',
    focus: null,
    title: '',
    filename: 'https://a.storyblok.com/f/156817/2560x1138/8e3823801e/sky.jpg',
    originalFilename:
      'https://a.storyblok.com/f/156817/2560x1138/8e3823801e/sky.jpg',
    copyright: '',
    fieldtype: 'asset',
  },
  bubble: [
    {
      _uid: '1a435e3c-7570-4c66-9b92-543bf55c5bfa',
      title: 'Hochvakuum',
      position: 'right',
      richtext: bubbleText.richtext,
      component: 'Bubble',
      _editable:
        '<!--#storyblok#{"name": "Bubble", "space": "156817", "uid": "1a435e3c-7570-4c66-9b92-543bf55c5bfa", "id": "132667482"}-->',
    },
  ],
  interlay: {
    id: 4704279,
    alt: '',
    name: '',
    focus: null,
    title: '',
    filename:
      'https://a.storyblok.com/f/156817/2699x1800/6d91cb1a0f/astronaut-min.png',
    originalFilename:
      'https://a.storyblok.com/f/156817/2699x1800/6d91cb1a0f/astronaut-min.png',
    copyright: null,
    fieldtype: 'asset',
  },
  component: 'HomeStageModule',
  stageContent: HomeStageContent,
}
