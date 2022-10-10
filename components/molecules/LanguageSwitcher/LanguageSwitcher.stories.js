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
  <div v-if="!isDesktop" style="background-color:black; width:228px; border-radius: 6px">
    <LanguageSwitcher style="padding-left: 10px; padding-top: 236px; padding-bottom: 10px;"/>
  </div>
  <div v-else style="background-color:hotpink; width:228px; border-radius: 6px; height: 246px">
    <LanguageSwitcher style="padding-left: 162px; padding-top: 10px;"/>
  </div>
  </div>
`,
})

export const Default = Template.bind({})
