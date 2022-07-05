<!-- eslint-disable vue/no-v-html -->
<template>
  <div>
    <Label :label="label" />
    <v-select
      v-model="innerValue"
      :disabled="disabled"
      :options="options"
      class="pv-select"
      :class="{ 'pv-select__error': hasError }"
      :label="labelKey"
      :placeholder="placeholder || $t('form.select.placeholder')"
      :components="{ Deselect }"
      :reduce="reduce"
      v-bind="$attrs"
      @change="$emit('update', innerValue)"
    >
      <!-- :error="hasErrors"
      :success="isValid" -->
      <template #open-indicator>
        <Icon
          v-if="hasError"
          class="pv-input__icon"
          :class="'pv-select__error--icon'"
          :icon="'error'"
          @click.native="$emit('click:icon', $event)"
        />
        <Icon v-else class="vs__open-indicator" icon="arrow_drop_down" />
      </template>
      <template #option="option">
        <!--  TODO sanitizer -->
        <Icon icon="arrow_forward" />
        <span
          :class="{ disabled: disableField && !option[disableField] }"
          v-html="option[labelKey]"
        />
      </template>
      <template #selected-option="option">
        <!--  TODO sanitizer -->
        <span v-html="option[labelKey]" />
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

export default {
  name: 'PvSelect',
  components: {
    vSelect,
    Icon,
    Label,
    ErrorMessage,
  },
  props: {
    // must be included in props
    options: {
      type: Array,
      required: true,
    },
    // Value of selected option
    // value: {
    //   type: String,
    //   required: true,
    // },
    placeholder: {
      type: String,
      default: null,
    },
    // we can use the reduce prop to receive only the data that's required
    // https://vue-select.org/guide/values.html#transforming-selections
    reduce: {
      type: Function,
      default: (option) => option,
    },
    // searches option for this key to set it as label for option
    labelKey: {
      type: String,
      default: 'text',
    },
    // disables an option
    disableField: {
      type: String,
      default: null,
    },
    // disables complete selectbox
    disabled: {
      type: Boolean,
      default: false,
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    /**
     * A text describing which error occured, it is displayed if hasError is true
     */
    errorMessage: {
      type: String,
      default: '',
    },
  },
  emits: ['change', 'click:icon', 'input', 'update'],
  data: () => ({
    innerValue: [],
    Deselect: {
      render: (createElement) =>
        createElement('span', { class: ['deselect-option'] }),
    },
  }),
  // computed: {
  //   displayValue: function () {
  //     if (this.innerValue) {
  //       const value = this.innerValue?.isocode || this.innerValue
  //       const findDisplayValue = (e) => e.value === value || e.isocode === value
  //       const filteredOption = this.options.find(findDisplayValue)

  //       if (filteredOption) {
  //         const { displayValue, name, isocode } = filteredOption
  //         return displayValue || name || isocode || this.innerValue
  //       } else {
  //         return this.innerValue
  //       }
  //     } else {
  //       return null
  //     }
  //   },
  // },
}
</script>

<style lang="scss">
.pv-select {
  .v-select {
    @apply tw-bg-pv-white;

    &[error='true'] .vs__dropdown-toggle {
      @apply tw-border-pv-red;
    }

    &[success='true'] .vs__dropdown-toggle {
      @apply tw-border-pv-green;
    }
  }

  .vs__dropdown-toggle {
    @apply tw-flex tw-items-center tw-justify-between;
    @apply tw-py-1 tw-pl-2;
    @apply tw-border-pv-grey-80;
    @apply tw-border-2;
    @apply tw-border-solid;
    @apply tw-rounded-md;

    .vs__deselect::after,
    .vs__clear::after {
      @apply tw-text-lg;
    }

    .vs__selected-options {
      @apply tw-items-center;

      .vs__selected {
        @apply tw-mr-2;
        @apply tw-flex tw-items-center;
        @apply tw-gap-2;

        &:last-of-type {
          @apply tw-mr-0;
        }
      }
    }

    .vs__open-indicator {
      @apply tw-text-3xl;
      margin-top: -5px;
    }

    .vs__search {
      @apply tw-p-0;
      @apply tw-m-0;
      @apply tw-flex tw-items-center tw-justify-between;
      @apply tw-text-pv-grey-64;
    }
  }

  .vs__dropdown-menu {
    @apply tw-p-0;
    @apply tw-mt-1;
    @apply tw-border-solid;
    @apply tw-shadow-select;
    @apply tw-border-pv-grey-80;
    @apply tw-border-2;
    @apply tw-border-solid;
    @apply tw-rounded-md;

    .vs__dropdown-option {
      @apply tw-py-2 tw-px-4;
      @apply tw-flex tw-items-center;
      @apply tw-gap-2;

      .form-group {
        @apply tw-mb-0;
      }

      &--highlight {
        @apply tw-bg-pv-red;
      }
    }
  }

  .v-select.vs--open {
    .vs__dropdown-toggle {
      @apply tw-border-pv-grey-16;

      .vs__search::placeholder {
        @apply tw-text-pv-grey-16;
      }

      .vs__selected-options {
        .vs__selected {
          @apply tw-opacity-100;
        }
      }
    }
  }

  .v-select.vs--searchable.vs--single {
    .vs__selected-options {
      .vs__selected {
        @apply tw-m-0;
        @apply tw-p-0;
      }
    }
  }

  &__error {
    .vs__dropdown-toggle {
      @apply tw-border-pv-red;
      @apply tw-rounded-b-none;
    }

    &--icon {
      @apply tw-text-pv-red;
      margin-right: 35px;
    }
  }
}

.vs {
  &--disabled {
    .vs__dropdown-toggle {
      @apply tw-bg-pv-grey-96;
      @apply tw-border-2;
      @apply tw-border-pv-grey-80;
    }

    .vs__open-indicator {
      @apply tw-text-pv-grey-80;
    }
  }

  &--open {
    .vs__dropdown-toggle {
      @apply tw-border-pv-grey-16;
    }
  }
}
</style>
