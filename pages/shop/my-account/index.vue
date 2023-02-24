<template>
  <div class="dashboard">
    <SectionHeadline>
      {{ $t('myaccount.accountDataShort') }}
    </SectionHeadline>
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
import SectionHeadline from '~/components/molecules/SectionHeadline/SectionHeadline'
import { useMyAccountStore } from '~/stores/myaccount'

export default defineComponent({
  name: 'Dashboard',
  components: {
    SectionHeadline,
  },
  setup() {
    const myAccountStore = useMyAccountStore()
    const orders = ref([])

    const getOrders = async () => {
      const result = await myAccountStore.getOrders()
      console.log(result)
      orders.value = result
    }

    getOrders()
  },
})
</script>
