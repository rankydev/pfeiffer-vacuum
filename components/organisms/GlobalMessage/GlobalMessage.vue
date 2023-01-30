<template>
  <ContentWrapper no-padding>
    <div
      :class="[
        'global-message',
        `global-message--${variant}`,
        { 'global-message--slim': isSlim },
      ]"
    >
      <div class="global-message__content-wrapper">
        <h5 v-if="headline" class="global-message__headline">{{ headline }}</h5>
        <!-- eslint-disable vue/no-v-html -->
        <p
          class="global-message__description"
          v-html="sanitizer.inline(description)"
        ></p>
        <!-- eslint-enable vue/no-v-html -->
        <Button
          v-if="button"
          v-bind="button"
          target="_blank"
          class="global-message__button"
          icon="arrow_forward"
          variant="secondary"
          shape="plain"
        />
      </div>
      <div class="global-message__icon-wrapper">
        <transition name="scale">
          <Icon
            v-if="icon.visible"
            class="global-message__icon"
            :size="isSlim ? 'base' : 'large'"
            :icon="icon.name"
          />
        </transition>
      </div>
    </div>
  </ContentWrapper>
</template>
<script>
import { computed, ref, onBeforeMount } from '@nuxtjs/composition-api'
import Button from '~/components/atoms/Button/Button'
import Icon from '~/components/atoms/Icon/Icon'
import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper'
import { useSanitizer } from '~/composables/sanitizer/useSanitizer'

export default {
  components: {
    Button,
    Icon,
    ContentWrapper,
  },
  props: {
    variant: {
      type: String,
      default: 'success',
      validator: (val) => ['success', 'warning', 'error'].includes(val),
    },
    preventIconChange: {
      type: Boolean,
      default: false,
    },
    headline: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      required: true,
    },
    button: {
      type: Object,
      default: null,
    },
  },
  setup(props) {
    const sanitizer = useSanitizer()
    const icon = ref({
      visible: true,
      name: '',
    })
    const isSlim = computed(() => {
      return !(props.headline || props.button)
    })

    onBeforeMount(() => {
      switch (props.variant) {
        case 'success':
          icon.value.name = 'check'
          break
        case 'warning':
          icon.value.name = 'info_outline'
          break
        case 'error':
          icon.value.name = 'error'
          break
      }
    })

    if (!props.preventIconChange) {
      // Change icon after two seconds
      setTimeout(() => {
        icon.value.visible = false
        setTimeout(() => {
          icon.value.name = 'close'
          icon.value.visible = true
        }, 300)
      }, 2000)
    }

    return { sanitizer, icon, isSlim }
  },
}
</script>
<style lang="scss">
.global-message {
  $root: &;
  @apply tw-flex tw-justify-between tw-items-stretch;
  @apply tw-h-full;
  @apply tw-bg-pv-white;
  @apply tw-rounded-lg;
  @apply tw-overflow-hidden;
  box-shadow: 1px 1px 10px 4px rgb(0 0 0 / 20%);

  &__content-wrapper,
  &__icon-wrapper {
    @apply tw-grow;
    @apply tw-p-4;
  }

  &__icon-wrapper {
    @apply tw-flex tw-items-center tw-justify-center;
    min-width: 80px;
    max-width: 80px;
  }

  &__icon {
    @apply tw-text-pv-white;
    @apply tw-cursor-pointer;
  }

  &__headline,
  &__description,
  &__button.button--secondary.button--plain {
    @apply tw-text-pv-white;
  }

  &__headline {
    @apply tw-mb-2;
  }

  &__button.button--secondary.button--plain {
    @apply tw-p-0;
    @apply tw-mt-4;
  }

  &--success {
    @apply tw-bg-pv-green;
    #{$root}__icon-wrapper {
      @apply tw-bg-pv-green-lighter;
    }
  }

  &--warning {
    @apply tw-bg-pv-warning;
    #{$root}__icon-wrapper {
      @apply tw-bg-pv-warning-lighter;
    }
  }

  &--error {
    @apply tw-bg-pv-red;
    #{$root}__icon-wrapper {
      @apply tw-bg-pv-error-lighter;
    }
  }

  &--slim {
    #{$root}__content-wrapper,
    #{$root}__icon-wrapper {
      @apply tw-p-2;
    }

    #{$root}__icon-wrapper {
      @apply tw-bg-pv-transparent;
      min-width: 40px;
      max-width: 40px;
    }

    #{$root}__description {
      @apply tw-font-bold;
    }
  }
}
</style>
