import ImageWithSource from '~/components/atoms/ImageWithSource/ImageWithSource.vue'

const argTypes = {}

export default {
  title: 'Atoms/Image With Source',
  component: ImageWithSource,
  parameters: {
    docs: {
      description: {
        component: '',
      },
      source: {
        code: '<ImageWithSource v-bind="{}" />',
      },
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: { ImageWithSource },
  setup() {
    return { args }
  },
  template: `<ImageWithSource v-bind="args" />`,
})

export const Default = Template.bind({})
Default.args = {}
