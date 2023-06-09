import SuctionSpeedSelection from '~/components/molecules/SuctionSpeedSelection/SuctionSpeedSelection.vue'
import { ref } from '@nuxtjs/composition-api'

export default {
  title: 'Molecules/m_127 SuctionSpeedSelection',
  component: SuctionSpeedSelection,
  parameters: {
    docs: {
      description: {
        component: 'A component to quickly select the speed of suction.',
      },
    },
  },
}

const Template = () => ({
  components: { SuctionSpeedSelection },
  setup() {
    let result = ref([0, 10000])

    const updateResult = (e) => {
      result.value = e
    }

    return { result, updateResult }
  },
  template: `
  <div class="documentation-preview">
    <SuctionSpeedSelection
      @update="updateResult($event)" />
    <br />
    <div>Minimum in m³/h: {{ result[0] }}</div>
    <div>Maximum in m³/h: {{ result[1] }}</div>
  </div>
`,
})

export const Default = Template.bind({})
