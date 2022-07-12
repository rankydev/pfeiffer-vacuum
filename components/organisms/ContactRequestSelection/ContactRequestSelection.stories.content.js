import { generalQuery } from '~/components/molecules/ContactRequestSubject/ContactRequestSubject.stories.content'
import contactRequestSubject from '~/components/molecules/ContactRequestSubject/ContactRequestSubject.stories.content'

const subject = {
  _uid: '79118486-2e1e-40a8-b71d-59919a7f1620',
  type: 'general_query',
  title: 'Allgemeine Anfrage',
  component: 'ContactRequestSubject',
  description: [
    {
      _uid: 'd0536bc6-1089-4841-b31b-011613411462',
      richtext:
        '<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur s</p>',
      component: 'Richtext',
      _editable:
        '<!--#storyblok#{"name": "Richtext", "space": "158542", "uid": "d0536bc6-1089-4841-b31b-011613411462", "id": "137975252"}-->',
    },
  ],
  _editable:
    '<!--#storyblok#{"name": "ContactRequestSubject", "space": "158542", "uid": "79118486-2e1e-40a8-b71d-59919a7f1620", "id": "137975252"}-->',
}

const requestSubjects = [subject, subject, subject]

export const mainHeadline = 'Kontakt'
export const selectionHeadline = 'Ihre Anfrage'
export const text =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non, libero sapien sodales placerat lorem tincidunt.'
export const contactRequests = requestSubjects

export default {}
