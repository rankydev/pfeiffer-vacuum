<template>
  <div class="language-switcher">
    <div class="wrapper">
      <div class="content">
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

  .wrapper {
    position: relative;
  }

  .parent {
    width: 100%;
  }

  .content {
    position: absolute;
    top: 0;
    height: 0;
    box-shadow: none;
    width: 204px;
    padding-top: 30px;
    transition: all 0.5s ease;
    transition-delay: 0.2s;
  }

  .wrapper:active .content,
  .content:hover {
    height: 270px;
    transition-delay: 0s;
  }

  .content:hover ul,
  .wrapper:active .content ul {
    @apply tw-border-2;
    @apply tw-border-pv-grey-80;
    @apply tw-shadow-black-15;
    transition-delay: 0s;
  }

  .content ul {
    overflow: hidden;
    height: 100%;
    @apply tw-p-0;
    @apply tw-mt-1;
    @apply tw-rounded-md;
    @apply tw-static;
    transition-delay: 0.2s;
    background: #fff;
  }

  .content li:hover {
    @apply tw-bg-pv-red-lighter;
    @apply tw-text-pv-white;
  }

  .content li {
    color: #888;
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
