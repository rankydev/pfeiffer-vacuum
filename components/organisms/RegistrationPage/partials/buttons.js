import getKey from '~/composables/useUniqueKey'

/**
 * data of content cta boxes
 */
export const getContentCTABoxHelpData = (i18n, localePath) => {
  return {
    headline: i18n.t('registration.registrationPage.contentCTABoxHelpTitle'),
    description: [
      {
        _uid: getKey('registration__content-cta-box-help'),
        component: 'Richtext',
        richtext: i18n.t(
          'registration.registrationPage.contentCTABoxHelpDescription'
        ),
      },
    ],
    button: [
      {
        _uid: '3dd3700b-9e95-46d5-87ab-fd917b80848f',
        icon: 'mail_outline',
        label: i18n.t('registration.registrationPage.contentCTABoxHelpLink'),
        shape: 'outlined',
        variant: 'secondary',
        component: 'Button',
        href: localePath('/contact'),
      },
    ],
  }
}

export const getContentCTABoxLoginData = (i18n) => {
  return {
    headline: i18n.t('registration.registrationPage.contentCTABoxLoginTitle'),
    description: [
      {
        _uid: getKey('registration__content-cta-box-login'),
        component: 'Richtext',
        richtext: i18n.t(
          'registration.registrationPage.contentCTABoxLoginDescription'
        ),
      },
    ],
    button: [
      {
        _uid: '3dd3700b-9e95-46d5-87ab-fd917b80848f',
        icon: 'person',
        label: i18n.t('registration.registrationPage.contentCTABoxLoginLink'),
        shape: 'outlined',
        variant: 'secondary',
        component: 'Button',
      },
    ],
  }
}

export default { getContentCTABoxLoginData, getContentCTABoxHelpData }
