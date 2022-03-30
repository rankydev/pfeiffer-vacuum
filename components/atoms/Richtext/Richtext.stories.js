import Richtext from '~/components/atoms/Richtext/Richtext'
import richtext from '~/components/atoms/Richtext/Richtext.stories.content'

const props = {
  richtext: richtext.content.richtext,
}

export default {
  title: 'Atoms/Richtext',
  component: Richtext,
  parameters: {
    docs: {
      description: {
        component:
          'This component ist designed to render richtext, usually as a CMS component.',
      },
      source: {
        code:
          '// This is a CMS component and designed to receive a storyblok object. \n' +
          '// The paragraph key should contain a string which will be injected via v-html \n' +
          '<richtext content="object" />',
      },
    },
  },
  argTypes: {
    content: props.content,
  },
}

const template = `
      <div class="documentation-preview">
        <richtext v-bind="props" />
      </div>
    `

export const Default = () => ({
  components: { Richtext },
  template,
  data: () => ({ props }),
})
