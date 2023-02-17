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
    const selected = (option) => {
      console.log(
        'This option was clicked. Now handle here outside what to do (async request, update tree and set item to "checked", etc.).',
        option
      )
    }

    return { args, selected }
  },
  template: `
      <div class="documentation-preview">
        <MultilevelDropdown v-bind="args" @update="selected" />
      </div>
    `,
})

export const Default = Template.bind({})

Default.args = normalData
