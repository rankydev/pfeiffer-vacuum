import SuctionSpeedSelection from '~/components/molecules/SuctionSpeedSelection/SuctionSpeedSelection.vue'

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
  template: `
  <div class="documentation-preview">
    <SuctionSpeedSelection />
  </div>
`,
})

export const Default = Template.bind({})
