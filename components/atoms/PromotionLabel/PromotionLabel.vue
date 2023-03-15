<template>
  <div v-if="subline && showPromotion" class="promotion-label">
    <span class="promotion-label--subline"> {{ subline }}</span>
  </div>
</template>

<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'
import { useUserStore } from '~/stores/user'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'PromotionLabel',
  props: {
    subline: {
      type: String,
      default: '',
      required: true,
    },
  },
  setup() {
    const userStore = useUserStore()

    const { isApprovedUser, isLoggedIn } = storeToRefs(userStore)

    const showPromotion = computed(() => {
      if (isApprovedUser.value && isLoggedIn.value) {
        return true
      } else {
        return false
      }
    })

    return {
      isApprovedUser,
      isLoggedIn,
      showPromotion,
    }
  },
})
</script>

<style lang="scss">
.promotion-label {
  @apply tw-bg-pv-grey-16;
  @apply tw-text-pv-white;
  @apply tw-text-base;
  @apply tw-rounded-md;
  @apply tw-font-bold;
  @apply tw-p-2;
  @apply tw-flex tw-justify-center;
}
</style>
