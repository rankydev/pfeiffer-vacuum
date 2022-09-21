<template>
  <div class="shop-navigation">
    <Button
      shape="plain"
      variant="secondary"
      class="shop-navigation__account"
      :label="myAccountLabel"
      icon="person"
      :prepend-icon="true"
      @click="handleMyAccount()"
    />

    <Button
      v-if="loggedIn"
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
import { useAuthStore } from '~/stores/auth'

import Icon from '~/components/atoms/Icon/Icon.vue'
import Link from '~/components/atoms/Link/Link.vue'
import Button from '~/components/atoms/Button/Button.vue'

export default defineComponent({
  components: {
    Icon,
    Link,
    Button,
  },
  setup() {
    const { i18n } = useContext()

    const authStore = useAuthStore()
    const currentUser = computed(() => authStore.currentUser)
    const loggedIn = computed(() => authStore.loggedIn)

    const myAccountLabel = computed(() =>
      loggedIn.value
        ? currentUser.value?.name
        : i18n.t('navigation.button.signIn.label')
    )

    const handleMyAccount = () => {
      if (loggedIn.value) return

      if (!loggedIn.value) return authStore.login()
    }

    return {
      logout: authStore.logout,
      currentUser,
      handleMyAccount,
      myAccountLabel,
      loggedIn,
    }
  },
})
</script>

<style lang="scss">
.shop-navigation {
  @apply tw-flex;
  @apply tw-items-center;

  @screen lg {
    @apply tw-pb-8;
  }

  &__account {
    @apply tw-hidden;

    @screen md {
      @apply tw-flex;
    }

    .button__icon--prepend {
      @apply tw-mr-2;
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
}
</style>
