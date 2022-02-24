import FlyoutEntry from '~/components/molecules/FlyoutEntry/FlyoutEntry.vue'

export default {
  title: 'Molecules/FlyoutEntry',
  component: FlyoutEntry,
  parameters: {
    docs: {
      description: {
        component:
          'An flyout element displaying an icon which can extend text beneath it',
      },
    },
  },
}

const Template = (args) => ({
  components: { FlyoutEntry },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <FlyoutEntry v-bind="args" />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = {
  label: 'Some Label',
  icon: 'business',
}
