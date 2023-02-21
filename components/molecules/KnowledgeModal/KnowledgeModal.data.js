import { useContext } from '@nuxtjs/composition-api'
import { computed } from '@nuxtjs/composition-api'
import { useUserStore } from '~/stores/user'

export const getKnowledgeData = () => {
  const { app, i18n } = useContext()
  const userStore = useUserStore()

  const i18nKey = 'registration.registrationModal.'

  const ctaBoxContents = computed(() => [
    {
      headline: i18n.t(i18nKey + 'alreadyHaveAccount'),
      description: [
        {
          component: 'Richtext',
          richtext: i18n.t(i18nKey + 'pleaseSignIn'),
        },
      ],
      button: [
        {
          component: 'Button',
          label: i18n.t(i18nKey + 'signIn'),
          icon: 'arrow_forward',
          variant: 'secondary',
          shape: app?.$breakpoints?.isMobile.value ? 'filled' : 'outlined',
        },
      ],
      click: userStore.login,
    },
    {
      headline: i18n.t(
        i18nKey +
          (app?.$breakpoints?.isMobile.value
            ? 'createAccountDesktop'
            : 'createAccountMobile')
      ),
      description: [
        {
          component: 'Richtext',
          richtext: i18n.t(
            i18nKey +
              (app?.$breakpoints?.isMobile.value ? 'addCompanyAddressData' : '')
          ),
        },
      ],
      button: [
        {
          component: 'Button',
          label: i18n.t(i18nKey + 'goToRegistration'),
          icon: 'arrow_forward',
          variant: 'secondary',
          shape: 'outlined',
          href: app.localePath('/shop/register'),
        },
      ],
    },
  ])

  return { ctaBoxContents }
}

export default {}
