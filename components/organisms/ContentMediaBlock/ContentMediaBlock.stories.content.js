import Video from '~/components/atoms/VideoPlayer/VideoPlayer.stories.content.js'
import { imageWithDescriptionContent } from '~/components/molecules/ImageWithDescription/ImageWithDescription.stories.content.js'
import { smallText } from '~/components/atoms/Richtext/Richtext.stories.content.js'
import {
  buttonOutlinedSecondary,
  buttonFilledSecondary,
} from '~/components/atoms/Button/Button.stories.content'

export const orders = ['content/media', 'media/content']
export const ratios = ['half/half', 'one/three', 'three/one']

export const headline = 'Headline 2'
export const subline = 'Subline 3'
export const mediaVideo = [Video]
export const mediaImage = [imageWithDescriptionContent]
export const order = 'content/media'
export const ratio = 'half/half'
export const buttons = [buttonOutlinedSecondary, buttonFilledSecondary]
export const richtext = smallText.richtext

export const contentVideo = {
  _uid: '9e1c946c-ccbf-4e18-85ea-998a2de8a845',
  headline,
  media: mediaVideo,
  order,
  ratio,
  buttons,
  subline,
  richtext,
  component: 'ContentMediaBlock',
  _editable:
    '<!--#storyblok#{"name": "ContentMediaBlock", "space": "152017", "uid": "9e1c946c-ccbf-4e18-85ea-998a2de8a845", "id": "119228911"}-->',
}
export const contentImage = {
  _uid: '9e1c946c-ccbf-4e18-85ea-998a2de8a845',
  headline,
  media: mediaImage,
  order,
  ratio,
  buttons,
  subline,
  richtext,
  component: 'ContentMediaBlock',
  _editable:
    '<!--#storyblok#{"name": "ContentMediaBlock", "space": "152017", "uid": "9e1c946c-ccbf-4e18-85ea-998a2de8a845", "id": "119228911"}-->',
}

export default {}
