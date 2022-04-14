<template>
  <div :class="`primary-nav-${level}__wrapper`">
    <ul
      :class="{
        [`primary-nav-${level}`]: true,
        [`primary-nav-${level}--passive`]: hasActiveElement,
      }"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <li
        v-for="(entry, idx) in navigationEntries"
        :key="idx"
        :class="{
          [`primary-nav-${level}__element`]: true,
          ['md:tw-hidden']: entry.component === 'MainNavLinkMobile',
        }"
      >
        <Link
          :class="{
            [`primary-nav-${level}__link`]: true,
            [`primary-nav-${level}__link--passive`]: ![null, idx].includes(
              activeElement
            ),
            [`primary-nav-${level}__link--active`]: activeElement === idx,
          }"
          v-bind="entry"
          :before-navigation="
            ($e) => !hasSubmenu(entry) || toggleActive($e, idx)
          "
        >
          <span :class="`primary-nav-${level}__label`">{{ entry.label }}</span>
          <Icon
            v-if="hasSubmenu(entry)"
            :class="`primary-nav-${level}__icon`"
            :icon="activeElement === idx ? 'expand_less' : 'expand_more'"
            @click.native="toggleActive($event, idx)"
            @keypress.native.enter="toggleActive($event, idx)"
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

      <template v-if="level > 0">
        <li v-if="isMobile && !hasActiveElement">
          <Link
            :href="currentEntry.href || ''"
            :class="[`primary-nav-${level}__link`]"
          >
            <span :class="`primary-nav-${level}__label`">All Products</span>
            <Icon :class="`primary-nav-${level}__icon`" icon="arrow_forward" />
          </Link>
        </li>

        <li
          v-if="
            isMobile
              ? !hasActiveElement && currentEntry.shopLink
              : isHovered || (!hasActiveElement && !$parent.isHovered)
          "
          :class="`primary-nav-${level}__buttons`"
        >
          <Button
            v-if="!isMobile"
            class="tw-hidden md:tw-block"
            variant="secondary"
            shape="outlined"
            size="small"
            label="Overview"
            :href="currentEntry.href"
          />
          <Button
            v-if="currentEntry.shopLink"
            size="small"
            label="Shop"
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
  computed,
  watch,
} from '@nuxtjs/composition-api'

import Link from '~/components/atoms/Link/Link.vue'
import Icon from '~/components/atoms/Icon/Icon.vue'
import AnimatedCollapse from '~/components/atoms/AnimatedCollapse/AnimatedCollapse.vue'
import { useMenuStore } from '~/stores/menu'

export default defineComponent({
  name: 'MainNavigationLevel',
  components: {
    Icon,
    Link,
    AnimatedCollapse,
  },
  props: {
    currentEntry: {
      type: Object,
      default: () => {},
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

    const activeElement = ref(null)
    const hasActiveElement = computed(() => activeElement.value !== null)
    const isMobile = app.$breakpoints.isMobile
    const isHovered = ref(false)

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
      toggleActive,
      hasActiveElement,
      activeElement,
      isMobile,
      isHovered,
      hasSubmenu,
    }
  },
})
</script>

<style lang="scss">
@import './styles/MainNavLinkPrimary';
@import './styles/MainNavLinkSecondary';
</style>
