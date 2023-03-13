<template>
  <div class="empty-wrapper">
    <Icon class="empty-wrapper__big-icon" :icon="icon" size="xlarge" />
    <span class="empty-wrapper__label">
      {{ $t(label) }}
    </span>
    <Button v-if="button.variant" v-bind="button" />
  </div>
</template>

<script>
import Button from '~/components/atoms/Button/Button.vue'
import Icon from '~/components/atoms/Icon/Icon.vue'
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'EmptyWrapper',
  components: {
    Button,
    Icon,
  },
  props: {
    icon: {
      type: String,
      default: 'description',
    },
    label: {
      type: String,
      required: true,
    },
    button: {
      type: Object,
      default: () => ({}),
    },
  },
})
</script>

<style lang="scss">
.empty-wrapper {
  @apply tw-flex tw-flex-col;
  @apply tw-justify-center tw-items-center;
  @apply tw-text-center;
  @apply tw-bg-pv-grey-96;
  @apply tw-py-8 tw-px-4;
  @apply tw-rounded-lg;

  &__big-icon {
    @apply tw-text-pv-grey-80;
    @apply tw-mb-3;
    @apply tw-max-h-16;
  }

  &__label {
    @apply tw-font-bold;
    @apply tw-mb-4;
  }
}
</style>
