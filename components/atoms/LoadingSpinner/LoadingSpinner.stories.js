import LoadingSpinner from '~/components/atoms/LoadingSpinner/LoadingSpinner.vue'
import { ref } from '@nuxtjs/composition-api'

const argTypes = {
  show: {
    control: { type: 'boolean' },
    defaultValue: true,
  },
  color: {
    options: ['green', 'red'],
    control: { type: 'inline-radio' },
  },
  size: {
    options: ['small', 'normal'],
    control: { type: 'inline-radio' },
  },
}

export default {
  title: 'Technical Components/Loading Spinner',
  component: LoadingSpinner,
  parameters: {
    docs: {
      description: {
        component:
          'The loading spinner can be shown to signalize that a certain page is currently loading. This component is used within the contact request form and is shown while a submitted request gets processed.',
      },
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: { LoadingSpinner },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <LoadingSpinner v-bind="args" />
  </div>
`,
})

const Template2 = (args) => ({
  components: { LoadingSpinner },
  setup() {
    const loading = ref(false)

    const showLoading = () => {
      loading.value = true
      setTimeout(() => {
        loading.value = false
      }, 2000)
    }

    return { loading, showLoading, args }
  },
  template: `
  <div class="documentation-preview">
  <LoadingSpinner v-bind="args" :show="loading">
    <Button label="Klick hier für den Loading Spinner in Action"
            @click.native="showLoading()"/>
  </LoadingSpinner>
  </div>
`,
})

export const Default = Template.bind({})

export const Usage = Template2.bind({})
