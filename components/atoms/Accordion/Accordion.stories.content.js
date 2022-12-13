import richtext from '~/components/atoms/Richtext/Richtext.stories.content.js'
import { imageWithDescriptionContent } from '~/components/molecules/ImageWithDescription/ImageWithDescription.stories.content.js'
import { nanoid } from 'nanoid'

const accordionEntry = (isActive = false) => ({
  _uid: nanoid(),
  label: 'Lorem Ipsum',
  items: [richtext.content, richtext.content],
  isActive,
  _editable: '',
})

const accordionEntryImage = (isActive = false) => ({
  _uid: nanoid(),
  label: 'Lorem Ipsum',
  items: [imageWithDescriptionContent, richtext.content],
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

export const accordion = {
  _uid: nanoid(),
  level: 'h3',
  multiple: false,
  component: 'Accordion',
  accordionEntries,
  _editable:
    '<!--#storyblok#{"name": "Accordion", "space": "158542", "uid": "47cad62c-d867-4f2f-a6d0-d66e1b70776e", "id": "137975252"}-->',
}

export const accordionEntriesWithImg = [accordionEntryImage()]

export const levels = ['h3', 'paragraph']

export default {}
