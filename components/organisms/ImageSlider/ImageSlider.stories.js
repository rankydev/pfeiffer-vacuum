import ImageSlider from './ImageSlider.vue'

const argTypes = {
  images: {
    control: { type: 'array' },
    defaultValue: [
      {
        type: 'PRIMARY',
        url: '/api/images/medias/?context=bWFzdGVyfGltYWdlc3w0MzU0MzB8aW1hZ2UvcG5nfGg2YS9oYTEvODgyNDY4Nzk4NDY3MHw1ZjQwYjdiNGFkNWNiZGI5NTg2OGYxMDQ2MmQ5MjFkNjFiMGM2OTBhNmVmODkwZGY0YTBiNjZmODkzNDc5YmJm',
        altText: 'HiPace® 80 mit TC 110, DN 63 CF-F',
      },
      {
        type: 'GALLERY',
        url: '/api/images/medias/?context=bWFzdGVyfGltYWdlc3wyOTkxNXxpbWFnZS9wbmd8aGY1L2gxZS84ODI0Njg2MjE1MTk4fGU4NDM1NjIzOTg0NDkwNGFiMTA3ODU3MDU2NDNkM2U5ODYxNzk5YWMwM2RkNjkxNmU0YTIyYjEzMjIwMmNkMDQ',
        altText: 'HiPace® 80 mit TC 110, DN 63 CF-F',
      },
      {
        type: 'GALLERY',
        url: '/api/images/medias/?context=bWFzdGVyfGltYWdlc3w0MjU5MXxpbWFnZS9wbmd8aGM1L2gyNS84ODI0Njg2NDExODA2fDEwNmY4ZmMzODcxNTQ5MTc1MDRkMjhiOWZiYzU4MjQwNjY3ZWVlMTQwNjE5YmNiZDc3NjM0ZDk5Njc0ZDZkYTA',
        altText: 'HiPace® 80 mit TC 110, DN 63 CF-F',
      },
    ],
  },
}

export default {
  title: 'Technical Components/Image Slider',
  component: ImageSlider,
  parameters: {
    docs: {
      description: {
        component: 'ImageSlider component used on the product detail page.',
      },
    },
  },
  argTypes,
}

const Template = (args, { argTypes: types }) => ({
  components: { ImageSlider },
  props: Object.keys(types),
  setup() {
    return { args }
  },
  template: `
    <div class="documentation-preview" style="max-width: 750px">
      <ImageSlider v-bind="args" />
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = {}
