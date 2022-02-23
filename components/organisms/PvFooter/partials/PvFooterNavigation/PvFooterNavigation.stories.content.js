import {
  footerMenuOne,
  footerMenuThree,
  footerMenuTwo,
} from '~/components/molecules/LinkList/LinkList.stories.content'

export const newsletter = {
  title: 'Newsletter',
  text: '<p>Sie möchten über aktuelle News von Pfeiffer Vacuum informiert werden? Dann abonnieren Sie unseren Newsletter.</p>',
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
