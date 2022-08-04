import LoadingSpinner from '~/components/atoms/LoadingSpinner/LoadingSpinner.vue'

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

export const Default = Template.bind({})
