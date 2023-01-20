<template>
  <div class="address-data-add">
    <LoadingSpinner :show="loading">
      <ResultHeadline
        :headline="$t('myaccount.addressDataAddPage')"
        :link="localePath('shop-my-account-address-data')"
      />
      <div class="address-data-add__description">
        {{ $t('myaccount.addressDataAddPageDescription') }}
      </div>
      <AddressDataForm
        @update:data="addressDataObject = $event"
        :selected-country="country"
        :selected-region="region"
      />
      <div class="address-data-add__interactions">
        <Button
          class="address-data-add__interactions--link"
          :label="$t('myaccount.addressDataAddPageLinkBtn')"
          variant="secondary"
          shape="plain"
          icon="arrow_back"
          prepend-icon
          :href="localePath('shop-my-account-address-data')"
        />
        <Button
          class="address-data-add__interactions--submit"
          :label="$t('myaccount.addressDataAddPageSubmitBtn')"
          variant="secondary"
          icon="save"
          @click.native="submit"
        />
      </div>
    </LoadingSpinner>
  </div>
</template>

<script>
import ResultHeadline from '~/components/molecules/ResultHeadline/ResultHeadline'
import AddressDataForm from '~/pages/shop/my-account/AddressDataForm'
import LoadingSpinner from '~/components/atoms/LoadingSpinner/LoadingSpinner'
import Button from '~/components/atoms/Button/Button'

import {
  computed,
  defineComponent,
  ref,
  useContext,
  useRouter,
} from '@nuxtjs/composition-api'
import { useUserStore } from '~/stores/user'
import { useToast } from '~/composables/useToast'
import useVuelidate from '@vuelidate/core'
import { storeToRefs } from 'pinia'

export default defineComponent({
  components: {
    ResultHeadline,
    AddressDataForm,
    LoadingSpinner,
    Button,
  },
  setup() {
    const { i18n, localePath } = useContext()
    const router = useRouter()
    const userStore = useUserStore()
    const addressDataObject = ref({})
    const toast = useToast()
    const v = useVuelidate()
    const loading = ref(false)

    const { billingAddress } = storeToRefs(userStore)

    const country = computed(() => {
      if (
        billingAddress.value.country &&
        Object.keys(billingAddress.value.country).length
      )
        return billingAddress.value.country

      return undefined
    })

    const region = computed(() => {
      if (
        billingAddress.value.region &&
        Object.keys(billingAddress.value.region).length
      )
        return billingAddress.value.region

      return undefined
    })

    const countryRequestData = computed(() => {
      if (country.value) {
        if (region.value)
          return { country: country.value, region: region.value }
        return { country: country.value }
      }

      return undefined
    })

    const submit = async () => {
      v.value.$validate()
      if (!country.value) return
      const addressData = {
        ...addressDataObject.value,
        ...countryRequestData.value,
      }

      if (v.value.$errors.length + v.value.$silentErrors.length === 0) {
        loading.value = true

        await userStore
          .createDeliveryAddress(addressData)
          .then(() => {
            loading.value = false
            router.push(localePath('shop-my-account-address-data'))
          })
          .catch(() => {
            toast.error({
              description: i18n.t('myaccount.addDeliveryAddressError'),
            })

            loading.value = false
          })
      }
    }

    return {
      country,
      region,
      loading,
      addressDataObject,
      submit,
    }
  },
})
</script>

<style scoped lang="scss">
.address-data-add {
  &__description {
    @apply tw-mt-8;
    @apply tw-mb-4;
  }

  &__interactions {
    @apply tw-flex tw-justify-between;
    @apply tw-flex-wrap;
    @apply tw-mt-4;

    @screen md {
      @apply tw-mt-10;
    }

    &--link,
    &--submit {
      @apply tw-basis-full;

      @screen md {
        flex-basis: auto;
      }
    }

    &--link {
      order: 9999;

      @screen md {
        order: -9999;
      }
    }
  }
}
</style>
