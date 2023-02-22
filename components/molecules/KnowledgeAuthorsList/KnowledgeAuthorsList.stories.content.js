import {
  image,
  name,
  title,
} from '~/components/molecules/KnowledgeAuthor/KnowledgeAuthor.stories.content'

const authorCard = {
  image: image,
  name: name,
  title: title,
  component: 'KnowledgeAuthor',
}

export const authorcardlist = [
  authorCard,
  authorCard,
  authorCard,
  authorCard,
  authorCard,
  authorCard,
  authorCard,
  authorCard,
  authorCard,
  authorCard,
  authorCard,
  authorCard,
]

export const isWhitelist = false

export default {
  authorcardlist,
  isWhitelist,
}
