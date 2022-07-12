import richtext from '~/components/atoms/Richtext/Richtext.stories.content.js'
import { nanoid } from 'nanoid'

const subjectEntry = () => ({
  _uid: nanoid(),
  title: 'Lorem title',
  description: [
    { ...richtext.content, richtext: 'Lorem ipsum dolor sit amet' },
  ],
  type: 'Lorem type',
  _editable: '',
})

export const subjectEntries = [subjectEntry(), subjectEntry(), subjectEntry()]

export default {
  title: 'Lorem title',
  description: [
    { ...richtext.content, richtext: 'Lorem ipsum dolor sit amet' },
  ],
  type: 'Lorem type',
}
