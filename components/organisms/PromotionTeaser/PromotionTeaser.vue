<template>
  <div class="promotion-teaser">
    <ResponsiveImage
      v-if="promotionTeaser.image"
      class="promotion-teaser__image"
      :image="image"
      aspect-ratio="3:1"
      provider="storyblok"
      :rounded="false"
    />
    <div class="promotion-teaser__content">
      <h2 class="promotion-teaser__headline">{{ promotionTeaser.headline }}</h2>
      <p class="promotion-teaser__subline tw-subline-4">
        {{ promotionTeaser.subline }}
      </p>
      <Richtext
        v-if="promotionTeaser.teaserText"
        :richtext="promotionTeaser.teaserText"
        class="promotion-teaser__richtext"
      />
      <Button class="promotion-teaser__button" v-bind="button" />
    </div>
  </div>
</template>

<script>
import { defineComponent, toRefs } from '@nuxtjs/composition-api'
import Button from '~/components/atoms/Button/Button.vue'
import ResponsiveImage from '~/components/atoms/ResponsiveImage/ResponsiveImage.vue'
import Richtext from '~/components/atoms/Richtext/Richtext.vue'

export default defineComponent({
  name: 'PromotionTeaser',
  components: { Button, ResponsiveImage, Richtext },
  props: {
    content: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const { content } = toRefs(props)
    const [promotionTeaser] = content.value
    const [button] = promotionTeaser.button
    const [imageObject] = promotionTeaser.image
    const { image } = imageObject

    return { promotionTeaser, button, image }
  },
})
</script>

<style lang="scss">
.promotion-teaser {
  &__content {
    @apply tw-bg-pv-grey-96;
    @apply tw-p-4;
  }

  &__headline {
    @apply tw-mb-2;
  }

  &__subline {
    @apply tw-mb-4;
  }

  &__richtext {
    @apply tw-hidden;
    @apply tw-mb-2;

    @screen md {
      @apply tw-block;
    }
  }

  &__button {
    @screen sm {
      @apply tw-flex;
    }
  }
}
</style>
