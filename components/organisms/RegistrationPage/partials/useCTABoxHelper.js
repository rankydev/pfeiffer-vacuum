import { useContext } from '@nuxtjs/composition-api'
import getKey from '~/composables/useUniqueKey'

export const useCTABoxHelper = () => {
  const { i18n, localePath } = useContext()

  const contentCTABoxLoginData = {
    headline: i18n.t('registration.registrationPage.contentCTABoxLoginTitle'),
    description: [
      {
        _uid: getKey('registration__content-cta-box-login-description'),
        component: 'Richtext',
        richtext: i18n.t(
          'registration.registrationPage.contentCTABoxLoginDescription'
        ),
      },
    ],
    button: [
      {
        _uid: getKey('registration__content-cta-box-login-button'),
        icon: 'person',
        label: i18n.t('registration.registrationPage.contentCTABoxLoginLink'),
        shape: 'outlined',
        variant: 'secondary',
        component: 'Button',
      },
    ],
  }

  const contentCTABoxHelpData = {
    headline: i18n.t('registration.registrationPage.contentCTABoxHelpTitle'),
    description: [
      {
        _uid: getKey('registration__content-cta-box-help-description'),
        component: 'Richtext',
        richtext: i18n.t(
          'registration.registrationPage.contentCTABoxHelpDescription'
        ),
      },
    ],
    button: [
      {
        _uid: getKey('registration__content-cta-box-help-button'),
        icon: 'mail_outline',
        label: i18n.t('registration.registrationPage.contentCTABoxHelpLink'),
        shape: 'outlined',
        variant: 'secondary',
        component: 'Button',
        href: localePath('/contact'),
      },
    ],
  }

  return {
    contentCTABoxLoginData,
    contentCTABoxHelpData,
  }
}

export default {}
