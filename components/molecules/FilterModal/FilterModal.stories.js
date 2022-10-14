import FilterModal from './FilterModal'
import PvSelect from '@/components/atoms/FormComponents/PvSelect/PvSelect.vue'
import { ref } from '@nuxtjs/composition-api'

const argTypes = {}

export default {
  title: 'Technical components/Filter Modal',
  component: FilterModal,
  parameters: {
    docs: {
      description: {
        component:
          'Filter modal component that is used to render filter either directly or wrapped in a modal for mobile',
      },
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: { FilterModal, PvSelect },
  setup() {
    const isOpen = ref(args.isOpen)
    function toggleModal() {
      isOpen.value = !isOpen.value
    }
    return { args, toggleModal, isOpen }
  },
  template: `<div>
    <FilterModal>
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <PvSelect/>
        <PvSelect/>
        <PvSelect/>
        <PvSelect/>
        <PvSelect/>
        <PvSelect/>
        <PvSelect/>
        <PvSelect/>
        <PvSelect/>
        <PvSelect/>
        <PvSelect/>
        <PvSelect/>
        <PvSelect/>
        <PvSelect/>
        <PvSelect/>
        <PvSelect/>
        <PvSelect/>
        <PvSelect/>
        <PvSelect/>
        <PvSelect/>
        <PvSelect/>
        <PvSelect/>
        <PvSelect/>
        <PvSelect/>
        <PvSelect/>
      </div>
    </FilterModal>
  </div>`,
})

export const Default = Template.bind({})
Default.args = {}
