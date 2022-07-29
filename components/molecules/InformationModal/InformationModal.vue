<template>
  <div class="modal">
    <div class="modal__content">
      <div>Hello Info</div>
      <!-- hier an Parent emitten, damit im Parent Component entfernt wird und Unmounted stattfindet -->
      <button @click="$emit('closeModal')">Click</button>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  computed,
  onMounted,
  onBeforeUnmount,
} from '@nuxtjs/composition-api'
// import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper'

export default defineComponent({
  components: {
    // ContentWrapper,
  },
  props: {},
  emits: ['closeModal'],
  setup() {
    // const bodyEl = ref(document.querySelector('body'))

    onMounted(() => {
      document.querySelector('body').style.overflow = 'hidden'
    })

    onBeforeUnmount(() => {
      document.querySelector('body').style.overflow = 'visible'
    })

    /**
     * set ContentWrapper props based on isBreakout value
     * ContentWrapper should have noPadding when the carousel will be rendered normally
     */
    const contentWrapperProps = computed(() => ({
      breakout: true,
      noPadding: true,
    }))

    return { contentWrapperProps }
  },
})
</script>

<style lang="scss">
.modal {
  z-index: 100;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  position: fixed;
  background-color: #f003;

  &__content {
    color: white;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
