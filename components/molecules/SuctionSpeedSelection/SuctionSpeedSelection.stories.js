import SuctionSpeedSelection from '~/components/molecules/SuctionSpeedSelection/SuctionSpeedSelection.vue'

export default {
  title: 'Molecules/m_100 SuctionSpeedSelection',
  component: SuctionSpeedSelection,
  parameters: {
    docs: {
      description: {
        component: '',
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
