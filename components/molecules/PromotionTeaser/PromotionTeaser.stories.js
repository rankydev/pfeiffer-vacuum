import PromotionTeaser from './PromotionTeaser.vue'
import { content } from './PromotionTeaser.stories.content.js'

export default {
  title: 'Molecules/m_148 Promotion-Teaser',
  component: PromotionTeaser,
  parameters: {
    docs: {
      description: {
        component:
          'The PromotionTeaser component is displayed in the navigation',
      },
    },
  },
}

const Template = (args) => ({
  components: { PromotionTeaser },
  setup() {
    return { args }
  },
  template: `
      <div class="documentation-preview" style="max-width: 720px">
        <PromotionTeaser v-bind="args" />
      </div>
    `,
})

export const Default = Template.bind({})

Default.args = { content }
