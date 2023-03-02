import KnowledgeAssetButton from '~/components/molecules/KnowledgeAssetButton/KnowledgeAssetButton.vue'

import {
  date,
  webinarRegistrationId,
  assetUrl,
  isDetailPage,
} from './KnowledgeAssetButton.stories.content'

const argTypes = {
  webinarRegistrationId: {
    defaultValue: webinarRegistrationId,
    control: { type: 'text' },
  },
  date: {
    defaultValue: date,
    control: { type: 'text' },
  },
  assetUrl: {
    defaultValue: assetUrl,
    control: { type: 'text' },
  },
  isDetailPage: {
    defaultValue: isDetailPage,
    control: { type: 'boolean' },
  },
}

export default {
  title: 'Molecules/m_148 Knowledge Asset Button',
  component: KnowledgeAssetButton,
  parameters: {
    docs: {
      description: {
        component:
          'The Knowledge Asset Button is used to register for Webinars, link to Assets or open a Whitepaper.',
      },
    },
  },
  argTypes: argTypes,
}

const Template = (args) => ({
  components: { KnowledgeAssetButton },
  setup() {
    return {
      args,
    }
  },
  template: `
  <div class="documentation-preview">
    <KnowledgeAssetButton v-bind="args"/>
  </div>
`,
})

export const Default = Template.bind({})
Default.args = { type: 'WEBINAR' }

// Futur Webinar
export const Webinar = Template.bind({})
Webinar.args = { type: 'WEBINAR' }

// Futur Webinar on a Detailpage
export const WebinarDetailPage = Template.bind({})
WebinarDetailPage.args = { type: 'WEBINAR', isDetailPage: true }

// Webinar in the Past with Assets
export const WebinarPast = Template.bind({})
WebinarPast.args = { type: 'WEBINAR', date: '2020-02-23 08:45' }

// Webinar in the Past with no Assets
export const WebinarNoAsset = Template.bind({})
WebinarNoAsset.args = {
  type: 'WEBINAR',
  date: '2020-02-23 08:45',
  assetUrl: '',
}

// Deafult Whitepaper
export const Whitepaper = Template.bind({})
Whitepaper.args = { type: 'WHITEPAPER' }

// Whitepaper on Detailpage
export const WhitepaperDetailPage = Template.bind({})
WhitepaperDetailPage.args = { type: 'WHITEPAPER', isDetailPage: true }
