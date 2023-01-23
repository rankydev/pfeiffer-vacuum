<template>
  <div class="address-data">
    <ResultHeadline
      :headline="$t('myaccount.addressData')"
      :link="localePath('shop-my-account')"
    />
    <template v-if="billingAddress">
      <SectionHeadline
        class="address-data__section-headline address-data__section-headline--billing-address"
      >
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

    <SectionHeadline
      class="address-data__section-headline address-data__section-headline--delivery-address"
    >
      {{ $t('myaccount.deliveryAddress') }}
    </SectionHeadline>
    <transition-group
      name="transform-position"
      class="address-data__delivery-addresses"
      tag="div"
    >
      <div
        :key="0"
        class="address-data__add-delivery-address transform-position-item"
      >
        <NuxtLink :to="localePath('shop-my-account-address-data-add')">
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
          class="transform-position-item"
          @delete="handleDelete"
          @setDefault="handleSetDefault"
        />
      </template>
    </transition-group>

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
  useContext,
} from '@nuxtjs/composition-api'
import ResultHeadline from '~/components/molecules/ResultHeadline/ResultHeadline'
import SectionHeadline from '~/components/molecules/SectionHeadline/SectionHeadline'
import AddressCard from '~/components/molecules/AddressCard/AddressCard'
import Infobox from '~/components/molecules/Infobox/Infobox'
import { useUserStore } from '~/stores/user'
import { useErrorHandler } from '~/composables/useErrorHandler'
import { storeToRefs } from 'pinia'
import Icon from '~/components/atoms/Icon/Icon'
import { useToast } from '~/composables/useToast'

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
    const { i18n } = useContext()
    const { redirectOnError } = useErrorHandler()
    const toast = useToast()

    const loadAddressData = async () => {
      await redirectOnError(userStore.loadAddressData)
    }

    const handleDelete = async (e) => {
      await userStore.deleteDeliveryAddress(e)
      toast.success(
        {
          description: i18n.t('myaccount.deleteDeliveryAddressSuccess'),
        },
        {
          timeout: 8000,
        }
      )
    }

    const handleSetDefault = async (e) => {
      await userStore.setDefaultDeliveryAddress(e)
      toast.success(
        {
          description: i18n.t('myaccount.setDefaultDeliveryAddressSuccess'),
        },
        {
          timeout: 8000,
        }
      )
    }

    onServerPrefetch(async () => await loadAddressData())
    onBeforeMount(async () => await loadAddressData())

    return { billingAddress, deliveryAddresses, handleDelete, handleSetDefault }
  },
})
</script>

<style lang="scss" scoped>
.address-data {
  &__section-headline {
    @apply tw-mb-6;

    &--billing-address {
      @apply tw-mt-2;
    }

    &--delivery-address {
      @apply tw-mt-8;
    }
  }

  &__billing-address {
    @apply tw-w-full;

    @screen md {
      @apply tw-w-6/12;
    }
  }

  &__delivery-addresses {
    @apply tw-grid tw-grid-cols-1 tw-gap-x-8 tw-gap-y-6;

    @screen md {
      @apply tw-grid-cols-2;
    }
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
      @apply tw-p-8;
    }
  }
}
</style>
