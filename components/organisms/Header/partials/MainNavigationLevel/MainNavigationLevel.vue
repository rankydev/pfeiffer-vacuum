<template>
  <ul
    :class="{
      [`primary-nav-${level}`]: true,
      [`primary-nav-${level}--passive`]: activeElement !== null,
    }"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <li
      v-for="(entry, idx) in enrichedEntries"
      :key="idx"
      :class="[`primary-nav-${level}__element`, entry.class || '']"
    >
      <Link
        :class="{
          [`primary-nav-${level}__link`]: true,
          [`primary-nav-${level}__link--inactive`]: ![null, idx].includes(
            activeElement
          ),
          [`primary-nav-${level}__link--active`]: activeElement === idx,
        }"
        v-bind="entry"
        :before-navigation="($event) => toggleActive($event, idx)"
      >
        <span :class="`primary-nav-${level}__label`">{{ entry.label }}</span>
        <Icon
          v-if="(entry.navigationEntries || []).length > 0"
          :class="`primary-nav-${level}__icon`"
          :icon="activeElement === idx ? 'expand_less' : 'expand_more'"
          @click.native="toggleActive($event, idx)"
          @keypress.native.enter="toggleActive($event, idx)"
        />
      </Link>
      <Component
        :is="level === 0 ? 'AnimatedCollapse' : 'div'"
        v-if="(entry.navigationEntries || []).length > 0"
        speed="fast"
      >
        <div
          v-if="activeElement === idx"
          :class="`primary-nav-${level}__sub-nav`"
          @mouseenter="isHovered = false"
          @mouseleave="isHovered = true"
        >
          <MainNavigationLevel
            :current-entry="entry"
            :level="level + 1"
            :navigation-entries="entry.navigationEntries"
            @show-buttons="(value) => (showButtons = value)"
          />
        </div>
      </Component>
    </li>
    <template v-if="level > 0">
      <li v-if="isMobile && activeElement == null">
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
            ? activeElement == null
            : isHovered || (activeElement == null && !$parent.isHovered)
        "
        :class="{
          [`primary-nav-${level}__buttons`]: true,
        }"
      >
        <Button
          v-if="!isMobile"
          class="tw-hidden md:tw-block"
          variant="secondary"
          shape="outlined"
          size="small"
          label="Übersicht"
          :href="currentEntry.href"
        />
        <Button size="small" label="Shop" :href="currentEntry.shopLink" />
      </li>
    </template>
  </ul>
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
  setup(props, { root }) {
    const { app } = useContext()

    const menu = useMenuStore()

    const activeElement = ref(null)
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

    const home = { label: 'Home', href: '/', class: 'md:tw-hidden' }
    const enrichedEntries = computed(() => {
      return props.level === 0
        ? [home, ...props.navigationEntries]
        : props.navigationEntries
    })

    return {
      toggleActive,
      activeElement,
      isMobile,
      isHovered,
      enrichedEntries,
    }
  },
})
</script>

<style lang="scss">
@import './styles/MainNavLinkPrimary';
@import './styles/MainNavLinkSecondary';
</style>
