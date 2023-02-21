import { useContext } from '@nuxtjs/composition-api'
import { computed } from '@nuxtjs/composition-api'

export const getKnowledgeData = () => {
  const { app } = useContext()

  const ctaBoxContents = computed(() => [
    {
      headline: 'You have an account',
      description: [
        {
          component: 'Richtext',
          richtext:
            'Please sign in. After login you will be  redirected back to this page.',
        },
      ],
      button: [
        {
          component: 'Button',
          label: 'Sign in',
          icon: 'arrow_forward',
          variant: 'secondary',
          shape: app?.$breakpoints?.isMobile ? 'filled' : 'outlined',
        },
      ],
      click: 'login',
    },
    {
      headline: app?.$breakpoints?.isMobile
        ? 'Or create new account'
        : 'Create full account',
      description: [
        {
          component: 'Richtext',
          richtext:
            'You can add your company’s address data here. This step is optional for now. Please note: Only with a full account you can see prices and send requests!',
        },
      ],
      button: [
        {
          component: 'Button',
          label: 'Go to Registration',
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
