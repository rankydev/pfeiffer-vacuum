<template>
  <NuxtImg
    preload
    provider="storyblok"
    :alt="alt"
    :src="src"
    :height="height"
    :width="width"
    :fit="fitIn"
    :format="format"
    :modifiers="modifiersWithSmart"
  />
</template>

<script>
import { toRefs } from '@nuxtjs/composition-api'

export default {
  name: 'ImageWrapper',
  props: {
    src: {
      type: String,
      default: '',
      required: true,
    },
    alt: {
      type: String,
      default: '',
    },
    height: {
      type: String,
      default: '',
    },
    width: {
      type: String,
      default: '',
    },
    fitIn: {
      type: String,
      default: '',
    },
    format: {
      type: String,
      default: '',
    },
    quality: {
      type: String,
      default: '',
    },
    modifiers: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const { modifiers } = toRefs(props)

    const modifiersWithSmart = {
      smart: true,
      ...modifiers.value,
    }

    return { modifiersWithSmart }
  },
}
</script>

<style scoped></style>
