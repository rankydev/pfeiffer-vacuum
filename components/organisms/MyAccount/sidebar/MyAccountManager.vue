<template>
  <div v-if="accountManagerData" class="myaccount-manager">
    <div class="myaccount-manager__headline-with-icon">
      <h4 class="myaccount-manager__headline-with-icon--headline">
        {{ $t('myaccount.contact') }}
      </h4>
      <Icon icon="perm_contact_calendar" />
    </div>
    <div class="myaccount-manager__information">
      <div>{{ accountManagerData.name }}</div>
      <div>{{ $t('myaccount.salesRepresentative') }}</div>
    </div>
    <Button
      v-if="accountManagerData.contactAddress.phone"
      class="myaccount-manager__button"
      icon="phone"
      :label="accountManagerData.contactAddress.phone"
      variant="secondary"
      shape="plain"
      :prepend-icon="true"
      :href="`tel:${accountManagerData.contactAddress.phone}`"
    />
    <Button
      v-if="accountManagerData.contactAddress.email"
      class="myaccount-manager__button"
      icon="mail_outline"
      :label="accountManagerData.contactAddress.email"
      variant="secondary"
      shape="plain"
      :prepend-icon="true"
      :href="`mailto:${accountManagerData.contactAddress.email}`"
    />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import Button from '~/components/atoms/Button/Button.vue'
import Icon from '~/components/atoms/Icon/Icon.vue'
import { useUserStore } from '~/stores/user'
import { storeToRefs } from 'pinia'

export default defineComponent({
  components: {
    Button,
    Icon,
  },
  setup() {
    const userStore = useUserStore()
    const { accountManagerData } = storeToRefs(userStore)

    return { accountManagerData }
  },
})
</script>

<style lang="scss">
.myaccount-manager {
  @apply tw-bg-pv-grey-96;
  @apply tw-rounded-md;
  @apply tw-p-6;
  @apply tw-flex tw-flex-col;
  @apply tw-w-full;

  @screen md {
    @apply tw-w-1/2;
  }

  @screen lg {
    @apply tw-w-full;
  }

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

  &__button {
    @apply tw-w-fit;
    @apply tw-whitespace-normal;
    @apply tw-max-w-full;

    span {
      @apply tw-break-words;
      @apply tw-overflow-hidden;

      &.button__icon--prepend {
        overflow: unset;
      }
    }
  }
}
</style>
