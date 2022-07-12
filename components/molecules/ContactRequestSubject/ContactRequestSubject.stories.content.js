import richtext from '~/components/atoms/Richtext/Richtext.stories.content.js'
import { nanoid } from 'nanoid'

export const generalQuery = {
  _uid: nanoid(),
  type: 'general_query',
  title: 'Allgemeine Anfrage',
  component: 'ContactRequestSubject',
  description: [
    { ...richtext.content, richtext: 'Lorem ipsum dolor sit amet' },
  ],
  _editable: '',
}

export default {
  title: 'Lorem title',
  description: [
    { ...richtext.content, richtext: 'Lorem ipsum dolor sit amet' },
  ],
  type: 'Lorem type',
}
