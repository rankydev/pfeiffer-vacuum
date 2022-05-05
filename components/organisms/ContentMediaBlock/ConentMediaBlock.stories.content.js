import Video from '~/components/atoms/VideoPlayer/VideoPlayer.stories.content.js'
import CTABox from '~/components/molecules/CTABox/CTABox.stories.content.js'
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
export const mediaCTA = [CTABox]
export const order = 'content/media'
export const ratio = 'half/half'
export const buttons = [buttonOutlinedSecondary, buttonFilledSecondary]
export const richtext = smallText.richtext
export default {}
