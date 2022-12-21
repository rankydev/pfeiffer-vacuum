import { useContext } from '@nuxtjs/composition-api'

// Right now this doesn't take care if the same listener registers twice. As long as we only use this in stores, this shouldn't be a problem.
const listeners = new Array()

export const useLanguageSwitch = () => {
  const { i18n } = useContext()

  const onLanguageSwitched = (listener) => {
    listeners.push(listener)
  }

  i18n.onLanguageSwitched = async () => {
    for (const listener of listeners) {
      listener.apply()
    }
  }

  return { onLanguageSwitched }
}
