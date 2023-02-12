import MultilevelDropdown from './MultilevelDropdown.vue'
import { normalData } from './MultilevelDropdown.stories.content.js'

export default {
  title: 'Atoms/a_118_Multilevel Dropdown',
  component: MultilevelDropdown,
  parameters: {
    docs: {
      description: {
        component:
          'The multilevel dropdown component. It can be used to create a multilevel dropdown filter.',
      },
    },
  },
}

const Template = (args) => ({
  components: { MultilevelDropdown },
  setup() {
    return { args }
  },
  methods: {
    selected: (selected) => {
      console.log(selected)
    },
  },
  template: `
      <div class="documentation-preview">
      <MultilevelDropdown v-bind="args" @update="selected" />
      </div>
    `,
})

export const Default = Template.bind({})

Default.args = normalData
