import KnowledgeModal from './KnowledgeModal'
import { ref } from '@nuxtjs/composition-api'

export default {
  title: 'Molecules/m_150 Knowledge Modal',
  component: KnowledgeModal,
  parameters: {
    docs: {
      description: {
        component:
          'A modal which pops up when an interaction in the knowledge area requires a login.',
      },
    },
  },
}

const Template = (args) => ({
  components: { KnowledgeModal },
  setup() {
    const isOpen = ref(false)

    return { args, isOpen }
  },
  template: `
  <div class="documentation-preview">
    <KnowledgeModal v-bind="{ isOpen }" @closeModal="isOpen = false" />
    <Button label="Open Modal" @click="isOpen = true" />
  </div>
`,
})

export const Default = Template.bind({})
