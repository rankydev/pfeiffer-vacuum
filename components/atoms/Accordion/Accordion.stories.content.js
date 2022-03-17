import richtext from '~/components/atoms/Richtext/Richtext.stories.content.js'
import { nanoid } from 'nanoid'

const accordionEntry = () => ({
  _uid: nanoid(),
  label: 'Lorem Ipsum',
  items: [richtext.content],
})

export const accordionEntries = [
  accordionEntry(),
  accordionEntry(),
  accordionEntry(),
  accordionEntry(),
  accordionEntry(),
]

export const level = 'h1'

export default {}
