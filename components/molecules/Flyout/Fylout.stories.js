import Flyout from '~/components/molecules/Flyout/Flyout.vue'

export default {
  title: 'Molecules/Flyout',
  component: Flyout,
  parameters: {
    docs: {
      description: {
        component:
          'An Flyout element displaying an icon which can extend text beneath it',
      },
    },
  },
}

const Template = (args) => ({
  components: { Flyout },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <Flyout v-bind="args" />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = {
  label: 'Some Label',
  icon: 'business',
}
