<template>
  <div class="shop-navigation">
    <Popup>
      <template #activator="{ togglePopup }">
        <LoadingSpinner :show="userStore.isLoginProcess || !myAccountLabel">
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
          <MyAccountSidebar
            class="shop-navigation__myaccount-popup"
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

    <Button
      v-if="userStore.isLoggedIn || userStore.isLoginProcess"
      shape="plain"
      variant="secondary"
      class="shop-navigation__logout"
      icon="logout"
      @click="logout"
    />
    <Link href="#" class="shop-navigation__shopping-list">
      <Icon class="shop-navigation__icon" icon="assignment" />
    </Link>

    <Link href="#" class="shop-navigation__shopping-cart">
      <Icon class="shop-navigation__icon" icon="shopping_cart" />
    </Link>
  </div>
</template>

<script>
import { computed, defineComponent, useContext } from '@nuxtjs/composition-api'
import { useUserStore } from '~/stores/user'

import Icon from '~/components/atoms/Icon/Icon.vue'
import Link from '~/components/atoms/Link/Link.vue'
import Button from '~/components/atoms/Button/Button.vue'
import LoadingSpinner from '~/components/atoms/LoadingSpinner/LoadingSpinner.vue'
import MyAccountSidebar from '~/components/organisms/MyAccount/sidebar/MyAccountSidebar'

export default defineComponent({
  components: {
    Icon,
    Link,
    Button,
    LoadingSpinner,
    MyAccountSidebar,
  },
  setup() {
    const { i18n } = useContext()
    const userStore = useUserStore()

    const myAccountLabel = computed(() => {
      if (userStore.isLoginProcess) return ''

      return userStore.isLoggedIn
        ? userStore.currentUser?.name
        : i18n.t('navigation.button.signIn.label')
    })

    const handleMyAccount = (openPopupCallback) => {
      if (userStore.isLoggedIn) {
        openPopupCallback()
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
    @apply tw-hidden;
    @apply tw--my-2;

    @screen md {
      @apply tw-flex;
    }
  }

  &__logout {
    @apply tw-hidden;

    @screen md {
      @apply tw-flex;
      padding-right: 0 !important;
    }
  }

  &__account-name {
    @apply tw-hidden;
    @apply tw-ml-2;
    @apply tw-font-bold;
    @apply tw-leading-6;
    @apply tw-whitespace-nowrap;

    @screen lg {
      @apply tw-block;
    }
  }

  &__comparhension {
    @apply tw-hidden;

    @screen md {
      @apply tw-block;
    }
  }

  &__icon {
    @apply tw-block;
  }

  &__comparhension,
  &__shopping-list,
  &__shopping-cart {
    @apply tw-ml-3;

    @screen md {
      @apply tw-ml-4;
    }

    @screen lg {
      @apply tw-ml-6;
    }
  }

  &__account,
  &__comparhension,
  &__shopping-list,
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
