import {
  bubbleText,
  smallText,
} from '~/components/atoms/Richtext/Richtext.stories.content.js'
import Video from '@/components/atoms/VideoPlayer/VideoPlayer.stories.content'
import CTABox from '@/components/molecules/CTABox/CTABox.stories.content'
import { imageWithDescriptionContent } from '@/components/molecules/ImageWithDescription/ImageWithDescription.stories.content'
import {
  buttonFilledSecondary,
  buttonOutlinedSecondary,
} from '@/components/atoms/Button/Button.stories.content'

export default {
  headline: 'Newsletter',
  richtext: [
    {
      _uid: '4d12b093-e25f-4ff2-bc8c-f645ca6e0e11',
      richtext:
        '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam ipsum dolor sit amet</p>',
      component: 'RichtextBasic',
      uiComponent: 'Richtext',
      _editable:
        '<!--#storyblok#{"name": "RichtextBasic", "space": "152017", "uid": "4d12b093-e25f-4ff2-bc8c-f645ca6e0e11", "id": "119228911"}-->',
    },
  ],
  buttons: [
    {
      icon: 'arrow_forward',
      size: 'normal',
      label: 'Zur Newsletteranmeldung',
      shape: 'outlined',
      variant: 'inverted',
      disabled: false,
      component: 'Button',
      prependIcon: false,
    },
  ],
  links: [],
}
