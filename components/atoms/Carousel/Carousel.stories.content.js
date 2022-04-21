import { nanoid } from 'nanoid'

export const carouselEntry = () => ({
  _uid: nanoid(),
  title: 'Title Ipsum',
  text: 'Lorem ipsum',
})

export const carouselEntries = [
  carouselEntry(),
  carouselEntry(),
  carouselEntry(),
  carouselEntry(),
  carouselEntry(),
]

export default {}
