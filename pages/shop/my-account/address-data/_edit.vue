<template>
  <address-data-form-section is-edit-mode />
</template>

<script>
import AddressDataFormSection from '~/components/organisms/AddressDataFormSection/AddressDataFormSection'

import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  components: {
    AddressDataFormSection,
  },
})
</script>
