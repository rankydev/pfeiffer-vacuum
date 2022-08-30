<template>
  <ContentWrapper
    v-if="!hideBreadcrumb || quicklinks.length > 0"
    class="on-page-navigation"
  >
    <Breadcrumb v-if="!hideBreadcrumb" />

    <div v-if="quicklinks.length > 0" class="on-page-navigation__quicklinks">
      <Link
        v-for="item in quicklinks"
        :key="item._uid"
        :anchor="item.anchor"
        class="tw-paragraph"
        variant="quicklink"
      >
        {{ item.label }}
      </Link>
    </div>
  </ContentWrapper>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import Link from '~/components/atoms/Link/Link'
import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper.vue'
import Breadcrumb from '~/components/molecules/Breadcrumb/Breadcrumb.vue'

export default defineComponent({
  components: {
    Link,
    ContentWrapper,
    Breadcrumb,
  },
  props: {
    quicklinks: {
      type: Array,
      default: () => [],
    },
    hideBreadcrumb: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style lang="scss">
.on-page-navigation {
  @apply tw-items-center tw-justify-between;
  @apply tw-my-4;
  @apply tw-gap-6;
  @apply tw-hidden;

  &__quicklinks {
    @apply tw-flex;
    @apply tw-items-center;
    @apply tw-justify-between;
    @apply tw-gap-6;
    @apply tw-ml-auto;
  }

  @screen md {
    @apply tw-flex;
  }
}
</style>
