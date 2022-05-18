<template>
  <GenericCard v-bind="{ href }">
    <template #image>
      <ResponsiveImage
        provider="storyblok"
        :image="image"
        :aspect-ratio="'3:2'"
      />
    </template>

    <template v-if="date" #subheading>
      <div class="custom-content-card__date">
        <Icon icon="date_range" size="xsmall" />
        {{ date }}
      </div>
    </template>

    <template v-if="title" #heading>
      {{ title }}
    </template>

    <template v-if="description" #description>
      {{ description }}
    </template>
  </GenericCard>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    date: {
      type: String,
      default: null,
    },
    image: {
      type: [String, Object],
      default: () => ({}),
    },
    title: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    href: {
      type: String,
      default: '#',
    },
  },
})
</script>

<style lang="scss">
.custom-content-card {
  &__date {
    @apply tw-flex;
    @apply tw-items-center;
    @apply tw-gap-1;
  }
}
</style>
