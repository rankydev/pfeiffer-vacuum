import AnimatedCollapseContent from './AnimatedCollapse.stories.content'
import AnimatedCollapse from '~/components/atoms/AnimatedCollapse/AnimatedCollapse.vue'
import { ref } from '@nuxtjs/composition-api'

export default {
  title: 'Atoms/Animated Collapse',
  component: AnimatedCollapse,
  parameters: {
    docs: {
      description: {
        component: 'An component to animate collapsing',
      },
    },
  },
  argTypes: {
    direction: {
      options: ['vertical', 'horizontal'],
      control: { type: 'inline-radio' },
    },
    speed: {
      options: ['slow', 'medium', 'fast'],
      control: { type: 'inline-radio' },
    },
  },
}

const Template = (args) => ({
  components: { AnimatedCollapse },
  setup() {
    const visible = ref(true)
    const text = AnimatedCollapseContent.text
    return { args, visible, text }
  },
  template: `
  <div class="documentation-preview">
    <button @click="visible = !visible">Toggle</button>
    <AnimatedCollapse v-bind="args">
        <div 
          v-show="visible"
          v-html="text"
          style="white-space: nowrap; overflow: hidden; max-width: 200px; background-color: #f5f5f5;"
          />
    </AnimatedCollapse>
  </div>
`,
})

export const Default = Template.bind({})
Default.args = {
  direction: 'vertical',
  speed: 'fast',
}
