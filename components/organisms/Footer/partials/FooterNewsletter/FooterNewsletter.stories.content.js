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
  richtext: [],
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
