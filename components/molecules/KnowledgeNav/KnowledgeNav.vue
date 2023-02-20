<template>
  <div class="knowledge-nav">
    <ContentWrapper>
      <div class="knowledge-nav__content">
        <NuxtLink
          class="knowledge-nav__item"
          :to="localePath('knowledge-whitepapers')"
        >
          <Icon icon="library_books" />
          <span>{{ $t('knowledge.whitepapers') }}</span>
        </NuxtLink>
        <NuxtLink
          class="knowledge-nav__item"
          :to="localePath('knowledge-webinars')"
        >
          <Icon icon="video_library" />
          <span>{{ $t('knowledge.webinars') }}</span>
        </NuxtLink>
      </div>
    </ContentWrapper>
  </div>
</template>

<script>
import Icon from '~/components/atoms/Icon/Icon.vue'
import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper'

export default {
  name: 'KnowledgeNav',
  components: {
    ContentWrapper,
    Icon,
  },
}
</script>

<style lang="scss" scoped>
.knowledge-nav {
  @apply tw-py-4;
  @apply tw-bg-pv-grey-16;

  @screen md {
    @apply tw-py-6;
  }

  @screen lg {
    @apply tw-py-8;
  }

  &__content {
    @apply tw-flex;
    @apply tw-justify-between;
    @apply tw-gap-4;
    @apply tw-flex-wrap;

    @screen md {
      @apply tw-gap-6;
    }

    @screen lg {
      @apply tw-gap-8;
    }
  }

  &__item {
    @apply tw-flex;
    @apply tw-items-center;
    @apply tw-flex-grow;
    @apply tw-basis-0;
    @apply tw-p-3;
    @apply tw-gap-3;
    @apply tw-bg-pv-white;
    @apply tw-transition-colors;

    &:hover {
      @apply tw-bg-pv-red;
      @apply tw-text-pv-white;
    }
  }
}
</style>
