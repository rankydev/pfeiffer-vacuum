import StickyBar from './StickyBar.vue'
import { label, icon, href, target } from './StickyBar.stories.content.js'

const argTypes = {}

export default {
  title: 'Atoms/a_XXX StickyBar',
  component: StickyBar,
  parameters: {
    docs: {
      description: {
        component:
          'The StickyBar component is used to display a sticky Button linking to the Contact Page. On mobile this Button will only show an icon and the label will disappear. On Category Pages an additional Button linking to the Shop will be displayed.',
      },
      source: {
        code: '<StickyBar v-bind="{ label, icon, href, target }"  />',
      },
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: { StickyBar },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <StickyBar v-bind="args" />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = {
  label,
  icon,
  href,
  target,
}
