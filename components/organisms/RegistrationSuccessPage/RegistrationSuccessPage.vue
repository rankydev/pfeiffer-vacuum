<template>
  <div class="registration-success-page">
    <div class="registration-success-page--content-wrapper">
      <Icon class="registration-success-page__icon" icon="check_circle" />
      <h1 class="registration-success-page__title">
        {{ $t('registration.registrationSuccessPage.title') }}
      </h1>
      <p class="registration-success-page__subline tw-subline-1">
        {{ $t('registration.registrationSuccessPage.subline') }}
      </p>
      <p class="registration-success-page__paragraph">
        {{ $t('registration.registrationSuccessPage.paragraph') }}
      </p>
      <Button
        class="registration-success-page__button"
        :label="$t('registration.registrationSuccessPage.buttonLabel')"
        icon="arrow_forward"
        variant="secondary"
        :href="`/${$i18n.locale}`"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import Icon from '~/components/atoms/Icon/Icon'
import Button from '~/components/atoms/Button/Button'

export default defineComponent({
  name: 'RegistrationSuccessPage',
  components: { Icon, Button },
  setup() {
    return {}
  },
})
</script>

<style lang="scss">
.registration-success-page {
  @apply tw-flex;
  @apply tw-justify-center;
  @apply tw-h-full;

  &--content-wrapper {
    @apply tw-flex tw-flex-col;
    @apply tw-items-center;
    max-width: 745px;
  }

  &__icon {
    @apply tw-text-pv-green;
    @apply tw-mb-4;
    font-size: 33.33px !important;

    @screen md {
      @apply tw-mb-9;
      font-size: 53.33px !important;
    }

    @screen lg {
      @apply tw-mb-14;
      font-size: 66.67px !important;
    }
  }

  &__title {
    @apply tw-text-center;
    @apply tw-mb-2;
  }

  &__subline {
    @apply tw-text-center;
    @apply tw-mb-1;

    @screen md {
      @apply tw-mb-6;
    }

    @screen lg {
      @apply tw-mb-8;
    }
  }

  &__paragraph {
    @apply tw-text-base;
    @apply tw-text-center;
    @apply tw-mb-8;

    @screen lg {
      @apply tw-mb-12;
      @apply tw-text-xl;
    }
  }

  &__button {
    @apply tw-self-stretch;

    @screen md {
      @apply tw-self-center;
    }
  }
}
</style>
