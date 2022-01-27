import htmlTextContent from './HtmlText.stories.content'
import HtmlText from '~/components/atoms/HtmlText/HtmlText.vue'

const props = {
  html: htmlTextContent.text,
}

export default {
  title: 'Atoms/Html Text',
  component: HtmlText,
  parameters: {
    docs: {
      description: {
        component: 'Simple wrapper for text with html markup',
      },
    },
  },
}

const template = `
      <div class="documentation-preview">
        <HtmlText v-bind="props" />
      </div>
    `

export const Simple = () => ({
  components: { HtmlText },
  template,
  data: () => ({ props }),
})
