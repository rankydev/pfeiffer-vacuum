<template>
  <div class="address-data">
    <ResultHeadline
      :headline="$t('myaccount.addressData')"
      :link="localePath('shop-my-account')"
    />
    <GlobalMessage
      v-if="!billingAddress && userStatusTypeForInfoText"
      :description="
        $t(
          `myaccount.userStatus.${userStatusTypeForInfoText}.functionalityInfo`
        )
      "
      variant="warning"
      :prevent-icon-change="true"
    />
    <template v-if="billingAddress">
      <SectionHeadline
        class="address-data__section-headline address-data__section-headline--billing-address"
      >
        {{ $t('myaccount.billingAddress') }}
      </SectionHeadline>
      <div class="address-data__grid-wrapper">
        <AddressCard
          class="address-data__billing-address"
          :address="billingAddress"
          :is-billing-address="true"
        />
      </div>
    </template>
    <SectionHeadline
      class="address-data__section-headline address-data__section-headline--delivery-address"
    >
      {{ $t('myaccount.deliveryAddress') }}
    </SectionHeadline>
    <transition-group
      name="transform-position"
      class="address-data__grid-wrapper"
      tag="div"
    >
      <div
        :key="0"
        class="address-data__add-delivery-address transform-position-item"
        :class="{
          'address-data__add-delivery-address--forbidden': !billingAddress,
        }"
      >
        <NuxtLink
          :to="localePath('shop-my-account-address-data-add')"
          :event="!billingAddress ? '' : 'click'"
        >
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
import GlobalMessage from '~/components/organisms/GlobalMessage/GlobalMessage'
import { useUserStore } from '~/stores/user'
import { storeToRefs } from 'pinia'
import Icon from '~/components/atoms/Icon/Icon'
import { useToast } from '~/composables/useToast'

export default defineComponent({
  name: 'AddressData',
  components: {
    ResultHeadline,
    SectionHeadline,
    AddressCard,
    GlobalMessage,
    Icon,
  },
  setup() {
    const userStore = useUserStore()
    const { billingAddress, deliveryAddresses, userStatusTypeForInfoText } =
      storeToRefs(userStore)
    const { i18n } = useContext()
    const toast = useToast()

    const handleDelete = async (e) => {
      try {
        await userStore.deleteDeliveryAddress(e)
        toast.success(
          {
            description: i18n.t('myaccount.deleteDeliveryAddressSuccess'),
          },
          {
            timeout: 8000,
          }
        )
      } catch {
        toast.error({
          description: i18n.t('myaccount.updateDeliveryAddressError'),
        })
      }
    }

    const handleSetDefault = async (e) => {
      try {
        await userStore.setDefaultDeliveryAddress(e)
        toast.success(
          {
            description: i18n.t('myaccount.setDefaultDeliveryAddressSuccess'),
          },
          {
            timeout: 8000,
          }
        )
      } catch (error) {
        toast.error({
          description: i18n.t('myaccount.updateDeliveryAddressError'),
        })
      }
    }

    onServerPrefetch(async () => await userStore.loadAddressData())
    onBeforeMount(async () => await userStore.loadAddressData())

    return {
      billingAddress,
      deliveryAddresses,
      userStatusTypeForInfoText,
      handleDelete,
      handleSetDefault,
    }
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
  }

  &__grid-wrapper {
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
      @apply tw-justify-center;
      @apply tw-gap-x-5;
      @apply tw-w-full;
      @apply tw-h-full;
      @apply tw-p-8;
    }

    &--forbidden {
      a {
        @apply tw-cursor-not-allowed;
      }
    }
  }
}
</style>
