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
        v-for="(btn, j) in tableData.actions.filter(
          (e) => !('mobile' in e) || e.mobile
        )"
        :key="`action${j}`"
        v-bind="btn"
        class="table-card__action"
        :class="{ 'table-card__action--grow': btn.grow }"
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
    tableData: {
      type: Object,
      default: () => ({
        entries: [],
        actions: [],
      }),
    },
    primary: {
      type: Object,
      required: true,
    },
    secondary: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const normalValues = computed(() =>
      props.tableData.entries.filter(
        (val, i) =>
          ![props.primary.position, props.secondary.position].includes(i) &&
          ((val && !val.hasOwnProperty('text')) ||
            (val.hasOwnProperty('text') && val.text))
      )
    )

    const primaryValue = computed(() => {
      const val = props.tableData.entries[props.primary.position]
      return val.text || val
    })

    const secondaryValue = computed(() => {
      const val = props.tableData.entries[props.secondary.position]
      return val.text || val
    })

    return { normalValues, primaryValue, secondaryValue }
  },
}
</script>
<style lang="scss" scoped>
@import '/assets/scss/mixins';

.table-card {
  @apply tw-flex;
  @apply tw-flex-col;
  @apply tw-rounded-lg;
  @apply tw-bg-pv-grey-96;
  @apply tw-p-4;

  &__primary {
    @apply tw-text-sm;
    @apply tw-font-bold;
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

  &__action {
    @apply tw-flex-none;

    &--grow {
      @apply tw-flex-1;
    }
  }
}
</style>
