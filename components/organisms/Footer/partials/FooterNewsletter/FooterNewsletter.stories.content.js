export const newsletterRichtext = [
  {
    richtext:
      '<p>Sie möchten über aktuelle News von Pfeiffer Vacuum informiert werden? Dann abonnieren Sie unseren Newsletter.</p>',
    component: 'Richtext',
    uiComponent: 'Richtext',
  },
]

export const newsletterHeadline = 'Newsletter'

export const newsletterButton = [
  {
    icon: 'send',
    size: 'normal',
    label: 'Zur Newsletteranmeldung',
    shape: 'outlined',
    variant: 'inverted',
    disabled: false,
    component: 'Button',
    prependIcon: false,
  },
]

export default {
  _uid: '1232b093-e25f-4ff2-bc8c-f645ca6e0e11',
  component: 'FooterNewsletter',
  headline: newsletterHeadline,
  richtext: newsletterRichtext,
  button: newsletterButton,
}
