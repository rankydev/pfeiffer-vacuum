<template>
  <div :class="`${prefix}__wrapper`">
    <ul
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
            ($event) =>
              !hasSubmenu(entry)
                ? (activeElement = null) && true
                : toggleActive($event, idx)
          "
        >
          <span :class="`${prefix}__label`">{{ entry.label }}</span>
          <Icon
            v-if="hasSubmenu(entry)"
            :class="`${prefix}__icon`"
            :icon="activeElement === idx ? 'expand_less' : 'expand_more'"
          />
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
          <Link :href="currentEntry.href" :class="[`${prefix}__link`]">
            <span :class="`${prefix}__label`">All Products</span>
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
          />

          <Button
            v-if="currentEntry.shopLink"
            size="small"
            :label="$t('navigation.button.shop.label')"
            :href="currentEntry.shopLink"
          />
        </li>
      </template>
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
import { useMenuStore } from '~/stores/menu'

export default defineComponent({
  name: 'MainNavigationLevel',
  components: {
    Icon,
    Link,
    AnimatedCollapse,
    Button,
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
  },
  setup(props) {
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

    const toggleActive = function ($event, idx) {
      $event.preventDefault()
      $event.stopPropagation()

      if (props.level >= 2) return false

      if (activeElement.value === idx) {
        if (!isMobile.value && props.level === 0) menu.close()
        activeElement.value = null
      } else {
        if (!isMobile.value && props.level === 0) menu.open()
        activeElement.value = idx
      }

      return false
    }

    const hasSubmenu = (entry) => entry?.navigationEntries?.length > 0

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
    }
  },
})
</script>

<style lang="scss">
@import './styles/MainNavLinkPrimary';
@import './styles/MainNavLinkSecondary';
</style>
