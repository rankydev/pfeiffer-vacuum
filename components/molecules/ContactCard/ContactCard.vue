<template>
  <div class="contact-card">
    <div class="contact-card__headline-with-icon">
      <h2 class="contact-card__headline-with-icon--headline">
        {{ companyName }}
      </h2>
      <Icon icon="perm_contact_calendar" size="large" />
    </div>
    <div class="contact-card__information">
      <div>{{ street }}</div>
      <div>{{ postalCode }}, {{ city }}</div>
      <div>{{ country }}</div>
    </div>
    <div class="contact-card__buttons">
      <Button
        class="contact-card__buttons--telephone-button"
        icon="phone"
        :label="phone"
        variant="secondary"
        shape="plain"
        :prepend-icon="true"
      />
      <br v-if="!isDesktop" />
      <Button
        icon="mail_outline"
        :label="$t('form.contactPersons.contactButton')"
        variant="secondary"
        :shape="isDesktop ? 'outlined' : 'plain'"
        :prepend-icon="!isDesktop"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import Button from '~/components/atoms/Button/Button.vue'
import Icon from '~/components/atoms/Icon/Icon.vue'

export default defineComponent({
  components: {
    Button,
    Icon,
  },
  props: {
    companyName: {
      type: String,
      default: undefined,
    },
    street: {
      type: String,
      default: undefined,
    },
    postalCode: {
      type: String,
      default: undefined,
    },
    city: {
      type: String,
      default: undefined,
    },
    country: {
      type: String,
      default: undefined,
    },
    phone: {
      type: String,
      default: undefined,
    },
  },
  setup() {
    const { app } = useContext()

    const { isDesktop } = app.$breakpoints

    return { isDesktop }
  },
})
</script>

<style lang="scss">
.contact-card {
  @apply tw-bg-pv-white;
  @apply tw-rounded-md;
  @apply tw-p-6;

  &__headline-with-icon {
    @apply tw-flex;
    @apply tw-pb-2;
    @apply tw-text-pv-grey-16;

    &--headline {
      @apply tw-w-full;
      @apply tw-text-pv-grey-16;
    }
  }

  &__information {
    @apply tw-pb-2;
    @apply tw-text-pv-grey-16;
    @apply tw-text-base tw-leading-6;
  }

  &__buttons {
    @apply tw-flex;

    &--telephone-button {
      @apply tw-pb-6;

      @screen lg {
        @apply tw-pb-3;
        @apply tw-mr-8;
      }
    }
  }
}
</style>
