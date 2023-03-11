<template>
  <div class="product-actions">
    <div v-if="!isMaster" class="product-actions__info">
      <div class="product-actions__order-number">
        <span class="product-actions__order-number-headline">
          {{ $t('product.articleNumber') }}
        </span>
        <span>{{ orderNumber }}</span>
      </div>
      <div
        :class="[
          'product-actions__price-information',
          {
            'product-actions__price-information--login': !isPriceVisible,
            'product-actions__price-information--price': isPriceVisible,
          },
        ]"
      >
        <template v-if="!isLoggedIn">
          <LoginToSeePricesLabel />
        </template>
        <template v-else-if="isPriceVisible">
          <span class="product-actions__price-info" @click="toggleModal">
            {{
              hasCustomerPrice
                ? $t('product.priceInfo.InfoPersonal')
                : $t('product.priceInfo.InfoOnline')
            }}
            <Icon
              icon="info"
              size="xsmall"
              class="product-actions__price-info-icon"
            />
          </span>
          <span class="product-actions__price-value">{{ productPrice }}</span>
        </template>
        <template v-else>
          <span>{{ noPriceReason }}</span>
        </template>
      </div>
    </div>
    <div class="product-actions__action-wrapper">
      <PvInput
        v-model.number="userSelectedOrderQuantity"
        class="product-actions__quantity"
        input-type="number"
        :min="1"
      />
      <Button
        class="product-actions__add-to-cart"
        icon="shopping_cart"
        :label="$t('product.addToCart')"
        :disabled="isMaster"
        @click="addToCart"
      />
      <template v-if="isLoggedIn">
        <Button
          class="product-actions__installed-base"
          icon="fact_check"
          :label="$t('product.addToList')"
          variant="secondary"
          shape="outlined"
          :disabled="isMaster"
          @click="addToProductList"
        />
        <!-- TODO: As soon as InstalledBase are implemented please substitute the disabled attribute here with
         :disabled="addToBaseButtonDisabled" -->
        <Button
          class="product-actions__shopping-list"
          :label="$t('product.addToInstalledBase')"
          icon="assignment"
          variant="secondary"
          shape="outlined"
          :disabled="true"
        />
      </template>
    </div>
    <InformationModal
      :is-open="infoModalVisible"
      :headline="informationModalHeadline"
      :text="informationModalText"
      @closeModal="toggleModal"
    />
  </div>
</template>

<script>
import {
  ref,
  computed,
  useContext,
  defineComponent,
} from '@nuxtjs/composition-api'
import { useUserStore } from '~/stores/user'
import { useProductStore } from '~/stores/product'
import { useCartStore } from '~/stores/cart'
import { useShoppingLists } from '~/stores/shoppinglists'
import { storeToRefs } from 'pinia'
import PvInput from '~/components/atoms/FormComponents/PvInput/PvInput'
import InformationModal from '~/components/molecules/InformationModal/InformationModal'
import LoginToSeePricesLabel from '~/components/atoms/LoginToSeePricesLabel/LoginToSeePricesLabel.vue'
import Icon from '~/components/atoms/Icon/Icon.vue'
import Button from '~/components/atoms/Button/Button.vue'

export default defineComponent({
  name: 'ProductActions',
  components: {
    PvInput,
    InformationModal,
    LoginToSeePricesLabel,
    Icon,
    Button,
  },
  setup() {
    const { i18n } = useContext()
    const userStore = useUserStore()
    const productStore = useProductStore()
    const cartStore = useCartStore()
    const { product, productType, price } = storeToRefs(productStore)
    const shopppingListStore = useShoppingLists()
    const {
      isApprovedUser,
      isLeadUser,
      isOpenUser,
      isRejectedUser,
      isLoggedIn,
    } = storeToRefs(userStore)
    const { addProductToCart } = cartStore

    const userSelectedOrderQuantity = ref(1)

    const infoModalVisible = ref(false)

    const orderNumber = computed(() => product?.value?.orderNumber || '')

    const noPriceReason = computed(() => {
      const path = 'product.login.loginToSeePrices.'
      if (isLeadUser.value) return i18n.t(path + 'lead')
      if (isOpenUser.value) return i18n.t(path + 'open')
      if (isRejectedUser.value) return i18n.t(path + 'rejected')
      return i18n.t('product.noPriceAvailable')
    })

    const hasCustomerPrice = computed(() => !!price.value?.customerPrice)

    const productPrice = computed(() =>
      price.value
        ? price.value?.formattedValue || ''
        : i18n.t('product.priceOnRequest')
    )

    const isPriceVisible = computed(
      () => !!(price.value && isApprovedUser.value)
    )

    const isMaster = computed(() => productType.value === 'MASTERPRODUCT')

    const addToBaseButtonDisabled = computed(() => {
      return (
        isMaster.value ||
        isLeadUser.value ||
        isOpenUser.value ||
        isRejectedUser.value
      )
    })

    const informationModalHeadline = computed(() => {
      if (hasCustomerPrice.value)
        return i18n.t('product.priceInfo.InfoPersonal')

      if (!hasCustomerPrice.value) return i18n.t('product.priceInfo.InfoOnline')
    })

    const informationModalText = computed(() => {
      if (hasCustomerPrice.value)
        return i18n.t('product.priceInfo.textInfoPersonal')

      if (!hasCustomerPrice.value)
        return `${i18n.t(
          'product.priceInfo.textInfoOnlineLine1'
        )}<br/><br/>${i18n.t('product.priceInfo.textInfoOnlineLine2')}`
    })

    const toggleModal = () => (infoModalVisible.value = !infoModalVisible.value)

    const addToCart = async () => {
      await addProductToCart(
        product.value?.code,
        userSelectedOrderQuantity.value
      )
    }

    const addToProductList = () => {
      shopppingListStore.setProductAmount(userSelectedOrderQuantity.value)
      shopppingListStore.toggleOverlay()
    }

    return {
      userStore,
      isLoggedIn,
      isApprovedUser,
      orderNumber,
      productPrice,
      isPriceVisible,
      addToBaseButtonDisabled,
      isMaster,
      price,
      hasCustomerPrice,
      noPriceReason,
      infoModalVisible,
      informationModalHeadline,
      informationModalText,
      userSelectedOrderQuantity,
      toggleModal,
      addToCart,
      addToProductList,
    }
  },
})
</script>
<style lang="scss">
.product-actions {
  @apply tw-flex;
  @apply tw-flex-col;
  @apply tw-gap-4;

  &__info {
    @apply tw-grid;
    @apply tw-grid-cols-6;
    @apply tw-gap-2;
    @apply tw-justify-between tw-items-end;

    @screen md {
      @apply tw-gap-4;
    }
  }

  &__order-number {
    @apply tw-flex;
    @apply tw-flex-col;
    @apply tw-col-span-2;
  }

  &__order-number-headline {
    @apply tw-text-xs;
  }

  &__price-information {
    @apply tw-col-span-4;
    @apply tw-text-right;

    &--login {
      @apply tw-text-lg;
      @apply tw-font-bold;
    }

    &--price {
      @apply tw-flex;
      @apply tw-flex-col;
      @apply tw-items-end;
    }
  }

  &__price {
    &-info {
      @apply tw-inline-flex;
      @apply tw-items-center;
      @apply tw-cursor-pointer;
      @apply tw-text-pv-grey-32;
      @apply tw-text-xs;
    }

    &-info-icon {
      @apply tw-ml-1;
    }

    &-value {
      @apply tw-font-bold;
    }
  }

  &__action-wrapper {
    @apply tw-grid;
    @apply tw-grid-cols-6;
    @apply tw-gap-2;

    @screen md {
      @apply tw-gap-4;
    }
  }

  &__buttons {
    @apply tw-flex;
    @apply tw-justify-end;
    @apply tw-gap-4;
  }

  &__quantity {
    @apply tw-col-span-6;

    @screen md {
      @apply tw-col-span-2;
    }
  }

  &__add-to-cart {
    @apply tw-col-span-6;

    @screen md {
      @apply tw-col-span-4;
    }
  }

  &__installed-base {
    @apply tw-col-span-6;
  }

  &__shopping-list {
    @apply tw-col-span-6;
  }
}
</style>
