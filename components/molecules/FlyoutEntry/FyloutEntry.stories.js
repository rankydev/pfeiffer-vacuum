import FlyoutEntry from '~/components/molecules/FlyoutEntry/FlyoutEntry.vue'
import {
  flyoutEntry1,
  flyoutEntry2,
  flyoutEntry3,
} from '~/components/molecules/FlyoutEntry/FlyoutEntry.stories.content.js'
import LinkContent from '~/components/atoms/Link/Link.stories.content'

export default {
  title: 'Molecules/m_103 Flyout-Bar',
  component: FlyoutEntry,
  parameters: {
    docs: {
      description: {
        component:
          'An List of flyout elements displaying icons which can extend text beneath them',
      },
    },
  },
}

const Template = (args) => ({
  components: { FlyoutEntry },
  setup() {
    const flyoutEntries = [flyoutEntry1, flyoutEntry2, flyoutEntry3]
    console.log(flyoutEntries)
    return { args, flyoutEntries }
  },
  template: `
  <div class="documentation-preview">
  <div class="top-navigation__flyouts">
    <FlyoutEntry
      v-for="item in flyoutEntries"
      :key="item._uid"
      class="top-navigation__flyout"
      v-bind="item"
      :active="true"
    />
  </div>
  </div>
`,
})

export const Default = Template.bind({})
Default.args = {
  ...LinkContent,
  label: 'Some Label',
  icon: 'business',
}
