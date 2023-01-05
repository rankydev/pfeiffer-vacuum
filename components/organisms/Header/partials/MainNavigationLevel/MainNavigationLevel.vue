<template>
  <div :class="`${prefix}__wrapper`">
    <ul
      ref="menu"
      :class="{
        [prefix]: true,
        [`${prefix}--passive`]: hasActiveElement,
      }"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <li
        v-for="(entry, idx) in navigationEntries"
        :key="idx"
        :class="{
          [`${prefix}__element`]: true,
          ['md:tw-hidden']: entry.component === 'MainNavLinkMobile',
        }"
      >
        <Link
          :class="{
            [`${prefix}__link`]: true,
            [`${prefix}__link--passive`]: ![null, idx].includes(activeElement),
            [`${prefix}__link--active`]:
              activeElement === idx ||
              (prefix === 'primary-nav-0' && selectedPrimaryLink === idx),
          }"
          v-bind="entry"
          :before-navigation="
            () => (!hasSubmenu(entry) ? closeMenu() || true : toggleActive(idx))
          "
        >
          <span :class="`${prefix}__label`">{{ entry.label }}</span>
          <client-only>
            <Icon
              v-if="isMobile && hasSubmenu(entry)"
              :class="`${prefix}__icon`"
              :icon="activeElement === idx ? 'expand_less' : 'expand_more'"
            />
          </client-only>
        </Link>
        <client-only>
          <Component
            :is="isMobile || level === 0 ? 'AnimatedCollapse' : 'div'"
            v-if="hasSubmenu(entry)"
            speed="medium"
          >
            <MainNavigationLevel
              v-if="activeElement === idx"
              :current-entry="entry"
              :level="level + 1"
              :navigation-entries="entry.navigationEntries"
              @mouseenter.native="isHovered = false"
              @mouseleave.native="isHovered = true"
            />
          </Component>
        </client-only>
      </li>

      <template v-if="level > 0 && isMobile && !hasActiveElement">
        <li>
          <Link
            :href="currentEntry.href"
            :class="[`${prefix}__link`]"
            @click.native="closeMenu"
          >
            <span :class="`${prefix}__label`">{{
              $t('navigation.button.articleOverview.label') +
              ' ' +
              currentEntry.label
            }}</span>
            <Icon :class="`${prefix}__icon`" icon="arrow_forward" />
          </Link>
        </li>

        <li
          v-if="currentEntry.shopLink"
          :class="`${prefix}__shop-button--mobile`"
        >
          <Button
            size="small"
            :label="$t('navigation.button.shop.label')"
            :href="currentEntry.shopLink"
            @click.native="closeMenu"
          />
        </li>
      </template>

      <template v-if="level > 0 && !isMobile">
        <li
          v-if="
            (isTablet && !hasActiveElement) ||
            (isDesktop &&
              (isHovered || (!hasActiveElement && !$parent.isHovered)))
          "
          :class="`${prefix}__buttons`"
        >
          <Button
            variant="secondary"
            shape="outlined"
            size="small"
            :label="$t('navigation.button.overview.label')"
            :href="currentEntry.href"
            @click.native="closeMenu"
          />

          <Button
            v-if="currentEntry.shopLink"
            size="small"
            :label="$t('navigation.button.shop.label')"
            :href="currentEntry.shopLink"
            @click.native="closeMenu"
          />
        </li>
      </template>

      <li v-if="level === 0 && isMobile">
        <Link
          v-for="item in flyoutLinks"
          :key="item._uid"
          v-bind="item"
          :class="[`${prefix}__flyout-entry`, `${prefix}__link`]"
        >
          <Icon :icon="item.icon" />
          <span>{{ item.label }}</span>
        </Link>
        <div
          v-if="userStore.isLoggedIn || userStore.isLoginProcess"
          :class="[`${prefix}__flyout-entry`, `${prefix}__link`]"
        >
          <Icon icon="person" />
          <span>{{ myAccountLabel }}</span>
        </div>
      </li>

      <li
        v-if="level === 0 && isMobile"
        :class="`${prefix}__login-button-wrapper`"
      >
        <Button
          v-if="userStore.isLoggedIn || userStore.isLoginProcess"
          variant="secondary"
          shape="outlined"
          icon="logout"
          :label="$t('navigation.button.logout.mobileLabel')"
          :class="`${prefix}__login-button`"
          @click="logout"
        />
        <Button
          v-else
          variant="secondary"
          shape="outlined"
          icon="person"
          :label="myAccountLabel"
          :class="`${prefix}__login-button`"
          @click="
            handleMyAccount()
            closeMenu
          "
        />
      </li>
    </ul>
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  useContext,
  useRoute,
  computed,
  watch,
  toRefs,
} from '@nuxtjs/composition-api'

import Link from '~/components/atoms/Link/Link.vue'
import Icon from '~/components/atoms/Icon/Icon.vue'
import AnimatedCollapse from '~/components/atoms/AnimatedCollapse/AnimatedCollapse.vue'
import Button from '~/components/atoms/Button/Button.vue'
import LoadingSpinner from '~/components/atoms/LoadingSpinner/LoadingSpinner.vue'

import { useMenuStore } from '~/stores/menu'
import { useUserStore } from '~/stores/user'

export default defineComponent({
  name: 'MainNavigationLevel',
  components: {
    Icon,
    Link,
    AnimatedCollapse,
    Button,
    LoadingSpinner,
  },
  props: {
    currentEntry: {
      type: Object,
      default: () => ({}),
    },
    navigationEntries: {
      type: Array,
      default: /* istanbul ignore next */ () => [],
    },
    level: {
      type: Number,
      default: 0,
    },
    /**
     * A list of flyout links for the top navigation
     */
    flyoutLinks: {
      type: Array,
      default: /* istanbul ignore next */ () => [],
    },
  },
  setup(props, { refs }) {
    const { app } = useContext()

    const menu = useMenuStore()

    const prefix = computed(() => `primary-nav-${props.level}`)

    const activeElement = ref(null)
    const hasActiveElement = computed(() => activeElement.value !== null)
    const isMobile = app.$breakpoints.isMobile
    const isTablet = app.$breakpoints.isTablet
    const isDesktop = app.$breakpoints.isDesktop
    const isHovered = ref(false)

    const route = useRoute()
    const { navigationEntries } = toRefs(props)
    const selectedPrimaryLink = computed(() => {
      for (const [idx, entry] of navigationEntries.value.entries()) {
        const splittedHref = entry?.href.split('/')
        const path = route.value.path
        // Check if the route contains the first and second part of an entry(like f.ex. 'en' and 'products')
        // this logic is relevant for subentries
        if (path.includes(splittedHref[1]) && path.includes(splittedHref[2])) {
          return idx
        }
      }
      return null
    })

    watch(menu.isActive, (isActive) => {
      if (!isActive) activeElement.value = null
    })

    const toggleActive = function (idx) {
      if (props.level >= 2) return false

      if (activeElement.value === idx) {
        if (!isMobile.value && props.level === 0) menu.close('toggle')
        activeElement.value = null
      } else {
        if (!isMobile.value && props.level === 0) menu.open(refs.menu)
        activeElement.value = idx
      }

      return false
    }

    const closeMenu = () => {
      activeElement.value = null
      menu.close('close')
    }

    const hasSubmenu = (entry) => entry?.navigationEntries?.length > 0

    const userStore = useUserStore()
    const { i18n } = useContext()

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
      prefix,
      toggleActive,
      hasActiveElement,
      activeElement,
      isMobile,
      isTablet,
      isDesktop,
      isHovered,
      hasSubmenu,
      selectedPrimaryLink,
      closeMenu,
      myAccountLabel,
      userStore,
      handleMyAccount,
      logout: userStore.logout,
    }
  },
})
</script>

<style lang="scss">
@import './styles/MainNavLinkPrimary';
@import './styles/MainNavLinkSecondary';
</style>
