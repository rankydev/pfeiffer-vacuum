import Page from '~/components/templates/Page/Page.vue'

export default {
  title: 'Templates/EcomPage',
  component: Page,
  parameters: {
    docs: {
      description: {
        component:
          'A ecom page of the application. This template is used for the registration page.',
      },
    },
  },
}

const Template = (args) => ({
  components: { Page },
  setup() {
    return { args }
  },
  template: `
    <div class="documentation-preview">
      <Page v-bind="{ args }" />
    </div>
  `,
})

export const Imprint = Template.bind({})
