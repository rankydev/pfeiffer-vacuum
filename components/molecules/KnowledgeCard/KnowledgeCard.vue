<template>
  <GenericCard :href="detailPageLink" image-size="cover">
    <template v-if="tag" #tag>
      <span class="knowledge-card__tag">
        <Icon :icon="tagIcon" size="xsmall" class="knowledge-card__tag-icon" />
        <span class="knowledge-card__tag-label">{{ tag }}</span>
      </span>
    </template>
    <template #image>
      <ResponsiveImage
        v-if="image"
        :image="image"
        aspect-ratio="3:2"
        :rounded="false"
        :mode-full="true"
      />
    </template>
    <template v-if="date" #subheading>
      <Icon icon="date_range" size="xsmall" />
      {{ date }}
    </template>
    <template #heading>
      {{ name }}
    </template>
    <template #tags>
      <div class="knowledge-card__tags">
        <Tag v-for="(tagItem, idx) in tags" :key="idx" :content="tagItem" />
      </div>
    </template>
    <template #description>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <p v-html="summary" />
    </template>
    <template #actionItems>
      <div class="knowledge-card__action-items">
        <Button
          shape="plain"
          variant="secondary"
          gap="narrow"
          class="knowledge-card__action-items-detail"
          :href="detailPageLink"
          icon="arrow_forward"
          :label="$t('knowledge.details')"
        />
        <KnowledgeAssetButton
          :webinar-registration-id="id"
          :type="type"
          :date="entry.date"
          :asset-url="assetUrl"
          :prevent-full-width="true"
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
    entry: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  setup(props) {
    const { entry } = toRefs(props)
    const { localePath, i18n } = useContext()
    const isWebinar = computed(() => entry?.value?.type === 'WEBINAR')
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
      const imageUrl = entry?.value?.imageURL
      return { originalFilename: imageUrl || null }
    })
    const date = computed(() => {
      const dateValue = entry?.value?.date
      const dateType = isWebinar?.value ? 'full-timezone' : 'date'
      const hasDate = i18n.te('knowledge.clock')
      let dateLabel = (
        dateValue ? i18n.d(new Date(dateValue), dateType) : ''
      ).replace(',', ' |')
      if (hasDate) {
        dateLabel = dateLabel.replace(
          /(.*\s)(.*)/,
          `$1${i18n.t('knowledge.clock')}`
        )
      }
      return dateLabel
    })
    const slug = computed(() => {
      return entry?.value?.slug
    })
    const detailPageLink = computed(() => {
      const typeVar = isWebinar.value ? 'webinar' : 'whitepaper'
      return localePath({
        name: `knowledge-${typeVar}s-${typeVar}`,
        params: { [typeVar]: slug.value },
      })
    })
    const name = computed(() => {
      return entry?.value?.name
    })
    const tags = computed(() => {
      return entry?.value?.tags || []
    })
    const summary = computed(() => {
      return entry?.value?.summary
    })
    const id = computed(() => {
      return entry?.value?.id
    })
    const type = computed(() => {
      return entry?.value?.type
    })
    const assetUrl = computed(() => {
      return entry?.value?.assetURL
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

  &__tag {
    @apply tw-flex;

    @screen lg {
      @apply tw-mt-2;
    }

    &-icon {
      @apply tw-mr-1;
      @apply tw-my-auto;
    }

    &-label {
      @apply tw-my-auto;
    }
  }

  &__tags {
    @apply tw-flex;
    @apply tw-gap-1;
  }

  &__action-items {
    @apply tw-flex;
    @apply tw-justify-between;

    &-detail {
      @apply tw-mr-2;
      @apply tw-pl-0;
      @apply tw-border-0;
      @apply tw-max-w-fit;

      a {
        @apply tw-flex;

        .material-icons {
          @apply tw-ml-5;
        }
      }
    }
  }
}
</style>
