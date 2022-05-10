<template>
  <div class="bubble__wrapper">
    <h5 class="bubble__headline">{{ title }}</h5>
    <div v-editable="richtext" class="bubble__richtext" v-html="richtext"></div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  components: {},
  props: {
    /**
     * The title of the component
     */
    title: {
      type: String,
      default: '',
    },
    /**
     * richtext element
     */
    richtext: {
      type: String,
      default: '',
    },
    /**
     * The position of the element
     */
    position: {
      type: String,
      default: 'right',
      validator: (val) => ['left', 'right'].includes(val),
    },
  },
  setup(props) {},
})
</script>

<style lang="scss">
.bubble {
  &__wrapper {
    @apply tw-flex;
    @apply tw-flex-col;
    @apply tw-justify-center;
    @apply tw-items-center;
    color: white;
    height: 90px;
    width: 90px;
    @apply tw-rounded-full;
    @apply tw-bg-pv-red;

    @screen md {
      height: 144px;
      width: 144px;
    }

    @screen lg {
      height: 180px;
      width: 180px;
    }
  }

  &__headline {
    color: white;
    font-size: 10px;
    line-height: 16px;
  }

  &__richtext {
    p {
      font-size: 10px;
      line-height: 16px;
    }
  }
}
</style>
