import { smallText } from '~/components/atoms/Richtext/Richtext.stories.content.js'
import imageContent from '~/components/atoms/ResponsiveImage/ResponsiveImage.stories.content.js'
import { buttonFilledThird } from '~/components/atoms/Button/Button.stories.content.js'

export const image = imageContent.image
export const description = [smallText]
export const button = [buttonFilledThird]

export default {
  image,
  _uid: 'a8cb68c9-bbc4-4e81-beca-f0a490b3848d',
  component: 'CTABox',
  description,
  button,
}
