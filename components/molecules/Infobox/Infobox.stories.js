import Infobox from './Infobox.vue'

const text =
  'Hier können Sie die Adressdaten Ihres Unternehmens hinterlegen. Dieser Schritt ist optional. Bitte beachten Sie: Nur mit einem vollständigen Konto können Sie Preise sehen und Anfragen senden!'

const argTypes = {}

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
  argTypes,
}

const Template = (args) => ({
  components: { Infobox },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <Infobox v-bind="args" />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = {
  text,
}
