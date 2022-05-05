import image from './../../atoms/ResponsiveImage/ResponsiveImage.stories.content.js'
import { smallText } from '~/components/atoms/Richtext/Richtext.stories.content.js'

export const imageWithDescriptionContent = {
  _uid: '0fbbfe8f-5ed3-4652-a2aa-08f10412b3e0',
  description: [smallText],
  image: image.image,
  aspectRatio: '1:1',
  component: 'ImageWithDescription',
}

export const aspectRatioOptions = ['1:1', '16:9', '2:3', '3:2', '3:1']

export default {}
