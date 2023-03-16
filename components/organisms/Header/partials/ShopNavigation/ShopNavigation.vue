<template>
  <div class="shop-navigation">
    <client-only>
      <Popup v-if="!isOciUser">
        <template #activator="{ togglePopup }">
          <LoadingSpinner :show="isLoginProcess">
            <Button
              shape="plain"
              variant="secondary"
              class="shop-navigation__account"
              :label="myAccountLabel"
              icon="person"
              :prepend-icon="true"
              gap="narrow"
              @click="handleMyAccount(togglePopup)"
            />
          </LoadingSpinner>
        </template>

        <template #default="{ closePopup }">
          <div>
            <MyAccountNavigation
              class="shop-navigation__myaccount-popup"
              variant="flyout"
              @entry-clicked="closePopup"
            />
            <Button
              v-if="isLoggedIn || isLoginProcess"
              shape="outlined"
              variant="secondary"
              class="shop-navigation__popup-logout"
              icon="logout"
              label="Logout"
              @click="closePopup(), logout()"
            />
          </div>
        </template>
      </Popup>
    </client-only>

    <Link
      :href="localePath('shop-cart')"
      class="shop-navigation__shopping-cart tw-flex"
    >
      <Icon class="shop-navigation__icon" icon="shopping_cart" />
      <span
        v-if="cartItemCount"
        class="shop-navigation__shopping-cart-count-indicator"
      >
        {{ cartItemCount }}
      </span>
    </Link>

    <CartOverlay />
    <ShoppingListOverlay />
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  useContext,
  useRouter,
} from '@nuxtjs/composition-api'
import { useUserStore } from '~/stores/user'
import { useCartStore } from '~/stores/cart'

import Icon from '~/components/atoms/Icon/Icon.vue'
import Link from '~/components/atoms/Link/Link.vue'
import Button from '~/components/atoms/Button/Button.vue'
import LoadingSpinner from '~/components/atoms/LoadingSpinner/LoadingSpinner.vue'
import MyAccountNavigation from '~/components/organisms/MyAccount/partials/MyAccountNavigation/MyAccountNavigation.vue'
import CartOverlay from '~/components/molecules/CartOverlay/CartOverlay.vue'
import Popup from '~/components/atoms/Popup/Popup.vue'
import { storeToRefs } from 'pinia'
import ShoppingListOverlay from '~/components/molecules/ShoppingListOverlay/ShoppingListOverlay.vue'

export default defineComponent({
  components: {
    Icon,
    Link,
    Button,
    LoadingSpinner,
    MyAccountNavigation,
    Popup,
    CartOverlay,
    ShoppingListOverlay,
  },
  setup() {
    const router = useRouter()
    const { i18n, app } = useContext()
    const userStore = useUserStore()
    const { isOciUser, isLoggedIn, isLoginProcess, currentUser } =
      storeToRefs(userStore)
    const { login } = userStore
    const cartStore = useCartStore()

    const { currentCart } = storeToRefs(cartStore)
    const isMobile = app.$breakpoints.isMobile

    const myAccountLabel = computed(() => {
      if (isLoginProcess.value || isMobile.value) return ''

      return isLoggedIn.value
        ? currentUser.value?.name
        : i18n.t('navigation.button.signIn.label')
    })

    const cartItemCount = computed(() => currentCart.value?.totalItems || '')

    const handleMyAccount = (openPopupCallback) => {
      if (isLoggedIn.value) {
        if (isMobile.value) {
          router.push({
            path: app.localePath('shop-my-account'),
          })
        } else {
          openPopupCallback()
        }
      } else {
        login()
      }
    }

    return {
      // getters
      isOciUser,

      // actions
      myAccountLabel,
      userStore,
      currentCart,
      isLoggedIn,
      isLoginProcess,
      cartItemCount,

      logout: userStore.logout,
      handleMyAccount,
    }
  },
})
</script>

<style lang="scss">
.shop-navigation {
  @apply tw-flex;
  @apply tw-items-center;

  @screen lg {
    @apply tw-pb-6;
  }

  &__account {
    @apply tw--my-2;
  }

  &__account-icon {
    @apply tw-block;

    @screen md {
      @apply tw-hidden;
    }
  }

  &__logout {
    @apply tw-hidden;

    @screen md {
      @apply tw-flex;
      padding-right: 0 !important;
    }
  }

  &__icon {
    @apply tw-block;
  }

  &__shopping-cart {
    @apply tw-cursor-pointer;

    @apply tw-ml-0;

    @screen md {
      @apply tw-ml-4;
    }

    @screen lg {
      @apply tw-ml-6;
    }
  }

  &__shopping-cart-count-indicator {
    @apply tw-bg-pv-yellow;
    @apply tw-text-pv-grey-16;
    @apply tw-inline-block;
    @apply tw-relative;
    @apply tw-w-6;
    @apply tw-h-6;
    @apply tw-border-2;
    @apply tw-rounded-xl;
    @apply tw-p-0;
    @apply tw-text-xs;
    @apply tw-leading-5;
    @apply tw-font-bold;
    @apply tw-text-center;
    top: -16px;
    left: -12px;
    border-color: transparent;
  }

  &__account,
  &__shopping-cart {
    @apply tw-text-pv-red;
    @apply tw-transition-colors;
    @apply tw-ease-in-out;
    @apply tw-duration-200;

    &:hover {
      @apply tw-text-pv-red-lighter;
    }
  }

  &__myaccount-popup {
    min-width: 200px;
  }

  &__popup-logout {
    @apply tw-w-full;
    @apply tw-my-4 tw-mx-4;
    @apply tw-box-border;
    width: calc(100% - 2rem);
  }
}

.popup__content {
  @screen md {
    left: unset !important;
  }
}
</style>
