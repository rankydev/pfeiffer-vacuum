<template>
  <div class="myaccount-sidebar">
    <div
      class="tw-flex tw-flex-col tw-bg-pv-grey-88 tw-rounded-md tw-items-center tw-justify-center tw-text-center"
      style="height: 500px"
    >
      <div class="tw-font-bold tw-text-pv-white tw-text-2xl">Sidebar</div>
      <NuxtLink :to="localePath('shop-my-account')"> Dashboard </NuxtLink>
      <NuxtLink :to="localePath('shop-my-account-account-data')">
        Account Data
      </NuxtLink>
      <NuxtLink :to="localePath('shop-my-account-address-data')">
        Address Data
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  components: {},
})
</script>

<style lang="scss" scoped>
.myaccount-sidebar {
  a.nuxt-link-exact-active {
    @apply tw-underline;
  }
}
</style>
