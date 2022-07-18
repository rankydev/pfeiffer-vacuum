<!-- eslint-disable vue/no-v-html -->
<template>
  <div>
    <Label v-if="label" :label="label" />
    <v-select
      v-model="innerValue"
      :options="options"
      :class="{ 'pv-select--error': hasError, 'pv-select--icon': prependIcon }"
      :disabled="disabled"
      :label="optionLabel"
      :placeholder="$t('form.select.placeholder')"
      :selectable="(option) => option.disabled !== true"
      :components="{ Deselect }"
      :reduce="reduce"
    >
      <template #search="{ attributes, events }">
        <Icon
          v-if="prependIcon"
          class="pv-select__icon-prepend"
          :icon="prependIcon"
        />
        <input class="vs__search" v-bind="attributes" v-on="events" />
      </template>

      <template #open-indicator>
        <Icon
          v-if="hasError"
          class="pv-select__icon-error"
          icon="error_outline"
        />
        <Icon
          class="vs__open-indicator pv-select__icon-indicator"
          icon="arrow_drop_down"
        />
      </template>

      <template #option="option">
        <Icon
          v-if="option.icon"
          class="pv-select__icon-option"
          :icon="option.icon"
        />
        <!--  TODO sanitizer -->
        <span v-html="option[optionLabel]" />
      </template>

      <template #selected-option="option">
        <!--  TODO sanitizer -->
        <Icon
          v-if="option.icon"
          class="pv-select__icon-option"
          :icon="option.icon"
        />
        <span v-html="option[optionLabel]" />
      </template>

      <template #no-options>
        {{ $t('form.select.noOptions') }}
      </template>
    </v-select>

    <ErrorMessage v-if="hasError" :error-message="errorMessage" />
  </div>
</template>

<script>
import vSelect from 'vue-select'
import Label from '~/components/atoms/FormComponents/partials/Label/Label'
import ErrorMessage from '~/components/atoms/FormComponents/partials/ErrorMessage/ErrorMessage'
import Icon from '~/components/atoms/Icon/Icon'
import { defineComponent, computed } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'PvSelect',
  components: {
    vSelect,
    Icon,
    Label,
    ErrorMessage,
  },
  props: {
    /**
     * The input’s value
     */
    value: {
      type: [String, Object, Boolean],
      default: undefined,
    },
    /**
     * Can be an array of objects or array of strings. When using objects, will look for a label, value, icon and disabled keys. T
     */
    options: {
      type: Array,
      required: true,
    },
    /**
     * Tells what key to use when generating option labels when each option is an object.

     */
    optionLabel: {
      type: String,
      default: 'label',
    },
    /**
     * Sets input label
     */
    label: {
      type: String,
      default: null,
    },
    /**
     * An icon which will be prepended on the input field
     * @see [Icon List] (https://fonts.google.com/icons?selected=Material+Icons)
     */
    prependIcon: {
      type: String,
      default: '',
    },
    /**
     * Reduces the prop to receive only the data that's required
     * https://vue-select.org/guide/values.html#transforming-selections
     */
    reduce: {
      type: Function,
      default: (option) => option,
    },
    /**
     * disables complete selectbox
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * The following fields are temporarly and should be removed if the validator is inserted
     */
    hasError: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: '',
    },
  },
  emits: ['update'],
  setup(props, { emit }) {
    const innerValue = computed({
      get: () => props.value,
      set: (value) => emit('update', value),
    })

    const Deselect = {
      render: (h) => h('span', { class: ['deselect-option'] }),
    }

    return { innerValue, Deselect }
  },
})
</script>

<style lang="scss">
@import 'vue-select/src/scss/vue-select';

.vs {
  &__actions {
    @apply tw-p-0;
  }

  &__selected-options {
    @apply tw-items-center;
    @apply tw-p-0;
  }

  &__selected {
    @apply tw-m-0 tw-p-0;
    @apply tw-mr-2;
    @apply tw-flex tw-items-center;
    @apply tw-gap-2;
    @apply tw-text-pv-grey-16;

    &:last-of-type {
      @apply tw-mr-0;
    }
  }

  &__dropdown-toggle {
    @apply tw-flex tw-items-center tw-justify-between tw-gap-2;
    @apply tw-py-3 tw-pr-3 tw-pl-4;
    @apply tw-shadow-border-grey-80;
    @apply tw-border-0;
    @apply tw-rounded-md;
    @apply tw-bg-pv-white;
  }

  &__open-indicator {
    @apply tw-text-pv-grey-48;
  }

  &__search {
    &,
    &:focus {
      @apply tw-p-0;
      @apply tw-m-0;
    }

    &::placeholder {
      @apply tw-text-pv-grey-64;
    }
  }

  &--searching {
    .vs__selected {
      @apply tw-hidden;
    }
  }

  &__dropdown-menu {
    @apply tw-p-0;
    @apply tw-mt-1;
    @apply tw-border-solid;
    @apply tw-border-pv-grey-80;
    @apply tw-border-2;
    @apply tw-border-solid;
    @apply tw-rounded-md;
  }

  &__dropdown-option,
  &__no-options {
    @apply tw-py-3 tw-px-4;
    @apply tw-leading-6;
    @apply tw-flex tw-gap-2;
  }

  &__dropdown-option {
    &--highlight {
      @apply tw-bg-pv-red-lighter;
    }

    &--disabled {
      @apply tw-bg-pv-grey-96;
      @apply tw-text-pv-grey-48;
    }
  }

  &--open {
    .vs__dropdown-toggle {
      @apply tw-shadow-border-grey-16;
      @apply tw-rounded-md;
    }

    .vs__open-indicator {
      @apply tw-text-pv-grey-16;
    }
  }

  &--disabled {
    .vs__clear,
    .vs__search,
    .vs__selected,
    .vs__open-indicator {
      @apply tw-bg-pv-transparent;
    }

    .vs__selected {
      @apply tw-text-pv-grey-48;
    }

    .vs__dropdown-toggle {
      @apply tw-bg-pv-grey-96;
      @apply tw-border-pv-grey-80;
    }

    .vs__open-indicator {
      @apply tw-text-pv-grey-80;
    }
  }
}

.pv-select {
  &--icon {
    .vs__search,
    .vs__selected {
      @apply tw-ml-8;
    }
  }

  &__icon {
    &-prepend {
      @apply tw-absolute;
    }

    &-error {
      @apply tw-text-pv-red;
      @apply tw-mr-2;
    }
  }

  &--error {
    .vs__dropdown-toggle {
      @apply tw-shadow-border-red;
      @apply tw-rounded-b-none;
    }
  }
}
</style>