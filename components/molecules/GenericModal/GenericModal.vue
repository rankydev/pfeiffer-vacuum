<template>
  <transition name="fade">
    <div v-if="isOpen" class="modal">
      <div class="modal__background closeModal">
        <ContentWrapper
          class="modal__box closeModal"
          :class="{ 'modal__box--fill': fillViewport }"
        >
          <div
            class="modal__box-wrapper"
            :class="{ 'modal__box-wrapper--fill': fillViewport }"
          >
            <slot @closeModal="$emit('closeModal')" />
            <Icon
              class="modal__icon"
              icon="close"
              size="small"
              @click="$emit('closeModal')"
            />
          </div>
        </ContentWrapper>
      </div>
    </div>
  </transition>
</template>

<script>
import { defineComponent, watch } from '@nuxtjs/composition-api'
import Icon from '~/components/atoms/Icon/Icon.vue'
import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper'

export default defineComponent({
  name: 'GenericModal',
  components: { Icon, ContentWrapper },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    fillViewport: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['closeModal'],
  setup(props, { emit }) {
    const toggleModal = (ev) => {
      if (ev.keyCode === 27) {
        emit('closeModal')
      }
    }

    const handleBgClick = (ev) => {
      if (ev.target.className.includes('closeModal')) {
        emit('closeModal')
      }
    }

    watch(
      () => props.isOpen,
      (val) => {
        if (val) {
          document.querySelector('body').style.overflow = 'hidden'
          window.addEventListener('keyup', toggleModal)
          window.addEventListener('click', handleBgClick)
        } else {
          document.querySelector('body').style.overflow = 'visible'
          window.removeEventListener('keyup', toggleModal)
          window.removeEventListener('click', handleBgClick)
        }
      }
    )
  },
})
</script>

<style lang="scss">
.modal {
  z-index: 110;
  @apply tw-top-0;
  @apply tw-right-0;
  @apply tw-h-screen;
  @apply tw-w-screen;
  @apply tw-fixed;
  @apply tw-bg-pv-grey-32-opacity;

  &__background {
    @apply tw-h-full;
    @apply tw-flex;
    @apply tw-items-center;
    @apply tw-justify-center;
  }

  &__box {
    @apply tw-py-4;
    @apply tw-h-auto;
    @apply tw-max-h-full;
    @apply tw-w-auto;
    @apply tw-max-w-full;

    &--fill {
      @apply tw-w-full;
      @apply tw-h-full;
    }
  }

  &__box-wrapper {
    @apply tw-flex;
    @apply tw-justify-end;
    @apply tw-relative;
    @apply tw-rounded-lg;
    @apply tw-bg-pv-white;
    @apply tw-p-4;
    @apply tw-overflow-y-auto;

    // making sure the modal is never too big for the viewport, also need to remove the padding from modal__box
    max-height: calc(100vh - theme('spacing.4') * 2);

    @screen md {
      @apply tw-p-6;
    }

    @screen lg {
      @apply tw-p-8;
    }

    &--fill {
      @apply tw-w-full;
      @apply tw-h-full;
    }
  }

  &__icon {
    @apply tw-absolute;
    @apply tw-cursor-pointer;

    &:hover,
    &:focus-visible {
      @apply tw-text-pv-red-lighter;
    }
  }
}
</style>
