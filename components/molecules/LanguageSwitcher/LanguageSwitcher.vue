<template>
  <Button
    :label="$t('language.code')"
    variant="inverted"
    shape="outlined"
    gap="narrow"
    icon="language"
    :prepend-icon="true"
    class="language-switcher__button"
  />
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

import Button from '~/components/atoms/Button/Button'

export default defineComponent({
  name: 'LanguageSwitcher',
  components: {
    Button,
  },
})
</script>

<style lang="scss">
.language-switcher {
  &__button {
    color: #7a7a7a !important;
    padding: 0;
  }
}
</style>
