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
      <Button
        :label="$t('language.code')"
        variant="inverted"
        shape="outlined"
        gap="narrow"
        size="small"
        icon="language"
        :prepend-icon="true"
        class="language-switcher__button"
      />
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  useRoute,
  computed,
  ref,
} from '@nuxtjs/composition-api'
import Button from '~/components/atoms/Button/Button'
import { onClickOutside } from '@vueuse/core'

export default defineComponent({
  name: 'LanguageSwitcher',
  components: {
    Button,
  },
  setup(_, { refs }) {
    const route = useRoute()

    const isStoryblokPreview = computed(() => {
      return route.value.query._storyblok
    })

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
.language-switcher {
  &__button {
    color: #fff !important;
    @apply tw-p-0;
    @apply tw-align-middle;
    box-shadow: none !important;
    font-size: 0.75rem !important;

    @screen lg {
      color: #7a7a7a !important;
    }
  }

  &__button:hover {
    background-color: unset !important;
  }

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
    @apply tw-z-10;
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
    @apply tw-text-pv-black;
  }

  .button--small {
    @apply tw-px-0;
    @apply tw-pb-0;
  }
}
</style>
