import LoadingScreen from '~/components/molecules/ErrorHandling/LoadingScreen.vue'
import { headline } from './LoadingScreen.stories.content'

const argTypes = {
  headline: {
    defaultValue: headline,
    control: { type: 'text' },
  },
}

export default {
  title: 'Molecules/m_155 Loading Screen',
  component: LoadingScreen,
  parameters: {
    docs: {
      description: {
        component:
          'The loading screen component can be used to display that something is currently loading f.ex products',
      },
    },
  },
  argTypes: argTypes,
}

const Template = (args) => ({
  components: {
    LoadingScreen,
  },
  setup() {
    return {
      args,
    }
  },
  template: `
    <div class="documentation-preview">
    <LoadingScreen
      v-bind="args"/>
    </div>
  `,
})

export const Default = Template.bind({})
