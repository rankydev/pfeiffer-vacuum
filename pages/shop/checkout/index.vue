<template>
  <CmsQuery
    :handle-preview-events="true"
    :slug="slugs.slug"
    :fallback-slug="slugs.fallbackSlug"
    :language="slugs.language"
  >
    <template #default="{ result: { data } }">
      <Page v-if="data" v-bind="data">
        <template #default>
          <ContentWrapper>
            <LoadingSpinner :show="loading || cartLoading">
              <Confirmation
                v-if="placedOrder"
                :order="placedOrder"
                class="checkout__confirmation"
              />
              <template v-else-if="cartEntries">
                <div class="checkout">
                  <div class="checkout__header">
                    <ResultHeadline :headline="$t('checkout.summary')" />
                  </div>

                  <div class="checkout__check-details">
                    {{ $t('checkout.checkDetails') }}
                  </div>

                  <div v-if="!isOciUser" class="checkout__addresses">
                    <AddressCard
                      :address="deliveryAddress || {}"
                      :headline="$t('checkout.deliveryAddress')"
                      :editable="false"
                      class="checkout__address-item"
                    />
                    <AddressCard
                      :address="billingAddress || {}"
                      :headline="$t('checkout.billingAddress')"
                      :is-billing-address="true"
                      :editable="false"
                      class="checkout__address-item"
                    />
                  </div>

                  <div v-if="!isOciUser" class="checkout__text-fields">
                    <PvInput
                      v-model="customerReference"
                      :label="$t('checkout.reference')"
                      class="checkout__text-field-item"
                      @focus="saveCustomerReference"
                    />
                    <PvTextArea
                      v-model="commentOnRequest"
                      :label="$t('checkout.comment')"
                      class="checkout__text-field-item checkout__textarea"
                      @focus="saveCommentOnRequest"
                    />
                  </div>

                  <div class="checkout__article-list-heading">
                    <h3>{{ $t('checkout.articleList') }}</h3>
                  </div>

                  <CartTable :edit-mode="false" />

                  <div
                    class="checkout__info"
                    :class="{ 'checkout__info--oci': isOciUser }"
                  >
                    <div v-if="!isOciUser" class="checkout__information">
                      <PromotionLabel
                        v-for="(promotion, index) in cartPromotions"
                        :key="index"
                        :subline="promotion.description"
                      />
                      <PriceInformation information-type="price" />
                      <PriceInformation information-type="delivery" />
                    </div>

                    <div class="checkout__actions">
                      <div class="checkout__total">
                        <TotalNetInformation :current-cart="currentCart" />
                      </div>

                      <div class="checkout__privacy-policy">
                        <Button
                          :href="personalPrivacyLink"
                          :label="$t('checkout.privacyPolicyLink')"
                          variant="secondary"
                          prepend-icon
                          shape="plain"
                          icon="file_open"
                          target="_blank"
                        />
                      </div>

                      <div class="checkout__submit">
                        <Button
                          :label="
                            $t(
                              isOciUser
                                ? 'checkout.transmitCart'
                                : 'checkout.completeRequest'
                            )
                          "
                          class="checkout__button--submit"
                          variant="primary"
                          icon="mail_outline"
                          @click="placeOrder"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="checkout__back-button">
                    <Button
                      :href="localePath('shop-cart')"
                      class="checkout__button checkout__button--back"
                      variant="secondary"
                      shape="plain"
                      :label="$t('checkout.backToCart')"
                      :prepend-icon="true"
                      icon="arrow_back"
                    />
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="checkout__empty">
                  <Icon
                    icon="shopping_cart"
                    class="checkout__empty-icon"
                    size="xxlarge"
                  />
                  <h2 class="checkout__empty-headline">
                    {{ $t('cart.emptyMessage') }}
                  </h2>
                  <Button
                    :href="localePath('shop-categories')"
                    :label="$t('cart.showAllProducts')"
                    class="checkout__button"
                    variant="primary"
                    icon="arrow_forward"
                  />
                </div>
              </template>
            </LoadingSpinner>
          </ContentWrapper>
        </template>
      </Page>
    </template>
  </CmsQuery>
</template>

<script>
import {
  defineComponent,
  useRoute,
  useContext,
  computed,
  onMounted,
  onBeforeMount,
  ref,
  useRouter,
} from '@nuxtjs/composition-api'

import { useCartStore } from '~/stores/cart'
import { useOrdersStore } from '~/stores/orders'
import { useUserStore } from '~/stores/user'
import { useDatasourcesStore } from '~/stores/datasources'
import { usePageStore, CMS_PAGE } from '~/stores/page'
import { useOciStore } from '~/stores/oci'
import { storeToRefs } from 'pinia'

import useStoryblokSlugBuilder from '~/composables/useStoryblokSlugBuilder'
import { useLogger } from '~/composables/useLogger'
import { useToast } from '~/composables/useToast'

import Page from '~/components/templates/Page/Page'
import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper'
import ResultHeadline from '~/components/molecules/ResultHeadline/ResultHeadline'
import Button from '~/components/atoms/Button/Button'
import PriceInformation from '~/components/molecules/PriceInformation/PriceInformation'
import TotalNetInformation from '~/components/molecules/TotalNetInformation/TotalNetInformation'
import CartTable from '~/components/molecules/CartTable/CartTable'
import Icon from '~/components/atoms/Icon/Icon'
import AddressCard from '~/components/molecules/AddressCard/AddressCard'
import LoadingSpinner from '~/components/atoms/LoadingSpinner/LoadingSpinner'
import PromotionLabel from '~/components/atoms/PromotionLabel/PromotionLabel'
import PvTextArea from '~/components/atoms/FormComponents/PvTextArea/PvTextArea'
import PvInput from '@/components/atoms/FormComponents/PvInput/PvInput'
import Confirmation from '@/components/organisms/Confirmation/Confirmation'

export default defineComponent({
  name: 'Checkout',
  components: {
    Page,
    ContentWrapper,
    ResultHeadline,
    Button,
    PriceInformation,
    TotalNetInformation,
    CartTable,
    Icon,
    AddressCard,
    LoadingSpinner,
    PromotionLabel,
    PvTextArea,
    PvInput,
    Confirmation,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const context = useContext()
    const { app, i18n } = useContext()
    const isMobile = app.$breakpoints.isMobile
    const { logger } = useLogger('checkout')
    const toast = useToast()
    const ociStore = useOciStore()
    const { savelyEncodedHookUrl, returnTarget } = storeToRefs(ociStore)

    const datasourcesStore = useDatasourcesStore()
    const { personalPrivacyLink } = storeToRefs(datasourcesStore)

    const ordersStore = useOrdersStore()
    const cartStore = useCartStore()
    const { currentCart, loading: cartLoading } = storeToRefs(cartStore)
    const userStore = useUserStore()
    const { billingAddress, isLoggedIn, isApprovedUser, isOciUser } =
      storeToRefs(userStore)
    const cartEntries = computed(() => currentCart.value?.entries)
    const deliveryAddress = computed(() => currentCart.value?.deliveryAddress)

    const cartPromotions = computed(() => {
      return currentCart.value?.appliedOrderPromotions || []
    })

    // when entering the page loading state is already active until mounted is done
    const loading = ref(true)

    // additional input text fields for user
    const asyncRequests = ref([])
    const customerReference = ref(currentCart.value?.customerReference || '')
    const commentOnRequest = ref(currentCart.value?.comment || '')

    const saveCustomerReference = async () => {
      const updateNeeded =
        currentCart.value?.customerReference !== customerReference.value
      if (!updateNeeded) return
      try {
        const result = cartStore.setReferenceNumber(customerReference.value)
        asyncRequests.value = [...asyncRequests.value, result]
        await result
      } catch (error) {
        toast.error({
          description: i18n.t('checkout.errorSettingReference'),
        })
      }
    }

    const saveCommentOnRequest = async () => {
      const updateNeeded = currentCart.value?.comment !== commentOnRequest.value
      if (!updateNeeded) return
      try {
        const result = cartStore.setRequestComment(commentOnRequest.value)
        asyncRequests.value = [...asyncRequests.value, result]
        await result
      } catch (error) {
        toast.error({
          description: i18n.t('checkout.errorSettingComment'),
        })
      }
    }

    onBeforeMount(() => {
      // we need a logged in approved user to do checkout. If we have none redirect to cart
      // cart page will display information to user to log in or add company data
      // technically this should be in a middleware. But we cannot use store in middlewares before we use nuxt 3
      if (!isLoggedIn.value || !isApprovedUser.value) {
        // [80/20] in PVAC the sso login is called in  this page here.
        // this has the advantage that the user will be redirected to /shop/checkout again after login
        // but right now the redirection after login causes weird redirection issues and user will be on a broken sso page in the end
        // to safe time we do login on cart page now. Redirection to this page causes no issues. But user needs to click "checkout button" again
        return router.replace({
          path: app.localePath('shop-cart'),
        })
      }

      // trigger fetch for privacy page link. But no need to wait for it here
      datasourcesStore.loadLinksFromDatasource()
      // trigger fetch for billing address to be sure its here for the card
      userStore.loadBillingAddress()
    })

    onMounted(async () => {
      try {
        // When entering the checkout page we want to set delivery address from user as delivery address for cart
        // load all availables addresses
        const sortedAddresses = await userStore.loadDeliveryAddresses()

        if (!sortedAddresses) {
          throw 'error loading addresses'
        }

        if (sortedAddresses?.length) {
          await cartStore.setDeliveryAddress(sortedAddresses[0])
          logger.trace(
            `Successfully set [${
              sortedAddresses[0].defaultShippingAddress
                ? 'default'
                : 'first found'
            } delivery address] as cart delivery address.`
          )
        } else {
          // for OCI users we have silent errors because deliveryAddress is not required
          if (!isOciUser.value) {
            toast.warning({
              description: i18n.t('checkout.deliveryAddressMissing'),
            })
          }
          throw 'no delivery address found'
        }
      } catch (error) {
        logger.error('could not set delivery address.', error)
        // for OCI users we have silent errors because deliveryAddress is not required
        if (!isOciUser.value) {
          toast.error({
            description: i18n.t('checkout.setDeliveryAddressError'),
          })
        }
      } finally {
        loading.value = false
      }
    })

    const placedOrder = ref(null)

    const placeOrder = async () => {
      loading.value = true

      try {
        // first wait for all promises to be resolved which may be still running (set comment or reference)
        await Promise.allSettled(asyncRequests.value)

        if (isOciUser.value) {
          if (savelyEncodedHookUrl.value && returnTarget.value) {
            // OCI specific placeOrder
            const ociPunchoutFormContent = await ordersStore.placeOciOrder()

            // generate a form which is submitted with oci specific parameters
            const form = document.createElement('form')
            form.setAttribute('method', 'post')
            form.setAttribute('action', savelyEncodedHookUrl.value)
            form.setAttribute('target', returnTarget.value)
            form.innerHTML = ociPunchoutFormContent
            document.body.appendChild(form)
            form.submit()
          } else {
            throw 'OCI checkout error: no hookURL or returnTarget defined'
          }
        } else {
          // placing a regular order in a non-OCI context
          const orderRequestResult = await ordersStore.placeOrder()

          // request was successful but something went wrong
          if (!orderRequestResult || orderRequestResult?.error) {
            throw orderRequestResult?.error || 'unexpected error'
          }

          // successful order response
          placedOrder.value = orderRequestResult
        }
      } catch (error) {
        logger.error('error placing order', error)
        toast.error({
          description: i18n.t('checkout.orderNotSuccessful'),
        })
      } finally {
        window.scrollTo(0, 0)
        loading.value = false
      }
    }

    /**
     * build the cms slug
     */
    const { buildSlugs } = useStoryblokSlugBuilder({ root: context })
    const slugs = computed(() => {
      return buildSlugs(route.value.path)
    })

    const pageStore = usePageStore()
    pageStore.setPageType(CMS_PAGE)

    return {
      personalPrivacyLink,

      customerReference,
      commentOnRequest,
      saveCommentOnRequest,
      saveCustomerReference,

      loading,
      cartLoading,
      cartEntries,
      slugs,
      isMobile,
      currentCart,
      isOciUser,
      billingAddress,
      deliveryAddress,
      cartPromotions,
      placedOrder,
      placeOrder,
    }
  },
})
</script>

<style lang="scss">
.checkout {
  @apply tw-pt-6;

  &__text-fields,
  &__addresses {
    @apply tw-flex;
    @apply tw-flex-col;
    @apply tw-gap-5;
    @apply tw-mb-6;

    @screen md {
      @apply tw-flex-row;
    }
  }

  &__privacy-policy {
    @apply tw-mb-4;
  }

  &__text-field-item,
  &__address-item {
    @apply tw-flex-1;
  }

  &__textarea {
    textarea {
      @apply tw-h-12;
    }
  }

  &__check-details {
    @apply tw-text-lg;
    @apply tw-mb-10;
  }

  &__article-list-heading {
    @apply tw-text-2xl;
    @apply tw-mt-6 tw-mb-4;
  }

  &__confirmation {
    @apply tw-mx-auto;
    @apply tw-my-8;
  }

  &__empty {
    @apply tw-text-center;
    @apply tw-pb-12;
    @apply tw-pt-4;

    &-icon {
      @apply tw-text-pv-red;
    }

    &-headline {
      @apply tw-mb-4;
    }
  }

  &__header {
    @screen md {
      @apply tw-flex tw-justify-between;
    }

    .result-headline__headline {
      @screen lg {
        @apply tw-text-4xl;
      }
    }
  }

  &__buttons {
    @apply tw-flex;
    @apply tw-pb-8;
  }

  &__submit {
    @apply tw-flex;
    @apply tw-flex-col;
    @apply tw-gap-6;

    @screen md {
      @apply tw-flex-row;
    }
  }

  &__button {
    &--submit {
      @screen md {
        @apply tw-w-full;
      }
    }

    &--save {
      @screen md {
        @apply tw-mr-8;
      }
    }

    &--back {
      @apply tw-text-pv-red;
      @apply tw-place-self-center;
    }
  }

  &__info {
    @apply tw-my-6;

    @screen md {
      @apply tw-flex tw-justify-between;
      @apply tw-gap-6;
    }

    &--oci {
      @apply tw-justify-end;
    }
  }

  &__information,
  &__actions {
    @screen md {
      @apply tw-flex-1;
    }
  }

  &__information {
    @apply tw-gap-5;
    @apply tw-flex;
    @apply tw-flex-col;

    @screen md {
      @apply tw-text-sm;
    }

    @screen xl {
      max-width: 789px;
    }
  }

  &__actions {
    @screen xl {
      max-width: 437px;
    }
  }

  &__total {
    @apply tw-my-6;

    @screen md {
      @apply tw-mb-8 tw-mt-0;
    }

    .price__total {
      @apply tw-text-lg;
    }

    .price {
      @apply tw-py-4;
    }
  }

  &__back-button {
    @apply tw-text-center;

    @screen md {
      @apply tw-text-left;
    }
  }
}
</style>
