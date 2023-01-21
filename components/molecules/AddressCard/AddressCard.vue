<template>
  <div v-if="address" class="address-data-item">
    <h4 v-if="headline" class="address-data-item__headline">
      {{ headline }}
    </h4>
    <p
      v-if="address.companyName"
      class="address-data-item__entry address-data-item__companyName"
    >
      {{ address.companyName }}
    </p>
    <p
      v-if="address.firstName || address.lastName"
      class="address-data-item__entry address-data-item__name"
    >
      {{ address.firstName }}
      {{ address.lastName }}
    </p>
    <p
      v-if="address.line1 || address.line2"
      class="address-data-item__entry address-data-item__addressLine"
    >
      {{ address.line1 }} {{ address.line2 }}
    </p>
    <p
      v-if="address.remarks"
      class="address-data-item__entry address-data-item__addressRemarks"
    >
      {{ address.remarks }}
    </p>
    <p
      v-if="address.postalCode || address.town"
      class="address-data-item__entry address-data-item__town"
    >
      {{ address.postalCode }} {{ address.town }}
    </p>
    <p
      v-if="address.country"
      class="address-data-item__entry address-data-item__country"
    >
      {{ address.country.name }}
      <!-- ToDo: implement Coutryname when data is available -->
      <!-- {{ getCountry(address.country.isocode) }} -->
    </p>
    <div
      v-if="address.phone || address.printer || address.email"
      class="address-data-item__contacts"
    >
      <div
        v-if="address.phone"
        class="address-data-item__contacts--item address-data-item__contacts--phone"
      >
        <Icon icon="call" />
        <p>{{ address.phone }}</p>
      </div>
      <div
        v-if="address.printer"
        class="address-data-item__contacts--item address-data-item__contacts--printer"
      >
        <Icon icon="print" />
        <p>{{ address.printer }}</p>
      </div>
      <div
        v-if="address.email"
        class="address-data-item__contacts--item address-data-item__contacts--email"
      >
        <Icon icon="mail" />
        <p>{{ address.email }}</p>
      </div>
    </div>
    <div v-if="editable" class="address-data-item__address-controls">
      <div class="address-data-item__address-controls--editables">
        <div>
          <Button
            :label="$t('myaccount.editDeliveryAddress')"
            icon="edit"
            variant="secondary"
            shape="plain"
          />
        </div>
        <div v-if="!isBillingAddress" class="default-switch">
          <Button
            :label="$t('myaccount.deleteDeliveryAddress')"
            icon="delete"
            variant="secondary"
            shape="plain"
            @click="deleteAddress"
          />
        </div>
      </div>
      <div
        v-if="!isBillingAddress"
        class="address-data-item__address-controls--setDefault"
        :class="{
          'address-data-item__address-controls--is-default':
            address.defaultShippingAddress,
        }"
      >
        <Button
          :label="
            address.defaultShippingAddress
              ? $t('myaccount.defaultDelivery')
              : $t('myaccount.setDefaultAddress')
          "
          icon="check"
          variant="secondary"
          shape="plain"
          @click="setAsDefault"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, toRefs } from '@nuxtjs/composition-api'
import Button from '~/components/atoms/Button/Button.vue'
import Icon from '~/components/atoms/Icon/Icon.vue'
import { useCountriesStore } from '~/stores/countries'

export default defineComponent({
  name: 'AdressDataItem',
  components: { Button, Icon },
  props: {
    headline: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    address: {
      type: Object,
      required: true,
    },
    isBillingAddress: {
      type: Boolean,
      default: false,
    },
    editable: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['setDefault', 'delete'],
  setup(props, { emit }) {
    const countriesStore = useCountriesStore()

    const { address } = toRefs(props)

    // ToDo: Please test function when data is implemented
    const getCountry = async (isocode) => {
      await countriesStore.getCountryName(isocode)
    }

    const setAsDefault = async () => {
      emit('setDefault', address.value.id)
    }

    const deleteAddress = async () => {
      emit('delete', address.value.id)
    }

    return {
      getCountry,
      setAsDefault,
      deleteAddress,
    }
  },
})
</script>

<style lang="scss" scoped>
.address-data-item {
  @apply tw-bg-pv-grey-96;
  @apply tw-rounded-md;
  @apply tw-p-4;

  &__headline {
    @apply tw-text-2xl;
    @apply tw-font-bold;
    @apply tw-text-pv-black;
    @apply tw-mb-4;
  }

  &__companyName {
    @apply tw-font-bold;
  }

  &__entry {
    @apply tw-text-base;
    @apply tw-mb-2;
  }

  &__contacts {
    @apply tw-mt-7;
    @apply tw-mb-7;

    &--item {
      @apply tw-flex;
      @apply tw-mb-3;
      @apply tw-items-center;

      p {
        @apply tw-ml-4;
      }
    }

    &--phone,
    &--email {
      @apply tw-text-pv-red;
      @apply tw-font-bold;
    }
  }

  &__address-controls {
    @apply tw-flex;
    @apply tw-flex-col;
    @apply tw-w-full;

    @screen md {
      @apply tw-flex-row;
    }

    &--editables {
      @apply tw-flex tw-items-center;
      @apply tw-w-full;
      @apply tw-gap-x-8;

      @screen md {
        @apply tw-w-1/2;
      }
    }

    &--setDefault {
      @apply tw-flex tw-justify-start tw-items-center;
      @apply tw-w-full;

      @screen md {
        @apply tw-w-1/2;
        @apply tw-justify-end;
      }
    }

    &--is-default {
      button {
        @apply tw-text-pv-grey-16;
      }
    }
  }
}
</style>
