import SuctionSpeedSelection from '~/components/molecules/SuctionSpeedSelection/SuctionSpeedSelection.vue'
import { ref } from '@nuxtjs/composition-api'

export default {
  title: 'Molecules/m_127 SuctionSpeedSelection',
  component: SuctionSpeedSelection,
  parameters: {
    docs: {
      description: {
        component: 'A component to to quickly select the speed of suction.',
      },
    },
  },
}

const Template = () => ({
  components: { SuctionSpeedSelection },
  setup() {
    let result = ref([0, 10000])

    const initializeResult = (e) => {
      result.value = e
      console.log(result.value)
    }

    return { result, initializeResult }
  },
  template: `
  <div class="documentation-preview">
    <SuctionSpeedSelection
      @input="initializeResult($event)" />
    <br />
    <div>Minimum in m³/h: {{ result[0] }}</div>
    <div>Maximum in m³/h: {{ result[1] }}</div>
  </div>
`,
})

export const Default = Template.bind({})
