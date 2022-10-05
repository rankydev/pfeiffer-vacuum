<template>
  <div class="language-switcher">
    <div class="language-switcher__wrapper">
      <div class="language-switcher__content">
        <ul>
          <a href="#"><li>Deutsch</li></a>
          <a href="#"><li>English</li></a>
          <a href="#"><li>Español</li></a>
          <a href="#"><li>中国人</li></a>
          <a href="#"><li>한국인</li></a>
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
import { defineComponent } from '@nuxtjs/composition-api'

import Button from '~/components/atoms/Button/Button'

export default defineComponent({
  name: 'LanguageSwitcher',
  components: {
    Button,
  },
})
</script>

<style lang="scss">
.language-switcher {
  &__button {
    color: #7a7a7a !important;
    padding: 0;
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
  }

  &__content li:hover {
    @apply tw-bg-pv-red-lighter;
    @apply tw-text-pv-white;
  }

  &__content li {
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
