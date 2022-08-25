import ResultHeadline from '~/components/molecules/ResultHeadline/ResultHeadline.vue'
import {
  headline,
  identifier,
  subinformation,
  subline,
  link,
} from './ResultHeadline.stories.content.js'

export default {
  title: 'Molecules/m_122 ResultHeadline',
  component: ResultHeadline,
  parameters: {
    docs: {
      description: {
        component:
          'The Result Headline is used to display the search results with their count and a backLink if available. ',
      },
      source: {
        code: '<ResultHeadline v-bind="{ headline, identifier, count, backLink }"  />',
      },
    },
  },
}

const Template = (args) => ({
  components: { ResultHeadline },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <ResultHeadline v-bind="args" />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = { headline, identifier, subinformation, link }

export const withSubline = Template.bind({})
withSubline.args = { headline, identifier, subline }
