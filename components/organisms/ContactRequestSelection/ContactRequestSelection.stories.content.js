import {
  subjectCTA,
  subjectForm,
} from '~/components/molecules/ContactRequestSubject/ContactRequestSubject.stories.content'

const subjects = [subjectCTA, subjectForm]

export const mainHeadline = 'Kontakt'
export const sectionHeadline = 'Ihre Anfrage'
export const text =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non, libero sapien sodales placerat lorem tincidunt.'
export const requestSubjects = subjects

export default {
  component: 'ContactRequestSelection',
  mainHeadline,
  sectionHeadline,
  text,
  requestSubjects,
}
