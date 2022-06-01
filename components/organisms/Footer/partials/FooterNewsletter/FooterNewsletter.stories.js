import FooterNewsletter from './FooterNewsletter.vue'

export default {
  title: 'Organisms/FooterNewsletter',
  component: FooterNewsletter,
  parameters: {
    docs: {
      description: {
        component:
          'The FooterNewsletter component is used to offer the possibility to subscribe for the newsletter in the Footer. Below the headline of the component can be defined a description which is a richtext and up to 1 button.',
      },
      source: {
        code: '<FooterNewsletter v-bind="{}"  />',
      },
    },
  },
}

const Template = (args) => ({
  components: { FooterNewsletter },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <FooterNewsletter v-bind="args" />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = {}
