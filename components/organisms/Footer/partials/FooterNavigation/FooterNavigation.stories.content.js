import {
  footerMenuOne,
  footerMenuThree,
  footerMenuTwo,
} from '~/components/molecules/LinkList/LinkList.stories.content'

export const newsletter = {
  title: 'Newsletter',
  text: {
    content: {
      _uid: '51e8d701-ae97-4800-b74e-58b93e5f09cd',
      component: 'Richtext',
      richtext:
        '<p>Sie möchten über aktuelle News von Pfeiffer Vacuum informiert werden? Dann abonnieren Sie unseren Newsletter.</p>',
      _editable:
        '<!--#storyblok#{"name": "Richtext", "space": "144293", "uid": "51e8d701-ae97-4800-b74e-58b93e5f09cd", "id": "104316822"}-->',
    },
  },
  link: {
    icon: 'newsletter',
    label: 'Anmelden',
    link: {
      href: '/de/newsletter',
      target: '_self',
      type: 'INTERNAL',
    },
  },
}

export const footerMenus = [footerMenuOne, footerMenuTwo, footerMenuThree]

export const footerNavigation = {
  footerMenus,
  newsletter,
}

export default {}
