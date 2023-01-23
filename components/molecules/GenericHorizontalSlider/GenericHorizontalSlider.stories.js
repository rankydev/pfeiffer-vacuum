import GenericHorizontalSlider from './GenericHorizontalSlider'

export default {
  title: 'Technical Components/Generic Horizontal Slider',
  component: GenericHorizontalSlider,
  parameters: {
    docs: {
      description: {
        component:
          'The GenericHorizontalSlider has just the default slot and will be able to scroll through this content horizontally.',
      },
      source: {
        code: '<GenericHorizontalSlider>your content...</GenericHorizontalSlider>',
      },
    },
  },
}

const Template = (args) => ({
  components: { GenericHorizontalSlider },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <GenericHorizontalSlider>
      <div style="white-space: nowrap; padding: 20px;">
        SOME CONTENT / SOME CONTENT / SOME CONTENT / SOME CONTENT / SOME CONTENT / SOME CONTENT / SOME CONTENT / SOME CONTENT / SOME CONTENT
      </div>
    </GenericHorizontalSlider>
  </div>
`,
})

export const Default = Template.bind({})
