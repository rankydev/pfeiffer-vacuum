<template>
  <div class="knowledge-authors-list">
    <h2 class="knowledge-authors-list__headline">
      {{ isWhitepapers ? $t('knowledge.authors') : $t('knowledge.speaker') }}
    </h2>
    <div class="knowledge-authors-list__authorlist">
      <KnowledgeAuthor
        v-for="author in authorcardlist"
        :key="author.name"
        class="knowledge-authors-list__author"
        :name="author.name"
        :title="author.title"
        :image="author.image"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import KnowledgeAuthor from '~/components/molecules/KnowledgeAuthor/KnowledgeAuthor'
import { useKnowledgeStore } from '~/stores/knowledge'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'KnowledgeAuthorsList',
  components: { KnowledgeAuthor },
  props: {
    authorcardlist: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  setup() {
    const knowledgeStore = useKnowledgeStore()
    const { isWhitepapers } = storeToRefs(knowledgeStore)

    return {
      isWhitepapers,
    }
  },
})
</script>

<style lang="scss">
.knowledge-authors-list {
  @apply tw-bg-pv-grey-96;
  @apply tw-p-4;

  @screen md {
    @apply tw-p-6;
  }

  @screen lg {
    @apply tw-p-8;
  }

  &__headline {
    @apply tw-mb-4;

    @screen md {
      @apply tw-mb-6;
    }
  }

  &__authorlist {
    @screen md {
      @apply tw-flex;
      @apply tw-flex-wrap;
      @apply tw-w-full;
    }
  }

  &__author {
    @apply tw-w-full;

    @screen md {
      @apply tw-w-1/2;
    }
    @screen lg {
      @apply tw-w-full;
    }
  }
}
</style>
