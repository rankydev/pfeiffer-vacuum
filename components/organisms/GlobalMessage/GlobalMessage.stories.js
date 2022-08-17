import GlobalMessage from './GlobalMessage.vue'
import {
  messageVariants,
  slim,
  medium,
  large,
} from './GlobalMessage.stories.content'
import { nanoid } from 'nanoid'

const argTypes = {}

export default {
  title: 'Organisms/o_114 Global Message',
  component: GlobalMessage,
  parameters: {
    docs: {
      description: {
        component:
          'This global message can be used to give feedback to the user. Is has the following three variants: success, warning, error. \n' +
          'Dependent on which input is given into the message, the appearance will automatically change',
      },
    },
  },
  argTypes,
}

const DefaultTemplate = (args) => ({
  components: { GlobalMessage },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <GlobalMessage v-bind="args" />
  </div>
`,
})

export const Default = DefaultTemplate.bind({})
Default.args = large

const OverviewTemplate = () => ({
  components: { GlobalMessage },
  setup() {
    const sizes = [large, medium, slim]
    return { messageVariants, sizes, nanoid }
  },
  template: `
  <div class="documentation-preview">
    <template v-for="variant in messageVariants" :key="nanoid()">
      <GlobalMessage style="margin-bottom:24px;" v-for="size in sizes" :key="nanoid()" v-bind="{...size, variant}" />
    </template>
  </div>
`,
})

export const Overview = OverviewTemplate.bind({})
