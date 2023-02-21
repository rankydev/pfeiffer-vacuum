<template>
  <GenericCard href="detailPageLink" image-size="cover">
    <template #tag>
      <span class="knowledge-card__tag">
        <v-icon class="knowledge-card__tag-icon" :size="16">{{
          tagIcon
        }}</v-icon>
        {{ tag }}
      </span>
    </template>
    <template #image>
      <ResponsiveImage
        v-if="image"
        :src="image"
        :aspect-ratio="isWebinar ? '16:9' : '3:2'"
        :fallback-image-icon-size="isWebinar ? 'large' : 'xxlarge'"
      />
    </template>
    <template #content>
      <div class="knowledge-card__content">
        <h3 class="knowledge-card__title">{{ knowledge.title }}</h3>
        <p class="knowledge-card__date">{{ getDate }}</p>
      </div>
    </template>
  </GenericCard>
</template>

<script>
import {
  defineComponent,
  computed,
  toRefs,
  useContext,
} from '@nuxtjs/composition-api'
import GenericCard from '~/components/atoms/GenericCard/GenericCard.vue'
export default defineComponent({
  name: 'KnowledgeCard',
  components: {
    GenericCard,
  },
  props: {
    knowledge: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { knowledge } = toRefs(props)
    const { localePath } = useContext()
    const isWebinar = computed(() => knowledge.value.type === 'WEBINAR')
    const tag = computed(() => {
      const type = isWebinar.value ? 'webinar' : 'whitepaper'
      const transString = `knowledge.${type}.heading`
      const hasTag = $te(transString)
      return hasTag ? $t(transString) : null
    })
    const tagIcon = computed(() => {
      return isWebinar.value ? 'video_library' : 'library_books'
    })
    const image = computed(() => {
      const imageUrl = knowledge.value?.imageURL
      return imageUrl || null
    })
    const getDate = computed(() => {
      const { date } = knowledge.value
      const dateType = isWebinar.value ? 'full-timezone' : 'date'
      return date ? this.$d(new Date(date), dateType) : ''
    })
    const detailPageLink = computed(() => {
      const type = isWebinar.value ? 'webinar' : 'whitepaper'
      return localePath({
        name: `knowledge-${type}s-${type}`,
        params: { [type]: this.knowledge.slug },
      })
    })
    return { isWebinar, tagIcon, image, getDate, detailPageLink, tag }
  },
})
</script>

<style></style>
