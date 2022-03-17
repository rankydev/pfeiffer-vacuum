import Accordion from '~/components/atoms/Accordion/Accordion.vue'

export default {
  title: 'Atoms/Accordion',
  component: Accordion,
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
}

const Template = (args) => ({
  components: { Accordion },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <Accordion v-bind="args" />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = {}
