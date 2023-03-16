<template>
  <div class="tw-pb-1">
    <span>{{ $t('product.errorHandling.customerSupport.text') }}</span>
    <Link
      :label="$t('product.errorHandling.customerSupport.link')"
      :href="localePath('/contact')"
      variant="inline"
    />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import Link from '~/components/atoms/Link/Link.vue'

export default defineComponent({
  name: 'CustomerSupportLink',
  components: { Link },
})
</script>
