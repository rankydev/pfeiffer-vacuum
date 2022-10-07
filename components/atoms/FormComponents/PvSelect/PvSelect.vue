<template>
  <div>
    <PvLabel v-if="label" :label="label" />
    <v-select
      v-model="internalValue"
      v-bind="{ options, disabled, multiple, reduce, clearable }"
      :required="isRequired"
      :class="{
        'pv-select--error': !!validation.getError(),
        'pv-select--icon': prependIcon,
      }"
      :label="optionLabel"
      :placeholder="placeholder || $t('form.select.placeholder')"
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
        <div class="pv-select__search-wrapper">
          <Icon
            v-if="prependIcon"
            class="pv-select__icon-prepend"
            :icon="prependIcon"
          />
          <input class="vs__search" v-bind="attributes" v-on="events" />
          <div class="pv-select__search-helper">{{ placeholder }}</div>
        </div>
      </template>

      <template #open-indicator>
        <Icon
          v-if="!!validation.getError()"
          class="pv-select__icon-error"
          icon="error_outline"
          :size="iconSize"
        />
        <Icon
          class="vs__open-indicator pv-select__icon-indicator"
          icon="arrow_drop_down"
          :size="iconSize"
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
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span v-html="option[optionLabel]" />
      </template>

      <template v-if="!!multiple" #selected-option-container>
        <div class="vs__selected">
          {{ placeholder || $t('form.select.placeholder') }}
        </div>
      </template>

      <template v-else #selected-option="option">
        <!--  TODO sanitizer -->
        <Icon
          v-if="option.icon"
          class="pv-select__icon-option"
          :icon="option.icon"
        />
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span v-html="prependLabel + option[optionLabel]" />
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
import props from './partials/props.js'

export default defineComponent({
  name: 'PvSelect',
  components: {
    vSelect,
    Icon,
    PvLabel,
    ErrorMessage,
    Checkbox,
  },
  props,
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
