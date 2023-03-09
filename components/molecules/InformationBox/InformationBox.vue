<template>
  <div class="information-box">
    <div class="information-box__headline">
      <h3 v-if="content.headline">{{ content.headline }}</h3>
      <Button
        v-if="content.button"
        class="information-box__button"
        :icon="icon"
        variant="secondary"
        shape="plain"
        :href="link"
      />
    </div>

    <span v-if="content.subheadline" class="information-box__subheadline">
      {{ content.subheadline }}
    </span>

    <ul
      v-if="content.items && content.items.length"
      class="information-box__entries"
    >
      <li
        v-for="(item, index) in content.items"
        :key="index"
        class="information-box__entry"
      >
        <Icon
          v-if="item.icon"
          :icon="item.icon"
          class="information-box__icon"
          :class="{ 'information-box__icon--no-margin': item.noMargin }"
        />
        <span>{{ item.text }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, defineComponent } from '@nuxtjs/composition-api'
import Button from '~/components/atoms/Button/Button'
import Icon from '~/components/atoms/Icon/Icon'

export default defineComponent({
  components: { Button, Icon },
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const icon = computed(() => props.content?.button?.icon || '')
    const link = computed(() => props.content?.button?.href || '')

    return { icon, link }
  },
})
</script>

<style lang="scss">
.information-box {
  @apply tw-bg-pv-grey-96;
  @apply tw-rounded-lg;
  @apply tw-p-4;

  &__headline {
    @apply tw-flex;
    @apply tw-items-center;
    @apply tw-justify-between;
    @apply tw-mb-2;

    h3 {
      @apply tw-flex-1;
    }
  }

  &__button {
    @apply tw-flex-none;
  }

  .button--normal.button--icon-only {
    @apply tw-p-0;
    @apply tw-pl-2;
  }

  &__subheadline {
    @apply tw-font-bold;
    @apply tw-block;
    @apply tw-mb-4;
  }

  &__entry {
    @apply tw-flex;
    @apply tw-mb-2;
  }

  &__icon {
    @apply tw-mr-2;

    &--no-margin {
      @apply tw-mr-0;
    }
  }
}
</style>
