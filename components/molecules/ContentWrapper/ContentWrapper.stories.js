import ContentWrapper from '@/components/molecules/ContentWrapper/ContentWrapper'
import contentWrapper from '@/components/molecules/ContentWrapper/ContentWrapper.stories.content'

const props = {
  items: contentWrapper.content,
}

export default {
  title: 'Molecules/ContentWrapper',
  component: ContentWrapper,
  parameters: {
    docs: {
      description: {
        component:
          'The ContentWrapper is a component, which allows the content manager to group specific content items inside Storyblok.',
      },
    },
  },
}

const template = `
      <div class="documentation-preview">
        <ContentWrapper v-bind="props" />
      </div>
    `

export const Default = () => ({
  components: { ContentWrapper },
  template,
  data: () => ({ props }),
})
