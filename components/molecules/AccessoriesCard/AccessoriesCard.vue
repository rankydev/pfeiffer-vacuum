<template>
  <client-only>
    <GenericCard
      v-if="product"
      :has-link="true"
      image-size="contain"
      :href="productUrl"
    >
      <template #image>
        <ResponsiveImage
          :image="imageUrl(product.images)"
          aspect-ratio="16:9"
          :provider="provider"
        />
      </template>

      <template #heading>
        <div class="accessories-card__heading">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <h5 class="accessories-card__product-name" v-html="productName" />
          <p class="accessories-card__product-number">
            {{ product.orderNumber }}
          </p>
        </div>
      </template>

      <template #additionalInfo>
        <div v-if="product.price" class="accessories-card__price">
          <template v-if="isApprovedUser">
            <p
              v-if="isPriceVisible"
              class="accessories-card__price-info"
              @click="$emit('priceInfoModalIconClick', hasCustomerPrice)"
            >
              {{
                hasCustomerPrice
                  ? $t('product.priceInfo.InfoPersonal')
                  : $t('product.priceInfo.InfoOnline')
              }}
              <Icon
                icon="info"
                size="xsmall"
                class="accessories-card__price-info-icon"
              />
            </p>
            <span class="accessories-card__price-value">
              {{ productPrice }}
            </span>
          </template>
        </div>
        <div>
          <template v-if="isLoggedIn && !isApprovedUser">
            <i18n
              :path="`product.userStatus.${userStatusType}.priceInfo.text`"
              class="accessories-card__login-link"
              tag="div"
            >
              <template #link>
                <!-- TODO: add correct route after my-account migration -->
                <nuxt-link
                  :to="localePath('shop-my-account-account-data')"
                  class="login-modal-link"
                >
                  {{
                    $t(`product.userStatus.${userStatusType}.priceInfo.link`)
                  }}
                </nuxt-link>
              </template>
            </i18n>
          </template>
          <template v-else-if="!isLoggedIn">
            <LoginToSeePricesLabel class="accessories-card__login-link" />
          </template>
        </div>
      </template>

      <template #actionItems>
        <div class="accessories-card__add-to-cart">
          <PvInput v-model="quantity" input-type="number" min="1" required />
          <div class="accessories-card__add-to-cart-buttons">
            <Button icon="shopping_cart" @click="addToCart()" />
            <Button
              v-if="hasAddToListButton"
              class="accessories-card__add-to-cart-buttons__add-to-list"
              variant="secondary"
              shape="outlined"
              icon="assignment"
              @click="addToList()"
            />
          </div>
        </div>
      </template>
    </GenericCard>
  </client-only>
</template>

<script>
import {
  defineComponent,
  useContext,
  ref,
  computed,
  toRefs,
} from '@nuxtjs/composition-api'
import { useCartStore } from '~/stores/cart'
import { useUserStore } from '~/stores/user'
import { useSanitizer } from '~/composables/sanitizer/useSanitizer'
import GenericCard from '~/components/molecules/GenericCard/GenericCard.vue'
import LoginToSeePricesLabel from '~/components/atoms/LoginToSeePricesLabel/LoginToSeePricesLabel.vue'
import Icon from '~/components/atoms/Icon/Icon.vue'
import PvInput from '~/components/atoms/FormComponents/PvInput/PvInput.vue'
import { useImageHelper } from '~/composables/useImageHelper/useImageHelper'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'AccessoriesCard',
  components: {
    GenericCard,
    Icon,
    PvInput,
    LoginToSeePricesLabel,
  },
  props: {
    product: {
      type: Object,
      default: () => ({}),
    },
    provider: {
      type: String,
      default: 'hybris',
    },
  },
  emits: ['updateSort', 'priceInfoModalIconClick'],
  setup(props) {
    const { i18n } = useContext()
    const context = useContext()
    const userStore = useUserStore()
    const cartStore = useCartStore()
    const sanitizer = useSanitizer()
    const { product } = toRefs(props)
    const { imageUrl } = useImageHelper()

    const quantity = ref(1)
    const {
      isLoggedIn,
      isApprovedUser,
      isLeadUser,
      isOpenUser,
      isRejectedUser,
      isOciUser,
    } = storeToRefs(userStore)
    const { addProductToCart } = cartStore

    const hasAddToListButton = computed(() => {
      return isLoggedIn.value && !isOciUser.value
    })
    const isPriceVisible = computed(() => {
      return product.value?.price?.value && isApprovedUser.value
    })
    const hasCustomerPrice = computed(() => {
      return !!product.value.price?.customerPrice
    })
    const productPrice = computed(() => {
      if (product.value.price && product.value.price.value)
        return product.value?.price?.formattedValue || ''
      return i18n.t('product.priceOnRequest')
    })
    const userStatusType = computed(() => {
      if (isLeadUser.value) return 'lead'
      if (isOpenUser.value) return 'open'
      if (isRejectedUser.value) return 'rejected'
    })

    const productName = computed(() => {
      return sanitizer.inline(product.value.name || product.value.id)
    })

    const productUrl = computed(() =>
      context.app.localePath({
        name: 'shop-products-product',
        params: { product: product.value?.code },
      })
    )

    const addToCart = async () => {
      await addProductToCart(product.value?.code, quantity.value)
    }

    const addToList = () => {
      // ToDo:
      // still has to be done
    }

    return {
      context,
      imageUrl,
      quantity,
      hasAddToListButton,
      isPriceVisible,
      hasCustomerPrice,
      productName,
      productPrice,
      productUrl,
      userStatusType,
      addToCart,
      addToList,
      isLoggedIn,
      isApprovedUser,
      sanitizer,
      i18n,
    }
  },
})
</script>
<style lang="scss">
.pv-card__heading {
  @apply tw-text-left;
}

.pv-input {
  @apply tw-w-full;
}

.accessories-card {
  &__product-name {
    @apply tw-text-pv-black;
    @apply tw-text-base;
    @apply tw-font-bold;
    @apply tw-w-full;
    @apply tw-overflow-hidden;
    @apply tw-leading-6;
    height: 3em;

    &:hover {
      @apply tw-text-pv-red;
    }
  }

  &__product-number {
    @apply tw-text-pv-grey-48;
    @apply tw-text-xs;
    @apply tw-mt-2;
  }

  &__price {
    @apply tw-mb-1;
    @apply tw-flex;
    @apply tw-flex-col;
    @apply tw-justify-end;
    @apply tw-items-end;
    @apply tw-h-14;

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
      @apply tw-block;
      @apply tw-text-pv-black tw-font-bold;
      @apply tw-mt-1 tw-mb-3;
      @apply tw-text-lg;
    }
  }

  &__login-link {
    @apply tw-text-pv-black tw-font-bold;
    @apply tw-text-base;
    @apply tw-text-right;
    @apply tw-mb-2;
  }

  &__add-to-cart {
    @apply tw-flex;
    @apply tw-justify-between;

    input {
      @apply tw-pr-4;
      @apply tw-mr-2;
    }

    &-buttons {
      @apply tw-flex;
      @apply tw-justify-end;
      @apply tw-ml-2;

      &__add-to-list {
        @apply tw-ml-2;
      }
    }
  }
}
</style>
