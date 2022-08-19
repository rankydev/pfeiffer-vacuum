import Infobox from './Infobox.vue'

export default {
  title: 'Molecules/m_126 Infobox',
  component: Infobox,
  parameters: {
    docs: {
      description: {
        component:
          'The Infobox component is used to display an informational text on a light grey background on the left side and an info icon on darker grey background n the right side.',
      },
      source: {
        code: '<Infobox />',
      },
    },
  },
}

const Template = () => ({
  components: { Infobox },
  template: `
  <div class="documentation-preview">
    <Infobox />
  </div>
`,
})

export const Default = Template.bind({})
