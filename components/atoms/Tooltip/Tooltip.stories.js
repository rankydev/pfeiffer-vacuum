export default {
  title: 'Technical components/Tooltip',
  parameters: {
    docs: {
      description: {
        component:
          'See all options here: https://floating-vue.starpad.dev/legacy/v2/#usage <br> Use composable: <b>useTooltip()</b> and function <b>getTooltip()</b> to achieve flexible mobile behaviour.',
      },
      source: {
        code: `
<p v-tooltip.top-end="'Align right'">Align top-end, short text</p>
<p v-tooltip.top="'This one falls back to display below because above is not enough space...'">Align top, long text</p>
<p v-tooltip.top="">Dont show (empty content)</p>
`,
      },
    },
  },
}

const getButtonTooltips = (trigger = 'hover') => [
  {
    content: 'default content',
    trigger: trigger,
    placement: 'top-end',
  },
  {
    content:
      'This one falls back to display below because above is not enough space... Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum distinctio excepturi',
    trigger: trigger,
    placement: 'top',
  },
  {
    content: '',
    trigger: trigger,
    placement: 'top',
  },
]

const Template = (args) => ({
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview" style="position: relative; padding: 120px;">
    <p v-tooltip="args[0]">Align top-end, short text</p>
    <p v-tooltip="args[1]">Align top, long text</p>
    <p v-tooltip="args[2]">Dont show (empty content)</p>
  </div>`,
})

export const Default = Template.bind({})
Default.args = getButtonTooltips()

export const MobileBehaviour = Template.bind({})
MobileBehaviour.args = getButtonTooltips('click')
