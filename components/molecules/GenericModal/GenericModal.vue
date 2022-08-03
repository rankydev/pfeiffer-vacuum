<template>
  <transition name="fade">
    <div v-if="isOpen" class="modal">
      <div class="modal__background closeModal">
        <ContentWrapper
          class="modal__box tw-grid-container tw-grid-cols-12 closeModal"
        >
          <div
            class="modal__grid-box tw-col-span-4 tw-col-start-1 md:tw-col-span-6 md:tw-col-start-2 lg:tw-col-span-10 lg:tw-col-start-2"
          >
            <div class="modal__box-wrapper">
              <slot @closeModal="$emit('closeModal')" />
              <Icon
                class="modal__icon"
                icon="close"
                size="small"
                @click="$emit('closeModal')"
              />
            </div>
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
  },
  emits: ['closeModal'],
  setup(props, { emit }) {
    const toggleModal = (ev) => {
      if (ev.keyCode === 27) {
        emit('closeModal')
      }
    }

    const handleBgClick = (ev) => {
      console.log(ev.target.className.includes('closeModal'))
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
  // This has to be placed inside the parent component of this component to trigger modal
  // const isModalOpen = ref(false)
  // const toggleModal = () => {
  //  isModalOpen.value = !isModalOpen.value
  // }
})
</script>

<style lang="scss">
.modal {
  z-index: 100;
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

  &__box-wrapper {
    @apply tw-flex;
    @apply tw-rounded-lg;
    @apply tw-bg-pv-white;
    @apply tw-p-4;
    @apply tw-max-h-screen;
    @apply tw-overflow-y-auto;

    @screen md {
      @apply tw-p-6;
    }

    @screen lg {
      @apply tw-p-8;
    }
  }

  &__icon {
    @apply tw-ml-4;
    @apply tw-cursor-pointer;

    &:hover,
    &:focus-visible {
      @apply tw-text-pv-red-lighter;
    }
  }
}
</style>
