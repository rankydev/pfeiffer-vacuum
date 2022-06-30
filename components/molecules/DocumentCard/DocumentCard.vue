<template>
  <Link
    v-editable="{ image, href }"
    v-bind="{ href, target: '_blank' }"
    class="document-card"
  >
    <ResponsiveImage :image="image" aspect-ratio="21:28" />
    <Icon class="document-card__icon" icon="download" />
  </Link>
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'
import Link from '~/components/atoms/Link/Link'
import Icon from '~/components/atoms/Icon/Icon'
import ResponsiveImage from '~/components/atoms/ResponsiveImage/ResponsiveImage'

export default defineComponent({
  name: 'DocumentCard',
  components: {
    Link,
    Icon,
    ResponsiveImage,
  },
  props: {
    /**
     * Background image, usually first page of document (aspect-ratio 21:28)
     */
    image: {
      type: Object,
      default: () => ({}),
    },
    /**
     * Link for card
     */
    href: {
      type: String,
      default: '#',
    },
  },
})
</script>
<style lang="scss">
.document-card {
  @apply tw-block;
  @apply tw-relative;
  @apply tw-rounded-lg;
  @apply tw-border-2 tw-border-pv-grey-80;
  @apply tw-overflow-hidden;

  &__icon {
    @apply tw-absolute;
    @apply tw-right-2 tw-bottom-2;
    @apply tw-bg-pv-yellow;
    @apply tw-p-4;
    @apply tw-rounded-md;

    @screen md {
      @apply tw-right-4 tw-bottom-4;
    }
  }
}
</style>
