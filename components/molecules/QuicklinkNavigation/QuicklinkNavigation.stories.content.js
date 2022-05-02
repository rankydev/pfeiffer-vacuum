import { quicklinks } from '~/components/molecules/Quicklink/QuickLink.stories.content.js'

export const quicklinkNavigation = {
  _uid: '83765e37-cc94-4ecb-84fa-f25b57dbb4de',
  component: 'OnPageNavigation',
  quicklinks,
  _editable:
    '<!--#storyblok#{"name": "OnPageNavigation", "space": "144293", "uid": "83765e37-cc94-4ecb-84fa-f25b57dbb4de", "id": "104316822"}-->',
}

export const imprintQuicklinkContent = {
  component: 'OnPageNavigation',
  quicklinks: [
    {
      label: 'Haftung',
      anchor: 'testAnchor1',
      component: 'Quicklink',
    },
    {
      label: 'Technische Hinweise',
      anchor: 'testAnchor2',
      component: 'Quicklink',
    },
  ],
}

export default {}
