<template>
  <div class="address-data-add">
    <LoadingSpinner :show="loading">
      <ResultHeadline
        :headline="
          isEditMode
            ? $t('myaccount.addressDataEditPage')
            : $t('myaccount.addressDataAddPage')
        "
        :link="localePath('shop-my-account-address-data')"
      />
      <div class="address-data-add__description">
        {{
          isEditMode
            ? $t('myaccount.addressDataEditPageDescription')
            : $t('myaccount.addressDataAddPageDescription')
        }}
      </div>
      <AddressDataForm
        :selected-country="country"
        :selected-region="region"
        :address-data="addressDataObject"
        @update:data="addressDataObject = $event"
      />
      <div class="address-data-add__interactions-wrapper">
        <Button
          class="address-data-add__interactions-link"
          :label="$t('myaccount.addressDataAddPageLinkBtn')"
          variant="secondary"
          shape="plain"
          icon="arrow_back"
          prepend-icon
          :href="localePath('shop-my-account-address-data')"
        />
        <Button
          class="address-data-add__interactions-submit"
          :label="
            isEditMode
              ? $t('myaccount.addressDataEditPageSubmitBtn')
              : $t('myaccount.addressDataAddPageSubmitBtn')
          "
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
import AddressDataForm from '~/components/molecules/AddressDataForm/AddressDataForm'
import LoadingSpinner from '~/components/atoms/LoadingSpinner/LoadingSpinner'
import Button from '~/components/atoms/Button/Button'

import {
  computed,
  defineComponent,
  ref,
  toRefs,
  useContext,
  useRouter,
  useRoute,
  onMounted,
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
  props: {
    isEditMode: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { i18n, localePath } = useContext()
    const router = useRouter()
    const route = useRoute()
    const toast = useToast()
    const v = useVuelidate()
    const userStore = useUserStore()

    let addressDataObject = ref({})
    const loading = ref(false)
    const { billingAddress } = storeToRefs(userStore)
    const { isEditMode } = toRefs(props)
    const addressID = route.value?.params?.edit

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

    onMounted(() => {
      if (!isEditMode.value && !addressID) return

      addressDataObject.value = userStore.getDeliveryAddressByID(addressID)
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

        if (!isEditMode.value) {
          try {
            await userStore.createDeliveryAddress(addressData)
            router.push(localePath('shop-my-account-address-data'))
          } catch (error) {
            toast.error({
              description: i18n.t('myaccount.addDeliveryAddressError'),
            })
            console.error(i18n.t('myaccount.addDeliveryAddressError'), error)
          } finally {
            loading.value = false
          }
        } else {
          try {
            await userStore.updateDeliveryAddress(addressID, addressData)
            router.push(localePath('shop-my-account-address-data'))
          } catch (error) {
            toast.error({
              description: i18n.t('myaccount.updateDeliveryAddressError'),
            })
            console.error(i18n.t('myaccount.updateDeliveryAddressError'), error)
          } finally {
            loading.value = false
          }
        }
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
    &-wrapper {
      @apply tw-flex tw-justify-between;
      @apply tw-flex-wrap;
      @apply tw-mt-4;

      @screen md {
        @apply tw-mt-10;
      }
    }

    &-link,
    &-submit {
      @apply tw-basis-full;

      @screen md {
        flex-basis: auto;
      }
    }

    &-link {
      order: 9999;

      @screen md {
        order: -9999;
      }
    }
  }
}
</style>
