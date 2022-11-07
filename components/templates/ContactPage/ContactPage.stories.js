import Page from '~/components/templates/Page/Page.vue'

export default {
  title: 'Templates/ContactPage',
  component: Page,
  parameters: {
    docs: {
      description: {
        component: 'A contact page of the application.',
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

export const Contact = Template.bind({})
