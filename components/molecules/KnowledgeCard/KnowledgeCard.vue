<template>
  <GenericCard href="detailPageLink" image-size="cover">
    <template v-if="tag" #tag>
      <span class="knowledge-card-tag">
        <Icon :icon="tagIcon" size="xsmall" class="knowledge-card-tag__icon" />
        <span class="knowledge-card-tag__label">{{ tag }}</span>
      </span>
    </template>
    <template #image>
      <ResponsiveImage v-if="image" :src="image" />
    </template>
    <template v-if="date" #subheading>
      <Icon icon="date_range" size="xsmall" />
      {{ date }}
    </template>
    <template #heading>
      {{ name }}
    </template>
    <template #tags>
      <Tag v-for="(tagItem, idx) in tags" :key="idx" :content="tagItem" />
    </template>
    <template #description>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <p v-html="summary" />
    </template>
    <template #actionItems>
      <div class="knowledge-card-action-items">
        <Button
          shape="plain"
          variant="secondary"
          gap="narrow"
          class="knowledge-card-action-items__detail"
          :href="detailPageLink"
          icon="arrow_forward"
          :label="$t('misc.details')"
        />
        <KnowledgeAssetButton
          :webinar-registration-id="id"
          :type="type"
          :date="date"
          :asset-url="assetUrl"
        />
      </div>
    </template>
  </GenericCard>
</template>

<script>
import {
  computed,
  defineComponent,
  toRefs,
  useContext,
} from '@nuxtjs/composition-api'
import GenericCard from '~/components/molecules/GenericCard/GenericCard.vue'
import ResponsiveImage from '~/components/atoms/ResponsiveImage/ResponsiveImage.vue'
import Icon from '~/components/atoms/Icon/Icon.vue'
import Tag from '~/components/atoms/Tag/Tag.vue'
import Button from '~/components/atoms/Button/Button.vue'
import KnowledgeAssetButton from '~/components/molecules/KnowledgeAssetButton/KnowledgeAssetButton.vue'

export default defineComponent({
  name: 'KnowledgeCard',
  components: {
    GenericCard,
    ResponsiveImage,
    Icon,
    Tag,
    Button,
    KnowledgeAssetButton,
  },
  props: {
    knowledge: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  setup(props) {
    const { knowledge } = toRefs(props)
    const { localePath, i18n } = useContext()
    const isWebinar = computed(() => knowledge?.value?.type === 'WEBINAR')
    const tag = computed(() => {
      const type = isWebinar.value ? 'webinar' : 'whitepaper'
      const transString = `knowledge.${type}.heading`
      const hasTag = i18n.te(transString)
      return hasTag ? i18n.t(transString) : null
    })
    const tagIcon = computed(() => {
      return isWebinar.value ? 'video_library' : 'library_books'
    })
    const image = computed(() => {
      const imageUrl = knowledge?.value?.imageURL
      return imageUrl || null
    })
    const date = computed(() => {
      const dateValue = knowledge?.value?.date
      const dateType = isWebinar?.value ? 'full-timezone' : 'date'
      return dateValue ? i18n.d(new Date(dateValue), dateType) : ''
    })
    const slug = computed(() => {
      return knowledge?.value?.slug
    })
    const detailPageLink = computed(() => {
      const typeVar = isWebinar.value ? 'webinar' : 'whitepaper'
      return localePath({
        name: `knowledge-${typeVar}s-${typeVar}`,
        params: { [typeVar]: slug.value },
      })
    })
    const name = computed(() => {
      return knowledge?.value?.name
    })
    const tags = computed(() => {
      return knowledge?.value?.tags || []
    })
    const summary = computed(() => {
      return knowledge?.value?.summary
    })
    const id = computed(() => {
      return knowledge?.value?.id
    })
    const type = computed(() => {
      return knowledge?.value?.type
    })
    const assetUrl = computed(() => {
      return knowledge?.value?.assetURL
    })
    return {
      isWebinar,
      tagIcon,
      image,
      date,
      detailPageLink,
      tag,
      name,
      tags,
      summary,
      id,
      type,
      assetUrl,
    }
  },
})
</script>

<style lang="scss">
.knowledge-card {
  .tag-content {
    @apply tw-text-base;
  }

  &-tag {
    @apply tw-flex;

    @screen lg {
      @apply tw-mt-2;
    }

    &__icon {
      @apply tw-mr-1;
      @apply tw-my-auto;
    }

    &__label {
      @apply tw-my-auto;
    }
  }

  &-action-items {
    @apply tw-flex;
    @apply tw-justify-between;

    &__detail {
      @apply tw-mr-2;
      @apply tw-pl-0;
      @apply tw-border-0;
      @apply tw-max-w-fit;
    }
  }
}
</style>
