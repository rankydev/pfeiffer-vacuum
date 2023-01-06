<template>
  <div class="shop-navigation">
    <LoadingSpinner
      class="shop-navigation__account-wrapper"
      :show="userStore.isLoginProcess || !myAccountLabel"
    >
      <Button
        shape="plain"
        variant="secondary"
        class="shop-navigation__account"
        :label="myAccountLabel"
        icon="person"
        :prepend-icon="true"
        gap="narrow"
        @click="handleMyAccount()"
      />
    </LoadingSpinner>

    <Button
      v-if="userStore.isLoggedIn || userStore.isLoginProcess"
      shape="plain"
      variant="secondary"
      class="shop-navigation__logout"
      icon="logout"
      @click="logout"
    />

    <!-- TODO: Insert correct link when MyAccount area is ready -->
    <Link
      v-if="userStore.isLoggedIn || userStore.isLoginProcess"
      href="#"
      class="shop-navigation__account-icon"
    >
      <Icon class="shop-navigation__icon" icon="person" />
    </Link>
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

export default defineComponent({
  components: {
    Icon,
    Link,
    Button,
    LoadingSpinner,
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

    const handleMyAccount = () => {
      if (userStore.isLoggedIn) return

      userStore.login()
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

  &__account-wrapper {
    @apply tw-hidden;

    @screen md {
      @apply tw-block;
    }
  }

  &__account-icon {
    @apply tw-block;

    @screen md {
      @apply tw-hidden;
    }
  }

  &__account {
    @apply tw--my-2;
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
  &__shopping-cart,
  &__account-icon {
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
  &__shopping-cart,
  &__account-icon {
    @apply tw-text-pv-red;
    @apply tw-transition-colors;
    @apply tw-ease-in-out;
    @apply tw-duration-200;

    &:hover {
      @apply tw-text-pv-red-lighter;
    }
  }
}
</style>
