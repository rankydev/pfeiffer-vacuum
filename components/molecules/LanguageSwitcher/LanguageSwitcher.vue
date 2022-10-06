<template>
  <div class="language-switcher">
    <div class="language-switcher__wrapper">
      <div class="language-switcher__content">
        <ul>
          <a :href="newUrl('de')"><li>Deutsch</li></a>
          <a :href="newUrl('en')"><li>English</li></a>
          <a :href="newUrl('en')"><li>Español</li></a>
          <a :href="newUrl('ko')"><li>中国人</li></a>
          <a :href="newUrl('en')"><li>한국인</li></a>
        </ul>
      </div>
      <Button
        :label="$t('language.code')"
        variant="inverted"
        shape="outlined"
        gap="narrow"
        icon="language"
        :prepend-icon="true"
        class="language-switcher__button"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import Button from '~/components/atoms/Button/Button'

export default defineComponent({
  name: 'LanguageSwitcher',
  components: {
    Button,
  },
  setup() {
    const route = useRoute()

    const newUrl = (newLanguage) => {
      const oldUrl = route.value.fullPath
      const pathArray = oldUrl.split('/')
      pathArray.splice(0, 1)
      pathArray[0] = newLanguage
      const newPath = '/' + pathArray.join('/')
      return newPath
    }

    return {
      newUrl,
    }
  },
})
</script>

<style lang="scss">
.language-switcher {
  &__button {
    color: #7a7a7a !important;
    padding: 0;
    vertical-align: middle;
  }

  &__wrapper {
    @apply tw-relative;
  }

  &__parent {
    @apply tw-w-full;
  }

  &__content {
    @apply tw-absolute;
    top: 0;
    height: 0;
    width: 204px;
    padding-top: 30px;
    transition: all 0.5s ease;
    @apply tw-delay-200;
  }

  &__wrapper:active .content,
  &__content:hover {
    height: 270px;
    transition-delay: 0s;
  }

  &__content:hover ul,
  &__wrapper:active .content ul {
    @apply tw-border-2;
    @apply tw-border-pv-grey-80;
    @apply tw-shadow-black-15;
    transition-delay: 0s;
  }

  &__content ul {
    @apply tw-overflow-hidden;
    @apply tw-h-full;
    @apply tw-p-0;
    @apply tw-mt-1;
    @apply tw-rounded-md;
    @apply tw-static;
    @apply tw-delay-200;
    @apply tw-bg-pv-white;
    right: 152px;
    z-index: 100;
    position: relative;
  }

  &__content li:hover,
  &__content--link:hover {
    @apply tw-bg-pv-red-lighter;
    @apply tw-text-pv-white;
  }

  &__content li,
  &__content--link {
    font-size: 14px;
    padding-left: 10px;
    @apply tw-text-base;
    @apply tw-leading-6;
    @apply tw-py-3;
    @apply tw-px-4;
    @apply tw-text-pv-black;
  }
}
</style>
