import LanguageSwitcher from '~/components/molecules/LanguageSwitcher/LanguageSwitcher.vue'

export default {
  title: 'Molecules/m_119 Language Switcher',
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
    <LanguageSwitcher style="padding-left: 152px"/>
  </div>
`,
})

export const Default = Template.bind({})
