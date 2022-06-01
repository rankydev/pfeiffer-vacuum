export const newsletterRichtext = [
  {
    _uid: '4d12b093-e25f-4ff2-bc8c-f645ca6e0e11',
    richtext:
      '<p>Sie möchten über aktuelle News von Pfeiffer Vacuum informiert werden? Dann abonnieren Sie unseren Newsletter.</p>',
    component: 'RichtextBasic',
    uiComponent: 'Richtext',
    _editable:
      '<!--#storyblok#{"name": "RichtextBasic", "space": "152017", "uid": "4d12b093-e25f-4ff2-bc8c-f645ca6e0e11", "id": "119228911"}-->',
  },
]

export const newsletterHeadline = 'Newsletter'

export const newsletterButton = [
  {
    icon: 'arrow_forward',
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
  headline: newsletterHeadline,
  richtext: newsletterRichtext,
  button: newsletterButton,
}
