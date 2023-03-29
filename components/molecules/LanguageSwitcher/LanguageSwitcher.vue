<template>
  <div ref="activator" class="language-switcher">
    <div
      v-if="!isStoryblokPreview"
      class="language-switcher__wrapper"
      @click="toggleLanguageSwitcher"
    >
      <div v-if="isActive" class="language-switcher__content">
        <ul>
          <NuxtLink
            v-for="lang in $i18n.locales"
            :key="lang.code"
            :to="switchLocalePath(lang.code)"
          >
            <li>{{ lang.name }}</li>
          </NuxtLink>
        </ul>
      </div>
      <InternalBtnWrapper
        :label="$t('language.code')"
        variant="inverted"
        shape="outlined"
        gap="narrow"
        size="small"
        icon="language"
        :prepend-icon="true"
        class="language-switcher__button"
        internal-variant="language-switcher"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
import InternalBtnWrapper from '~/components/molecules/InternalBtnWrapper/InternalBtnWrapper'
import { onClickOutside } from '@vueuse/core'
import { useStoryblokVersion } from '~/composables/useStoryblokVersion'

export default defineComponent({
  name: 'LanguageSwitcher',
  components: {
    InternalBtnWrapper,
  },
  setup(_, { refs }) {
    const { isStoryblokPreview } = useStoryblokVersion()

    let stopFunction = null
    const isActive = ref(false)

    const closeLanguageSwitcher = () => {
      isActive.value = false
      stopFunction?.()
      stopFunction = null
    }

    const openLanguageSwitcher = () => {
      isActive.value = true
      stopFunction = onClickOutside(refs.activator, closeLanguageSwitcher)
    }

    const toggleLanguageSwitcher = () => {
      isActive.value ? closeLanguageSwitcher() : openLanguageSwitcher()
    }

    return {
      isStoryblokPreview,
      toggleLanguageSwitcher,
      isActive,
    }
  },
})
</script>

<style lang="scss">
@import '/assets/scss/z-index';

.language-switcher {
  &__wrapper {
    @apply tw-relative;
  }

  &__content {
    @apply tw-absolute;
    height: 14.125rem;
    width: 12.75rem;
    padding-top: 1.875rem;
  }

  &__content ul {
    @apply tw-overflow-hidden;
    @apply tw-h-full;
    @apply tw-p-0;
    @apply tw-rounded-md;
    @apply tw-bg-pv-white;
    @apply tw-relative;
    z-index: $language-switcher;
    bottom: 14.75rem;
    @apply tw-border-2;
    @apply tw-border-pv-grey-80;
    @apply tw-shadow-black-15;

    @screen lg {
      @apply tw-bottom-0;
      right: 9.5rem;
    }
  }

  &__content li:hover {
    @apply tw-bg-pv-red-lighter;
    @apply tw-text-pv-white;
  }

  &__content li {
    @apply tw-pl-2.5;
    @apply tw-text-base;
    @apply tw-leading-6;
    @apply tw-py-3;
    @apply tw-px-4;
    @apply tw-text-pv-grey-16;
  }
}
</style>
