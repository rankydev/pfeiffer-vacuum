import VideoPlayer from '@/components/molecules/VideoPlayer/VideoPlayer.vue'
import { url, title, description } from './VideoPlayer.stories.content.js'

export default {
  title: 'Molecules/m_117 Video Player Module',
  component: VideoPlayer,
  parameters: {
    docs: {
      description: {
        component:
          'The VideoPlayer component is used to display videos for the customer on blog pages or within special components. Currently only youtube videos are supported.',
      },
      source: {
        code: '<VideoPlayer v-bind="{ url, titel, description }"  />',
      },
    },
  },
}

const Template = (args) => ({
  components: { VideoPlayer },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <VideoPlayer v-bind="args" />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = { url, title, description }
