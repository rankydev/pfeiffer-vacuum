import GlobalMessage from '~/components/organisms/GlobalMessage/GlobalMessage'

export const useToast = ($toast) => {
  function success(content = {}, options = {}) {
    $toast.success(
      {
        component: GlobalMessage,
        props: {
          variant: 'success',
          headline: content.headline || '',
          description: content.description || '',
          button: content.button || null,
        },
      },
      options
    )
  }

  function warning(content = {}, options = {}) {
    $toast.warning(
      {
        component: GlobalMessage,
        props: {
          variant: 'warning',
          headline: content.headline || '',
          description: content.description || '',
          button: content.button || null,
        },
      },
      options
    )
  }

  function error(content = {}, options = {}) {
    $toast.error(
      {
        component: GlobalMessage,
        props: {
          variant: 'error',
          headline: content.headline || '',
          description: content.description || '',
          button: content.button || null,
        },
      },
      options
    )
  }

  return { success, warning, error }
}
