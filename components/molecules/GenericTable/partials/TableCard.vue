<template>
  <div class="table-card">
    <span v-if="primary.active" class="table-card__primary">
      {{ primaryValue }}
    </span>
    <span v-if="secondary.active" class="table-card__secondary">
      {{ secondaryValue }}
    </span>
    <div class="table-card__other">
      <span
        v-for="(val, i) in normalValues"
        :key="`normal${i}`"
        class="table-card__normal-value"
      >
        {{ val.text || val }}
      </span>
    </div>
    <div class="table-card__actions">
      <Button
        v-for="(btn, j) in data.actions"
        :key="`action${j}`"
        v-bind="btn"
      />
    </div>
  </div>
</template>
<script>
import { computed } from '@nuxtjs/composition-api'
import Button from '~/components/atoms/Button/Button'

export default {
  components: {
    Button,
  },
  props: {
    data: {
      type: Object,
      default: () => ({
        entries: [],
        actions: [],
      }),
    },
    primary: {
      type: Object,
      default: () => ({
        position: 0,
        active: true,
      }),
    },
    secondary: {
      type: Object,
      default: () => ({
        position: 1,
        active: true,
      }),
    },
  },
  setup(props) {
    const normalValues = computed(() =>
      props.data.entries.filter(
        (val, i) =>
          ![props.primary.position, props.secondary.position].includes(i)
      )
    )

    const primaryValue = computed(() => {
      const val = props.data.entries[props.primary.position]
      return val.text || val
    })

    const secondaryValue = computed(() => {
      const val = props.data.entries[props.secondary.position]
      return val.text || val
    })

    return { normalValues, primaryValue, secondaryValue }
  },
}
</script>
<style lang="scss">
@import '/assets/scss/mixins';

.table-card {
  @include box-shadow;
  @apply tw-flex;
  @apply tw-flex-col;
  @apply tw-rounded-lg;
  @apply tw-bg-pv-grey-96;
  @apply tw-p-4;

  &__primary {
    @apply tw-text-sm;
    @apply tw-text-pv-grey-16;
  }

  &__secondary {
    @apply tw-text-xs;
    @apply tw-text-pv-grey-48;
  }

  &__primary,
  &__secondary {
    @apply tw-leading-6;
  }

  &__other {
    @apply tw-my-4;
  }

  &__normal-value {
    @apply tw-text-sm;
    @apply tw-leading-6;

    & + & {
      &::before {
        content: '|';
        @apply tw-text-pv-red;
        @apply tw-mx-2;
      }
    }
  }

  &__actions {
    @apply tw-flex;
    @apply tw-gap-2;
  }
}
</style>
