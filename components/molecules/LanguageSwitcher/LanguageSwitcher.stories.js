import LanguageSwitcher from '~/components/molecules/LanguageSwitcher/LanguageSwitcher.vue'
import { useContext } from '@nuxtjs/composition-api'

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
    const { app } = useContext()
    const isDesktop = app.$breakpoints.isDesktop

    return { args, isDesktop }
  },
  template: `
  <div class="documentation-preview">
  <div v-if="!isDesktop" style="background-color:black; width:260px; border-radius: 6px;">
    <LanguageSwitcher style="padding-left: 10px; padding-top: 280px;"/>
  </div>
  <div v-else style="background-color:orange; width:260px; border-radius: 6px; height: 280px">
    <LanguageSwitcher style="padding-left: 162px"/>
  </div>
  </div>
`,
})

export const Default = Template.bind({})
