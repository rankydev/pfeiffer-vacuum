<template>
  <div class="pv-input" :class="classes">
    <div class="pv-input__control" :title="attrs$.title">
      <div ref="input-slot" class="pv-input__slot" :on="onHandlers">
        <!-- <pv-label v-if="hasLabel" :for="computedId">
          <slot name="label">
            {{ label }}
          </slot>
        </pv-label> -->
        <slot />
      </div>
    </div>
    <div class="pv-input__append">
      <slot name="append">
        <div class="pv-input__icon">
          <pv-icon v-if="icon" :on="onIconHandlers" :icon="icon" />
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
import { nanoid } from 'nanoid'

// import PvIcon from '../Icon'
// import PvLabel from '../Label'

// Mixins
import BindsAttrs from '~/mixins/bind-attrs'

export default {
  name: 'Input',

  // components: {
  //   PvIcon,
  //   PvLabel,
  // },

  mixins: {
    BindsAttrs,
  },

  inheritAttrs: false,

  props: {
    id: {
      type: String,
      default: null,
    },
    label: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
    value: {
      type: [String, Number, Boolean],
      required: true,
    },
  },

  data() {
    return {
      lazyValue: this.value,
      hasMouseDown: false,
    }
  },

  computed: {
    classes() {
      return {
        'pv-input--is-dirty': this.isDirty,
        'pv-input--is-readonly': this.isReadonly,
      }
    },
    onHandlers() {
      return {
        click: this.onClick,
        mousedown: this.onMouseDown,
        mouseup: this.onMouseUp,
      }
    },
    omIconHandlers() {
      const eventName = 'click:append'

      if (!this.listeners$[eventName]) return undefined

      return {
        click: (e) => {
          e.preventDefault()
          e.stopPropagation()

          this.$emit(eventName, e)
        },
        // Container has g event that will
        // trigger menu open if enclosed
        mouseup: (e) => {
          e.preventDefault()
          e.stopPropagation()
        },
      }
    },
    computedId() {
      return this.id || `pv-input__${nanoid()}`
    },
    hasLabel() {
      return !!(this.$slots.label || this.label)
    },
    // Proxy for `lazyValue`
    // This allows an input
    // to function without
    // a provided model
    internalValue: {
      get() {
        return this.lazyValue
      },
      set(val) {
        this.lazyValue = val
        this.$emit(this.$_modelEvent, val)
      },
    },
    isDirty() {
      return !!this.lazyValue
    },
    isLabelActive() {
      return this.isDirty
    },
  },

  watch: {
    value(val) {
      this.lazyValue = val
    },
  },

  beforeCreate() {
    // v-radio-group needs to emit a different event
    // https://github.com/vuetifyjs/vuetify/issues/4752
    this.$_modelEvent =
      (this.$options.model && this.$options.model.event) || 'input'
  },

  methods: {
    onClick(e) {
      this.$emit('click', e)
    },
    onMouseDown(e) {
      this.hasMouseDown = true
      this.$emit('mousedown', e)
    },
    onMouseUp(e) {
      this.hasMouseDown = false
      this.$emit('mouseup', e)
    },
  },
}
</script>

<style scoped>
.input {
  color: red;
}
</style>
