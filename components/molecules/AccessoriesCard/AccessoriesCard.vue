<template>
  <GenericCard :has-link="false" image-size="contain" :href="url">
    <template #image>
      <!-- <img :src="imageUrl(product.images)" alt="" /> -->
      <ResponsiveImage
        :image="product.images || {}"
        aspect-ratio="16:9"
        :provider="provider"
      />
    </template>

    <template #heading>
      <!-- <span class="accessories-card__product-name" v-html="productName" /> -->
      <span v-html="sanitizer.clear(productName) || ''" />
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
            {{ $t('login.loginToSeePrices.part1') }}
            <span
              class="login-modal-link"
              @click="login()"
              v-html="sanitizer.clear($t('login.loginToSeePrices.part2'))"
            ></span>
            {{ $t('login.loginToSeePrices.part3') }}
          </p>
        </template>
      </div>
    </template>

    <template #actionItems>
      <div class="accessories-card__add-to-cart">
        <PvInput
          v-model="quantity"
          validation-type="onlyErrors"
          type="number"
          min="1"
          required
        />
        <div class="accessories-card__add-to-cart-buttons">
          <!-- <t-button variant="cta" class="tw-mr-2" @click.prevent="addToCart()"> -->
          <Button icon="shopping_cart" />
          <!-- <Icon icon="shopping_cart" /> -->
          <!-- </t-button> -->
          <!-- <t-button -->
          <!-- v-if="hasAddToListButton" variant="secondary"
          @click.prevent="addToList()" > -->
          <Button icon="assignment" />
          <!-- <Icon icon="assignment" /> -->
          <!-- </t-button> -->
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
} from '@nuxtjs/composition-api'
import { useUserStore } from '~/stores/user'
import { useSanitizer } from '~/composables/sanitizer/useSanitizer'
import GenericCard from '~/components/molecules/GenericCard/GenericCard.vue'
import InformationModal from '~/components/molecules/InformationModal/InformationModal'
import Icon from '~/components/atoms/Icon/Icon.vue'
import PvInput from '~/components/atoms/FormComponents/PvInput/PvInput.vue'
// import cardFunctions from '~/components/common/mixins/cardFunctions'

export default defineComponent({
  name: 'AccessoriesCard',
  components: {
    GenericCard,
    InformationModal,
    Icon,
    PvInput,
  },
  // mixins: [cardFunctions],
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { i18n } = useContext()
    const context = useContext()
    const userStore = useUserStore()

    const quantity = ref(1)
    const infoModalVisible = ref(false)

    // const image = computed(() => props.product.images?.[0])
    // const description = computed(() => (props.product.bullets || []).join(', '))
    // const name = computed(() => props.product.name)
    // const categoryName = computed(() => props.product.categories?.[0]?.name)

    // const url = computed(() =>
    //   context.app.localePath({
    //     name: 'shop-products-product',
    //     params: { product: props.product?.code },
    //   })
    // )
    const hasAddToListButton = computed(() => {
      return this.loggedIn && !this.isOciUser
    })
    const hasPrice = computed(() => {
      return !!props.product.price
    })
    const isPriceVisible = computed(() => {
      return props.product?.price?.value && this.isApprovedUser
    })
    const hasCustomerPrice = computed(() => {
      return !!props.product.price?.customerPrice
    })
    const productPrice = computed(() => {
      if (!props.product.price?.value) {
        return this.$t('product.priceOnRequest')
      }
      return props.product.price?.formattedValue || ''
    })
    const userStatusType = computed(() => {
      return (
        (this.isLeadUser && 'lead') ||
        (this.isOpenUser && 'open') ||
        (this.isRejectedUser && 'rejected')
      )
    })

    const productName = computed(() => {
      return sanitizer.inline(props.product.name || props.product.id)
    })

    const addToCart = () => {
      const params = { code: props.product.code, quantity: this.quantity }
      this.$store.dispatch('addToCart', params)
    }
    const addToList = () => {
      this.$store.commit('setShoppingListLastProduct', props.product)
      this.$store.commit('setShoppingListLastProductQuantity', this.quantity)
      this.$store.dispatch('addToList')
    }
    const login = async () => {
      await this.$authApi.login()
    }
    const imageUrl = (images) => {
      if (images) {
        const isPrimaryImage = (img) => img.imageType === 'PRIMARY'
        const isProductImage = (img) => img.format === 'product'
        const findImage = (img) => isPrimaryImage(img) && isProductImage(img)

        const { url } = images.find(findImage) || {}

        if (url) {
          return this.getShopMedia(url)
        }
      }

      return this.getAssetImage(this.$t('product.placeholderImage'))
    }

    const sanitizer = useSanitizer()

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
      imageUrl,
      sanitizer,
      i18n,
    }
  },
  // computed: {
  //   ...mapGetters([
  //     'currentUser',
  //     'loggedIn',
  //     'isApprovedUser',
  //     'isRejectedUser',
  //     'isOpenUser',
  //     'isLeadUser',
  //     'isOciUser',
  //   ]),
  // },
})
</script>
<style lang="scss">
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
      font-size: 20px;
    }
  }

  &__login-link {
    @apply tw-text-pv-black tw-font-bold;
    @apply tw-text-base;

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
      @apply tw-w-32;
      @apply tw-leading-8;
    }

    &-buttons {
      @apply tw-flex;
      @apply tw-justify-end;
    }
  }
}
</style>
