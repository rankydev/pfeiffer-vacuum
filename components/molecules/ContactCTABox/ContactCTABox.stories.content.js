import richtext from '~/components/atoms/Richtext/Richtext.stories.content.js'
import { buttonFilledSecondary } from '~/components/atoms/Button/Button.stories.content.js'

export default {
  headline: 'Lorem title',
  description: [
    { ...richtext.content, richtext: 'Lorem ipsum dolor sit amet' },
  ],
  button: [buttonFilledSecondary],
}
