import richtext from '~/components/atoms/Richtext/Richtext.stories.content.js'
import ctabox from '~/components/molecules/CTABox/CTABox.stories.content.js'

export default {
  title: 'Lorem title',
  description: [
    { ...richtext.content, richtext: 'Lorem ipsum dolor sit amet' },
  ],
  type: [ctabox],
  component: 'ContactRequestSubject',
  _uid: 'test123',
}
