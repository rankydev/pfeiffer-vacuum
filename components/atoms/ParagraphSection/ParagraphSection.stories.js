import ParagraphSection from '@/components/atoms/ParagraphSection/ParagraphSection'
import paragraphSection from '@/components/atoms/ParagraphSection/ParagraphSection.stories.content'

const props = {
  content: paragraphSection.content,
}

export default {
  title: 'Atoms/ParagraphSection',
  component: ParagraphSection,
  parameters: {
    docs: {
      description: {
        component:
          'The ParagraphSection is a component, which displays richtext.',
      },
    },
  },
}

const template = `
      <div class="documentation-preview">
        <ParagraphSection v-bind="props" />
      </div>
    `

export const Default = () => ({
  components: { ParagraphSection },
  template,
  data: () => ({ props }),
})
