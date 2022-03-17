import richtext from '~/components/atoms/Richtext/Richtext.stories.content.js'
import { nanoid } from 'nanoid'

const accordionEntry = () => ({
  _uid: nanoid(),
  label: 'Lorem Ipsum',
  items: [richtext.content],
  _editable: '',
})

export const accordionEntries = [
  accordionEntry(),
  accordionEntry(),
  accordionEntry(),
  accordionEntry(),
  accordionEntry(),
]

export const levels = ['h3', 'h4', 'h5', 'h6']

export default {}
