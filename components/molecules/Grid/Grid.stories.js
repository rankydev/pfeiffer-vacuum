import Grid from '@/components/molecules/Grid/Grid'
import gridContent from '@/components/molecules/Grid/Grid.stories.content'

const props = {
  items: gridContent.items,
  colSpan: gridContent.colSpan,
}

export default {
  title: 'Molecules/Grid',
  component: Grid,
  parameters: {
    docs: {
      description: {
        component:
          'The Grid is a component, which allows the content manager to group specific content items inside Storyblok ' +
          'inside a grid. The grid will always have 12 columns on desktop, 8 columns on tablet and 4 columns on mobile. ' +
          'The property columnSpan gives the editor the possibility to change the span of the elements in the row. As an ' +
          'example: If the editor sets the value of colSpan to 8,4 the first element will reach from column 1 to 8 and ' +
          'the second element will reach from column 9 to 12. The values must be separated by commas and it is important ' +
          'to not use whitespaces.',
      },
    },
  },
}

const template = `
      <div class="documentation-preview">
        <Grid v-bind="props" />
      </div>
    `

export const Default = () => ({
  components: { Grid },
  template,
  data: () => ({ props }),
})
