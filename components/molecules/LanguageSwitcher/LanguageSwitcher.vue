<template>
  <div class="language-switcher">
    <div v-if="isDesktop" class="language-switcher__wrapper">
      <div class="language-switcher__content">
        <ul>
          <NuxtLink :to="switchLocalePath('de')"><li>Deutsch</li></NuxtLink>
          <NuxtLink :to="switchLocalePath('en')"><li>English</li></NuxtLink>
          <NuxtLink :to="switchLocalePath('es')"><li>Español</li></NuxtLink>
          <NuxtLink :to="switchLocalePath('ko')"><li>中国人</li></NuxtLink>
          <NuxtLink :to="switchLocalePath('zh')"><li>한국인</li></NuxtLink>
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
    <div v-else>
      <select
        id="language-select"
        name="language"
        class="language-select"
        :onchange="switchPath(value)"
      >
        <option data-icon="language">{{ $t('language.code') }}</option>
        <option v-if="$t('language.code') !== 'DE'" value="de">Deutsch</option>
        <option v-if="$t('language.code') !== 'EN'" value="en">English</option>
        <option v-if="$t('language.code') !== 'ES'" value="es">Español</option>
        <option v-if="$t('language.code') !== 'KO'" value="ko">>中国人</option>
        <option v-if="$t('language.code') !== 'ZH'" value="zh">한국인</option>
      </select>
    </div>
  </div>
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import Button from '~/components/atoms/Button/Button'

export default defineComponent({
  name: 'LanguageSwitcher',
  components: {
    Button,
  },
  setup() {
    const { app } = useContext()
    const isDesktop = app.$breakpoints.isDesktop
    const switchPath = app.switchLocalePath

    return {
      isDesktop,
      switchPath,
    }
  },
})
</script>

<style lang="scss">
.language-switcher {
  &__button {
    color: #7a7a7a !important;
    @apply tw-p-0;
    @apply tw-align-middle;
    box-shadow: none !important;
  }

  &__wrapper {
    @apply tw-relative;
  }

  &__parent {
    @apply tw-w-full;
  }

  &__content {
    @apply tw-absolute;
    @apply tw-h-0;
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
    @apply tw-rounded-md;
    @apply tw-delay-200;
    @apply tw-bg-pv-white;
    @apply tw-relative;
    @apply tw-z-10;
    bottom: 275px;

    @screen lg {
      bottom: 0;
      right: 152px;
    }
  }

  &__content li:hover,
  &__content--link:hover {
    @apply tw-bg-pv-red-lighter;
    @apply tw-text-pv-white;
  }

  &__content li,
  &__content--link {
    padding-left: 10px;
    @apply tw-text-base;
    @apply tw-leading-6;
    @apply tw-py-3;
    @apply tw-px-4;
    @apply tw-text-pv-black;
  }
}

.language-select {
  color: #7a7a7a !important;
  background-color: rgb(82 82 82 / var(--tw-bg-opacity));

  #language-select * {
    @apply tw-text-base;
    @apply tw-leading-6;
    width: 204px;
    height: 48px;
    @apply tw-py-3;
    @apply tw-px-4;
    @apply tw-text-pv-black;
    @apply tw-text-pv-white;
  }
}
</style>
