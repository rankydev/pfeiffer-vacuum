<template>
  <div v-if="accountManagerData" class="contact-card">
    <div class="contact-card__headline-with-icon">
      <h4 class="contact-card__headline-with-icon--headline">Contact Us</h4>
      <Icon icon="perm_contact_calendar" />
    </div>
    <div class="contact-card__information">
      <div>{{ accountManagerData.name }}</div>
      <div>Sales Representive</div>
    </div>
    <Button
      class="tw-pb-6"
      icon="phone"
      :label="accountManagerData.contactAddress.phone"
      variant="secondary"
      shape="plain"
      :prepend-icon="true"
    />
    <br />
    <Button
      icon="mail"
      :label="accountManagerData.contactAddress.email"
      variant="secondary"
      shape="plain"
      :prepend-icon="true"
    />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import Button from '~/components/atoms/Button/Button.vue'
import { useUserStore } from '~/stores/user'
import { storeToRefs } from 'pinia'

export default defineComponent({
  components: {
    Button,
  },
  setup() {
    const userStore = useUserStore()
    const { accountManagerData } = storeToRefs(userStore)
    userStore.fetchAccountManagerData()

    return { accountManagerData }
  },
})
</script>

<style lang="scss">
.contact-card {
  @apply tw-bg-pv-grey-96;
  @apply tw-rounded-md;
  @apply tw-p-6;

  &__headline-with-icon {
    @apply tw-flex;
    @apply tw-pb-2;
    @apply tw-text-pv-grey-16;

    &--headline {
      @apply tw-w-full;
      @apply tw-text-pv-grey-16;
    }
  }

  &__information {
    @apply tw-pb-2;
    @apply tw-text-pv-grey-16;
    @apply tw-text-sm tw-leading-6;
  }
}
</style>
