<template>
  <div class="address-data">
    <ResultHeadline :headline="$t('myaccount.addressData')" link="/" />
    <template v-if="billingAddress">
      <SectionHeadline class="address-data__section-headline">
        {{ $t('myaccount.billingAddress') }}
      </SectionHeadline>
      <AddressCard
        class="address-data__billing-address"
        :address="billingAddress"
        :is-billing-address="true"
      />
    </template>
    <Infobox
      v-if="!billingAddress"
      :text="$t('myaccount.billingAddressMissing')"
    />

    <SectionHeadline class="address-data__section-headline">
      {{ $t('myaccount.deliveryAddress') }}
    </SectionHeadline>
    <div class="address-data__delivery-addresses">
      <div class="address-data__add-delivery-address">
        <NuxtLink :to="localePath('shop-my-account')">
          {{ $t('myaccount.addDeliveryAddress') }}
          <Icon icon="add" />
        </NuxtLink>
      </div>
      <template v-if="deliveryAddresses">
        <AddressCard
          v-for="deliveryAddress in deliveryAddresses.addresses"
          :key="deliveryAddress.id"
          :address="deliveryAddress"
          editable
        />
      </template>
    </div>

    <!--      <t-button
        class="address-data-content__add-address tw-col-span-12 md:tw-col-span-6"
        :disabled="!isApprovedUser"
        :to="localePath('shop-my-account-address-data-add')"
      >
        <material-icon icon="add" class="tw-mr-2" />
        {{ $t('myaccount.addDeliveryAddress') }}
      </t-button>-->
  </div>
</template>

<script>
import {
  defineComponent,
  onBeforeMount,
  onServerPrefetch,
} from '@nuxtjs/composition-api'
import ResultHeadline from '~/components/molecules/ResultHeadline/ResultHeadline'
import SectionHeadline from '~/components/molecules/SectionHeadline/SectionHeadline'
import AddressCard from '~/components/molecules/AddressCard/AddressCard'
import Infobox from '~/components/molecules/Infobox/Infobox'
import { useUserStore } from '~/stores/user'
import { useErrorHandler } from '~/composables/useErrorHandler'
import { storeToRefs } from 'pinia'
import Icon from '~/components/atoms/Icon/Icon'

export default defineComponent({
  name: 'AddressData',
  components: {
    ResultHeadline,
    SectionHeadline,
    AddressCard,
    Infobox,
    Icon,
  },
  setup() {
    const userStore = useUserStore()
    const { billingAddress, deliveryAddresses } = storeToRefs(userStore)

    const { redirectOnError } = useErrorHandler()

    const loadAddressData = async () => {
      await redirectOnError(userStore.loadAddressData)
    }

    onServerPrefetch(async () => await loadAddressData())
    onBeforeMount(async () => await loadAddressData())

    return { billingAddress, deliveryAddresses }
  },
})
</script>

<style lang="scss">
.address-data {
  &__section-headline {
    @apply tw-mb-6;

    &:first-child {
      @apply tw-mt-2;
    }

    &:last-child {
      @apply tw-mt-8;
    }
  }

  &__delivery-addresses {
    @apply tw-grid tw-grid-cols-2 tw-gap-x-8 tw-gap-y-6;
  }

  &__add-delivery-address {
    @apply tw-flex;
    @apply tw-justify-center;
    @apply tw-items-center;
    @apply tw-border-2;
    @apply tw-rounded-lg;
    @apply tw-border-dashed;
    @apply tw-border-pv-grey-16;
    @apply tw-font-bold;
    @apply tw-text-pv-grey-16;

    a {
      @apply tw-flex;
      @apply tw-items-center;
      @apply tw-gap-x-5;
    }
  }
}
</style>
