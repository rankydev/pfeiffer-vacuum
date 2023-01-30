import MultilevelDropdown from './MultilevelDropdown.vue'

export default {
  title: 'Technical Components/Multilevel Dropdown',
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

Default.args = {
  optionLabel: 'label',
  optionsKey: 'concepts',
  options: [
    {
      label: 'Node 1',
      concepts: [
        {
          label: 'Child Node 1',
          concepts: [
            { label: 'Child Node 1.1' },
            {
              label: 'Child Node 1.2',
              concepts: [
                { label: 'Child Node 1.2.1' },
                { label: 'Child Node 1.2.2' },
                { label: 'Child Node 1.2.3' },
              ],
            },
            { label: 'Child Node 1.3' },
          ],
        },
        { label: 'Child Node 2' },
      ],
    },
    {
      label: 'Node 2',
      concepts: [{ label: 'Child Node 3' }, { label: 'Child Node 4' }],
    },
    { label: 'Node 3' },
  ],
}
