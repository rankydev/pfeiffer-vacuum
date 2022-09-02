<!-- eslint-disable vue/no-v-html -->
<template>
  <div>
    <PvLabel v-if="label" :label="label" />
    <v-select
      v-model="internalValue"
      v-bind="{ options, disabled, multiple, reduce }"
      :required="isRequired"
      :class="{
        'pv-select--error': !!validation.getError(),
        'pv-select--icon': prependIcon,
      }"
      :label="optionLabel"
      :placeholder="$t('form.select.placeholder')"
      :selectable="(option) => option.disabled !== true"
      :components="{ Deselect }"
      deselect-from-dropdown
      :close-on-select="!!!multiple"
      @input="
        $emit('update', internalValue)
        validation.validateInput()
      "
    >
      <template #search="{ attributes, events }">
        <button
          v-if="!!multiple"
          :class="[
            'pv-select__search-multiple',
            { 'pv-select__search-multiple--active': internalValue.length },
          ]"
          v-bind="attributes"
          v-on="events"
        >
          {{ label }}
        </button>
        <template v-else>
          <Icon
            v-if="prependIcon"
            class="pv-select__icon-prepend"
            :icon="prependIcon"
          />
          <input
            class="vs__search"
            v-bind="attributes"
            disabled
            v-on="events"
          />
        </template>
      </template>

      <template #open-indicator>
        <Icon
          v-if="!!validation.getError()"
          class="pv-select__icon-error"
          icon="error_outline"
        />
        <Icon
          class="vs__open-indicator pv-select__icon-indicator"
          icon="arrow_drop_down"
        />
      </template>

      <template #option="option">
        <Checkbox
          v-if="!!multiple"
          label=""
          :checked="
            !!(internalValue || []).filter(
              (e) => e[optionLabel] === option[optionLabel]
            ).length
          "
        />
        <Icon
          v-if="option.icon && !!!multiple"
          class="pv-select__icon-option"
          :icon="option.icon"
        />
        <!--  TODO sanitizer -->
        <span v-html="option[optionLabel]" />
      </template>

      <template v-if="!!multiple" #selected-option-container>
        <div class="pv-select__multiple-selected-container"></div>
      </template>

      <template #selected-option="option">
        <!--  TODO sanitizer -->
        <Icon
          v-if="option.icon && !!!multiple"
          class="pv-select__icon-option"
          :icon="option.icon"
        />
        <span v-html="option[optionLabel]" />
      </template>

      <template #no-options>
        {{ $t('form.select.noOptions') }}
      </template>
    </v-select>

    <ErrorMessage
      v-if="!!validation.getError()"
      :error-message="validation.getError()"
    />
  </div>
</template>

<script>
import vSelect from 'vue-select'
import PvLabel from '~/components/atoms/FormComponents/partials/PvLabel/PvLabel'
import ErrorMessage from '~/components/atoms/FormComponents/partials/ErrorMessage/ErrorMessage'
import Checkbox from '../Checkbox/Checkbox'
import Icon from '~/components/atoms/Icon/Icon'
import { defineComponent, computed, ref, watch } from '@nuxtjs/composition-api'
import { useInputValidator } from '~/composables/useValidator'

export default defineComponent({
  name: 'PvSelect',
  components: {
    vSelect,
    Icon,
    PvLabel,
    ErrorMessage,
    Checkbox,
  },
  props: {
    /**
     * The input’s value
     */
    value: {
      type: String,
      default: '',
    },
    /**
     * The isRequired prop, which defines if the select field is required or not
     */
    isRequired: {
      type: Boolean,
      default: false,
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
     * rules that will be passed into validator
     */
    rules: {
      type: Object,
      default: () => {},
    },
    /**
     * defines wether the validation should be turned on or off for this select
     */
    validate: {
      type: Boolean,
      default: false,
    },
    /**
     * enables multi selection
     */
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update'],
  setup(props) {
    const valueFromProps = ref(props.value)
    const internalValue = computed({
      get: () => valueFromProps.value,
      set: (val) => {
        valueFromProps.value = val
      },
    })

    const Deselect = {
      render: (h) => h('span', { class: ['deselect-option'] }),
    }

    const validation = ref(useInputValidator(props.rules, internalValue))

    watch(
      () => props.validate,
      (value) => {
        if (value === true) {
          validation.value.validateInput()
        }
      }
    )

    return { internalValue, Deselect, validation }
  },
})
</script>

<style lang="scss">
@import 'PvSelect';
</style>
