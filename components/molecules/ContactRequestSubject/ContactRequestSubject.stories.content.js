import richtext from '~/components/atoms/Richtext/Richtext.stories.content.js'
import contactctabox from '~/components/molecules/ContactCTABox/ContactCTABox.stories.content'
import { nanoid } from 'nanoid'

export default () => {
  return {
    title: 'Lorem title',
    description: [
      { ...richtext.content, richtext: 'Lorem ipsum dolor sit amet' },
    ],
    type: [contactctabox],
    component: 'ContactRequestSubject',
    _uid: nanoid(),
  }
}
