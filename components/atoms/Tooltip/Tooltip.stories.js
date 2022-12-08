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
        <div class="documentation-preview" style="position: relative; padding: 150px;">
        <span v-tooltip.top-end="'Hello World'">Btn</span><br><br>
        <span v-tooltip.top="'Very long text in this one... More and more text...'">Long text</span><br><br>
        <span v-tooltip.top-end="{
          content: '',
        }">Show initially</span>
      </div>
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
    <p v-tooltip.top="'This one falls back to display below because above is not enough space... Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum distinctio excepturi, accusantium molestiae veritatis repudiandae aperiam minus amet?'">Align top, long text</p>
    <p v-tooltip.top="">Dont show (empty content)</p>
  </div>`,
})

export const Default = Template.bind({})
