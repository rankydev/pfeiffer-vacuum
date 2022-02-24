import LanguageSwitcher from '~/components/molecules/LanguageSwitcher/LanguageSwitcher.vue'

export default {
  title: 'Molecules/LanguageSwitcher',
  component: LanguageSwitcher,
  parameters: {
    docs: {
      description: {
        component: 'The language switcher element to adjust the shop language',
      },
    },
  },
}

const Template = (args) => ({
  components: { LanguageSwitcher },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <LanguageSwitcher/>
  </div>
`,
})

export const Default = Template.bind({})
