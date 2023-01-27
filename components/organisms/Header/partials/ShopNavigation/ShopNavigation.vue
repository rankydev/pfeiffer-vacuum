<template>
  <div class="shop-navigation">
    <client-only>
      <Popup>
        <template #activator="{ togglePopup }">
          <LoadingSpinner :show="userStore.isLoginProcess">
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
              v-if="userStore.isLoggedIn || userStore.isLoginProcess"
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
      class="shop-navigation__shopping-cart"
    >
      <Icon class="shop-navigation__icon" icon="shopping_cart" />
    </Link>
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

import Icon from '~/components/atoms/Icon/Icon.vue'
import Link from '~/components/atoms/Link/Link.vue'
import Button from '~/components/atoms/Button/Button.vue'
import LoadingSpinner from '~/components/atoms/LoadingSpinner/LoadingSpinner.vue'
import MyAccountNavigation from '~/components/organisms/MyAccount/partials/MyAccountNavigation/MyAccountNavigation.vue'
import Popup from '~/components/atoms/Popup/Popup.vue'

export default defineComponent({
  components: {
    Icon,
    Link,
    Button,
    LoadingSpinner,
    MyAccountNavigation,
    Popup,
  },
  setup() {
    const router = useRouter()
    const { i18n, app } = useContext()
    const userStore = useUserStore()
    const isMobile = app.$breakpoints.isMobile

    const myAccountLabel = computed(() => {
      if (userStore.isLoginProcess || isMobile.value) return ''

      return userStore.isLoggedIn
        ? userStore.currentUser?.name
        : i18n.t('navigation.button.signIn.label')
    })

    const handleMyAccount = (openPopupCallback) => {
      if (userStore.isLoggedIn) {
        if (isMobile.value) {
          router.push({
            path: app.localePath('shop-my-account'),
          })
        } else {
          openPopupCallback()
        }
      } else {
        userStore.login()
      }
    }

    return {
      logout: userStore.logout,
      handleMyAccount,
      myAccountLabel,
      userStore,
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
    @apply tw-ml-0;

    @screen md {
      @apply tw-ml-4;
    }

    @screen lg {
      @apply tw-ml-6;
    }
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
</style>
