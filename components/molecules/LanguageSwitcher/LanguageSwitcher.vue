<template>
  <div class="language-switcher">
    <div class="language-switcher__wrapper">
      <div class="language-switcher__content">
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
    color: #fff !important;
    @apply tw-p-0;
    @apply tw-align-middle;
    box-shadow: none !important;
    font-size: 0.75rem !important;

    @screen lg {
      color: #7a7a7a !important;
    }
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
    width: 12.75rem;
    padding-top: 1.875rem;
    transition: all 0.5s ease;
    @apply tw-delay-200;
  }

  &__wrapper:active .content,
  &__content:hover {
    height: fit-content;
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
    bottom: 14.75rem;

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
}
</style>
