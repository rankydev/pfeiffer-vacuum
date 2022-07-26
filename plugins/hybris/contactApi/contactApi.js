import config from '../hybris.config'

export function getContactApi(axiosInstance, ctx) {
  // TODO: Adapt when login is implemented
  const loggedIn = false

  return {
    async submitContact(contact) {
      const result = await axiosInstance.post(
        // `${config.CONTACT_API}/${loggedIn ? 'current' : 'anonymous'}`,
        `${config.CONTACT_API}/anonymous`,
        contact
      )

      if (result.status === 200) {
        alert('PASSED')
        return true
      }

      console.log(result.error)

      ctx.$logger.error(
        'Error when sending contact form. Returning false.',
        result.error ? result.error : ''
      )
      alert('ERROR')
      return false
    },
  }
}
