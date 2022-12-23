import { useTooltip } from '~/composables/useTooltip'

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
          const { getTooltip } = useTooltip()
          const buttonTooltip1 = getTooltip({
            content: 'default content',
            trigger: 'hover',
             placement: 'top-end',
          })

        <p v-tooltip="buttonToolTip1">Align top-end, short text</p>`,
      },
    },
  },
}

const Template = () => ({
  setup() {
    const { getTooltip } = useTooltip()
    const buttonTooltip1 = getTooltip({
      content: 'default content',
      placement: 'top-end',
    })

    const buttonTooltip2 = getTooltip({
      content:
        'This one falls back to display below because above is not enough space... Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum distinctio excepturi',
      placement: 'top',
    })

    const buttonTooltip3 = getTooltip({
      content: '',
      placement: 'top',
    })

    console.log(buttonTooltip1)

    return { buttonTooltip1, buttonTooltip2, buttonTooltip3 }
  },
  template: `
  <div class="documentation-preview" style="position: relative; padding: 100px;">
    <button v-tooltip="buttonTooltip1">Align top-end, short text</button><br><br>
    <button v-tooltip="buttonTooltip2">Align top, long text</button><br><br>
    <button v-tooltip="buttonTooltip3">Dont show (empty content)</button>
  </div>`,
})

export const Default = Template.bind({})
