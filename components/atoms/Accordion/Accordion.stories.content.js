import richtext from '~/components/atoms/Richtext/Richtext.stories.content.js'
import { imageWithDescriptionContent } from '~/components/molecules/ImageWithDescription/ImageWithDescription.stories.content.js'
import { nanoid } from 'nanoid'

const accordionEntry = (isActive = false) => ({
  _uid: nanoid(),
  uiComponent: 'Accordion',
  label: 'Lorem Ipsum',
  items: [richtext.content],
  isActive,
  _editable: '',
})

const accordionEntryImage = (isActive = false) => ({
  _uid: nanoid(),
  label: 'Lorem Ipsum',
  items: [imageWithDescriptionContent],
  isActive,
  _editable: '',
})

export const accordionEntries = [
  accordionEntry(true),
  accordionEntry(),
  accordionEntry(true),
  accordionEntry(),
  accordionEntry(),
]

export const accordionEntriesWithImg = [accordionEntryImage()]

export const levels = ['h3', 'paragraph']

export default {}
