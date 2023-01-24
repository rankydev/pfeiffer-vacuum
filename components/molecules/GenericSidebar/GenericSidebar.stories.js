import GenericSidebar from './GenericSidebar'
import ResultHeadline from '~/components/molecules/ResultHeadline/ResultHeadline'
import { ref } from '@nuxtjs/composition-api'

const argTypes = {
  isOpen: true,
  position: 'right',
}

export default {
  title: 'Technical components/Generic Sidebar',
  component: GenericSidebar,
  parameters: {
    docs: {
      description: {
        component: 'Generic sidebar component used for various sidebar modules',
      },
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: { GenericSidebar, ResultHeadline },
  setup() {
    const isOpen = ref(args.isOpen)
    function toggleSidebar() {
      isOpen.value = !isOpen.value
    }
    return { args, toggleSidebar, isOpen }
  },
  template: `<div>
  <GenericSidebar :isOpen="isOpen" @closeSidebar="toggleSidebar">
    <ResultHeadline headline="ResultHeadline" :resultCount="3" />
    <p>Content</p>
    </GenericSidebar>
    <button @click="toggleSidebar">open Sidebar</button>
  </div>`,
})

const TemplateLeft = (args) => ({
  components: { GenericSidebar, ResultHeadline },
  setup() {
    const isOpen = ref(args.isOpen)
    function toggleSidebar() {
      isOpen.value = !isOpen.value
    }
    return { args, toggleSidebar, isOpen }
  },
  template: `<div>
  <GenericSidebar :isOpen="isOpen" position="left" @closeSidebar="toggleSidebar">
    <ResultHeadline headline="ResultHeadline" :resultCount="3" />
    <p>Content</p>
    </GenericSidebar>
    <button @click="toggleSidebar">open Sidebar</button>
  </div>`,
})

export const Default = Template.bind({})
Default.args = {
  isOpen: false,
}

export const LeftSidebar = TemplateLeft.bind({})
LeftSidebar.args = {
  isOpen: false,
}
