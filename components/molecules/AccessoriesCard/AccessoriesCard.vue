<template>
  <GenericCard :has-link="false" image-size="contain" :href="url">
    <template #image>
      <ResponsiveImage
        :image="accessoryImage"
        aspect-ratio="16:9"
        :provider="provider"
      />
    </template>

    <template #heading>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <span class="accessories-card__product-name" v-html="productName" />
      <p class="accessories-card__product-number">
        {{ product.orderNumber }}
      </p>
    </template>

    <template #additionalInfo>
      <div v-if="hasPrice" class="accessories-card__price">
        <template v-if="isApprovedUser">
          <p
            v-if="isPriceVisible"
            class="accessories-card__price-info"
            @click="infoModalVisible = true"
          >
            {{
              hasCustomerPrice
                ? $t('product.priceInfo.InfoPersonal')
                : $t('product.priceInfo.InfoOnline')
            }}
            <Icon icon="info" />
          </p>
          <span class="accessories-card__price-value">{{ productPrice }}</span>
        </template>
      </div>
      <div>
        <template v-if="loggedIn && !isApprovedUser">
          <i18n
            :path="`userStatus.${userStatusType}.priceInfo.text`"
            class="accessories-card__login-link"
            tag="div"
          >
            <template #link>
              <nuxt-link
                :to="localePath('shop-my-account-account-data')"
                class="login-modal-link"
              >
                {{ $t(`userStatus.${userStatusType}.priceInfo.link`) }}
              </nuxt-link>
            </template>
          </i18n>
        </template>
        <template v-else-if="!loggedIn">
          <p class="accessories-card__login-link">
            {{ $t('product.login.loginToSeePrices.part1') }}
            <!-- eslint-disable vue/no-v-html -->
            <span
              class="login-modal-link"
              @click="login()"
              v-html="
                sanitizer.clear($t('product.login.loginToSeePrices.part2'))
              "
            ></span>
            <!-- eslint-enable vue/no-v-html -->
            {{ $t('product.login.loginToSeePrices.part3') }}
          </p>
        </template>
      </div>
    </template>

    <template #actionItems>
      <div class="accessories-card__add-to-cart">
        <PvInput v-model="quantity" input-type="number" min="1" required />
        <div class="accessories-card__add-to-cart-buttons">
          <Button icon="shopping_cart" @click.prevent="addToCart()" />
          <Button
            v-if="hasAddToListButton"
            variant="secondary"
            shape="outlined"
            icon="assignment"
            @click.prevent="addToList()"
          />
        </div>
      </div>

      <InformationModal v-if="hasPrice" v-model="infoModalVisible">
        <div v-if="hasCustomerPrice" class="tw-pb-3">
          <h2>{{ $t('product.priceInfo.InfoPersonal') }}</h2>
          <p>{{ $t('product.priceInfo.textInfoPersonal') }}</p>
          <t-button
            :to="localePath('shop-contact')"
            variant="secondary"
            class="tw-mt-3"
          >
            {{ $t('misc.help') }}
          </t-button>
        </div>
        <div v-else class="tw-pb-3">
          <h2>{{ $t('product.priceInfo.InfoOnline') }}</h2>
          <p class="tw-pb-3">
            {{ $t('product.priceInfo.textInfoOnlineLine1') }}
          </p>
          <p>{{ $t('product.priceInfo.textInfoOnlineLine2') }}</p>
        </div>
      </InformationModal>
    </template>
  </GenericCard>
</template>
<script>
import {
  defineComponent,
  useContext,
  ref,
  computed,
  toRefs,
} from '@nuxtjs/composition-api'
import { useUserStore } from '~/stores/user'
import { useOciStore } from '~/stores/oci'
import { useSanitizer } from '~/composables/sanitizer/useSanitizer'
import GenericCard from '~/components/molecules/GenericCard/GenericCard.vue'
import InformationModal from '~/components/molecules/InformationModal/InformationModal'
import Icon from '~/components/atoms/Icon/Icon.vue'
import PvInput from '~/components/atoms/FormComponents/PvInput/PvInput.vue'

export default defineComponent({
  name: 'AccessoriesCard',
  components: {
    GenericCard,
    InformationModal,
    Icon,
    PvInput,
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
  emits: ['updateSort'],
  setup(props) {
    const { i18n } = useContext()
    const context = useContext()
    const userStore = useUserStore()
    const ociStore = useOciStore()
    const sanitizer = useSanitizer()
    const { product } = toRefs(props)

    const quantity = ref(1)
    const infoModalVisible = ref(false)

    const hasAddToListButton = computed(() => {
      return userStore.isLoggedIn && !ociStore.isOciUser
    })
    const hasPrice = computed(() => {
      return !!product.value.price
    })
    const isPriceVisible = computed(() => {
      return product.value?.price?.value && userStore.isApprovedUser
    })
    const hasCustomerPrice = computed(() => {
      return !!product.value.price?.customerPrice
    })
    const productPrice = computed(() => {
      if (!product.value.price?.value) {
        return i18n.t('product.priceOnRequest')
      }
      return product.value.price?.formattedValue || ''
    })
    const userStatusType = computed(() => {
      return (
        (userStore.isLeadUser && 'lead') ||
        (userStore.isOpenUser && 'open') ||
        (userStore.isRejectedUser && 'rejected')
      )
    })

    const productName = computed(() => {
      return sanitizer.inline(product.value.name || product.value.id)
    })

    const addToCart = () => {
      const params = { code: product.value.code, quantity: quantity.value }
      this.$store.dispatch('addToCart', params)
    }
    const addToList = () => {
      this.$store.commit('setShoppingListLastProduct', product.value)
      this.$store.commit('setShoppingListLastProductQuantity', quantity.value)
      this.$store.dispatch('addToList')
    }
    const login = async () => {
      await userStore.login()
    }

    const accessoryImage = computed(() => {
      if (product.value?.productReferences[0]?.image) {
        product.value.images.find(
          (img) => img.imageType === 'PRIMARY' && img.format === 'product'
        ) || {}
      }
    })

    return {
      context,
      quantity,
      infoModalVisible,
      hasAddToListButton,
      hasPrice,
      isPriceVisible,
      hasCustomerPrice,
      productPrice,
      userStatusType,
      productName,
      addToCart,
      addToList,
      login,
      accessoryImage,
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
  }

  &__product-number {
    @apply tw-text-pv-grey-48;
    @apply tw-text-xs;
    @apply tw-mt-auto;
  }

  &__price {
    @apply tw-mb-2;

    &-info {
      @apply tw-inline-flex;
      @apply tw-items-center;
      @apply tw-cursor-pointer;
      @apply tw-text-pv-grey-32;

      .Icons {
        @apply tw-ml-1;
        @apply tw-text-base;
      }
    }

    &-value {
      @apply tw-block;
      @apply tw-text-pv-black tw-font-bold;
      @apply tw-mt-1 tw-mb-3;
      @apply tw-text-xl;
    }
  }

  &__login-link {
    @apply tw-text-pv-black tw-font-bold;
    @apply tw-text-base;
    @apply tw-text-right;
    @apply tw-mb-2;

    span,
    .login-modal-link {
      @apply tw-text-pv-red;
      @apply tw-cursor-pointer;
      @apply tw-outline-none;
      @apply tw-italic;
    }
  }

  &__add-to-cart {
    @apply tw-flex;
    @apply tw-justify-between;

    input {
      @apply tw-pr-4;
      @apply tw-mr-2;
      @apply tw-leading-8;
    }

    &-buttons {
      @apply tw-flex;
      @apply tw-justify-end;
      @apply tw-ml-2;

      button:first-child {
        @apply tw-mr-2;
      }
    }
  }
}
</style>