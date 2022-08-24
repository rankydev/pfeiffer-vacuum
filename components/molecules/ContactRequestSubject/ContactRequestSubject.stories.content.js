import richtext from '~/components/atoms/Richtext/Richtext.stories.content.js'
import contentCTABox from '~/components/molecules/ContentCTABox/ContentCTABox.stories.content'
import contactForm from '~/components/molecules/ContactRequestForm/ContactRequestForm.stories.content'
import { nanoid } from 'nanoid'

export const subjectCTA = {
  title: 'Lorem title',
  description: [
    { ...richtext.content, richtext: 'Lorem ipsum dolor sit amet' },
  ],
  isSelected: false,
  type: [contentCTABox],
  component: 'ContactRequestSubject',
  _uid: nanoid(),
}

export const subjectForm = {
  title: 'Lorem title',
  description: [
    { ...richtext.content, richtext: 'Lorem ipsum dolor sit amet' },
  ],
  isSelected: false,
  type: [contactForm],
  component: 'ContactRequestSubject',
  _uid: nanoid(),
}
export default {}
