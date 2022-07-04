<template>
  <div>
    <Label :label="label" />
    <v-select
      v-model="innerValue"
      :disabled="disabled"
      :options="options"
      class="pv-select"
      :class="{ 'pv-select__error': hasError }"
      :label="textField"
      :multiple="multiple"
      :placeholder="placeholder || $t('form.select.placeholder')"
      :components="{ Deselect }"
      :reduce="reduce"
      v-bind="$attrs"
      :selectable="(option) => (variantSelection ? option.selectable : true)"
      @change="$emit('change')"
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
        <Icon class="vs__open-indicator" icon="arrow_drop_down" />
      </template>
      <template v-if="multiple" #option="option">
        <!-- TODO insert new checkbox -->
        <Checkbox
          :value="
            !!innerValue.find((i) => i.value === option[$attrs['value-field']])
          "
        >
          <!--  TODO sanitizer -->
          <b v-html="option[textField]" />
        </Checkbox>
      </template>
      <template v-else #option="option">
        <!--  TODO sanitizer -->
        <Icon icon="arrow_forward" />
        <span
          :class="{ disabled: disableField && !option[disableField] }"
          v-html="option[textField]"
        />
      </template>
      <template #selected-option="option">
        <!--  TODO sanitizer -->
        <Icon v-if="value" icon="arrow_forward" />
        <span v-html="option[textField]" />
      </template>
    </v-select>
    <ErrorMessage v-if="hasError" :error-message="errorMessage" />
  </div>
</template>

<script>
import vSelect from 'vue-select'
import Checkbox from '~/components/atoms/FormComponents/Checkbox/Checkbox'
import Label from '~/components/atoms/FormComponents/partials/Label/Label'
import ErrorMessage from '~/components/atoms/FormComponents/partials/ErrorMessage/ErrorMessage'
import Icon from '~/components/atoms/Icon/Icon'

export default {
  components: {
    vSelect,
    Checkbox,
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
    value: {
      type: null,
      required: true,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: null,
    },
    hidePlaceholder: {
      type: Boolean,
      default: false,
    },
    reduce: {
      type: Function,
      default: (option) => option,
    },
    textField: {
      type: String,
      default: 'text',
    },
    disableField: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    variantSelection: {
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
  emits: ['change'],
  data: () => ({
    innerValue: [],
    Deselect: {
      render: (createElement) =>
        createElement('span', { class: ['deselect-option'] }),
    },
  }),
  computed: {
    displayValue: function () {
      if (this.innerValue) {
        const value = this.innerValue?.isocode || this.innerValue
        const findDisplayValue = (e) => e.value === value || e.isocode === value
        const filteredOption = this.options.find(findDisplayValue)

        if (filteredOption) {
          const { displayValue, name, isocode } = filteredOption
          return displayValue || name || isocode || this.innerValue
        } else {
          return this.innerValue
        }
      } else {
        return null
      }
    },
  },
  watch: {
    // Handles internal model changes.
    innerValue(newVal) {
      this.$emit('input', newVal)
    },
    // Handles external model changes.
    value(newVal) {
      this.innerValue = newVal
    },
  },
  created() {
    if (this.value) {
      this.innerValue = this.value
    }
  },
}
</script>

<style lang="scss">
.pv-select {
  .v-select {
    background-color: white;

    &[error='true'] .vs__dropdown-toggle {
      @apply tw-border-pv-red;
    }

    &[success='true'] .vs__dropdown-toggle {
      @apply tw-border-pv-green;
    }
  }

  .vs__dropdown-toggle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 0 4px 8px;
    @apply tw-border-pv-grey-80;
    @apply tw-border-2;
    @apply tw-border-solid;
    border-radius: 6px;

    .vs__deselect::after,
    .vs__clear::after {
      font-size: 20px;
    }

    .vs__selected-options {
      align-items: center;

      .vs__selected {
        margin: 0 8px 0 0;
        padding: 3px 5px;
        @apply tw-flex tw-items-center;
        @apply tw-gap-2;

        &:last-of-type {
          margin-right: 0;
        }
      }
    }

    .vs__open-indicator {
      font-size: 32px;
      margin-top: -5px;
    }

    .vs__search {
      padding: 0;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      @apply tw-text-pv-grey-64;
    }
  }

  .vs__dropdown-menu {
    padding: 0;
    @apply tw-mt-1;
    border-style: solid;
    box-shadow: 0 48px 48px -48px grey; // box-shadow: 0 48px 48px -48px $pv-grey-80;
    @apply tw-border-pv-grey-80;
    @apply tw-border-2;
    @apply tw-border-solid;
    @apply tw-rounded-md;

    .vs__dropdown-option {
      padding: 8px 16px;
      @apply tw-flex tw-items-center;
      @apply tw-gap-2;

      .form-group {
        margin-bottom: 0;
      }

      &--highlight {
        @apply tw-bg-pv-red;
      }
    }
  }

  .v-select.vs--open {
    .vs__dropdown-toggle {
      border-color: black;

      .vs__search::placeholder {
        color: black;
      }

      .vs__selected-options {
        .vs__selected {
          opacity: 1;
        }
      }
    }
  }

  .v-select.vs--searchable.vs--single {
    .vs__selected-options {
      .vs__selected {
        margin: 0;
        padding: 0;
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
