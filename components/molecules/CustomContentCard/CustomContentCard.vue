<template>
  <GenericCard
    v-bind="{ href }"
    :key="key"
    v-editable="(title, date, description, image)"
  >
    <template #image>
      <ResponsiveImage
        provider="storyblok"
        :image="image"
        aspect-ratio="3:2"
        :rounded="false"
        class="custom-content-card__image"
      />
    </template>

    <template v-if="date" #subheading>
      <div class="custom-content-card__date">
        <Icon icon="date_range" size="xsmall" />
        {{ $d(fixedDate, 'dateLong') }}
      </div>
    </template>

    <template v-if="title" #heading>
      {{ title }}
    </template>

    <template v-if="description" #description>
      {{ description }}
    </template>

    <template #actionItems>
      <Button
        :label="$t('navigation.button.article.label')"
        icon="arrow_forward"
        variant="secondary"
        shape="plain"
        :href="href"
      />
    </template>
  </GenericCard>
</template>

<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'
import GenericCard from '~/components/atoms/GenericCard/GenericCard.vue'
import ResponsiveImage from '~/components/atoms/ResponsiveImage/ResponsiveImage.vue'

export default defineComponent({
  components: { GenericCard, ResponsiveImage },
  props: {
    /**
     * The date when the content was released
     */
    date: {
      type: String,
      default: null,
    },
    /**
     * An image displayed in the upper area
     */
    image: {
      type: [String, Object],
      default: () => ({}),
    },
    /**
     * Title of the card content
     */
    title: {
      type: String,
      default: null,
    },
    /**
     * Short description to teaser the content behind the link
     */
    description: {
      type: String,
      default: null,
    },
    /**
     * Link for card and button
     */
    href: {
      type: String,
      default: '#',
    },
  },
  setup(props) {
    /**
     * They key is used to track changes on the
     * insertion and removal of templates
     */
    const key = computed(() => {
      const hasDate = (props.date?.length || 0) !== 0
      const hasTitle = (props.title?.length || 0) !== 0
      const hasDesc = (props.description?.length || 0) !== 0
      return '' + hasDate + hasTitle + hasDesc
    })

    /**
     * Workaround to make sure the date works in Safari:
     * https://stackoverflow.com/questions/4310953/invalid-date-in-safari
     */
    const fixedDate = computed(() => new Date(props.date.replace(/-/g, '/')))

    return { key, fixedDate }
  },
})
</script>

<style lang="scss">
.custom-content-card {
  &__image {
    @apply tw-w-full;
    @apply tw-h-full;
  }

  &__date {
    @apply tw-flex;
    @apply tw-items-center;
    @apply tw-gap-1;
  }
}
</style>
