export default {
  title: 'Technical components/Tooltip',
  parameters: {
    docs: {
      description: {
        component:
          'See all options here: https://floating-vue.starpad.dev/legacy/v2/#usage',
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

const Template = (args) => ({
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview" style="position: relative; padding: 120px; display: flex; justify-content: space-between;">
    <style>p { border: 1px solid black }</style>
    <p v-tooltip.top-end="'Align right'">Align top-end, short text</p>
    <p v-tooltip.top="'This one falls back to display below because above is not enough space... Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum distinctio excepturi'">Align top, long text</p>
    <p v-tooltip.top="">Dont show (empty content)</p>
  </div>`,
})

export const Default = Template.bind({})
