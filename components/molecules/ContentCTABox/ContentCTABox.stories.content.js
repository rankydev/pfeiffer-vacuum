import richtext from '~/components/atoms/Richtext/Richtext.stories.content.js'
import { buttonFilledSecondary } from '~/components/atoms/Button/Button.stories.content.js'

export default {
  _uid: 'a8cb68c9-bbc4-4e81-beca-f0a490b3848d',
  component: 'ContentCTABox',
  headline: 'Lorem title',
  description: [
    { ...richtext.content, richtext: 'Lorem ipsum dolor sit amet' },
  ],
  button: [buttonFilledSecondary],
}
