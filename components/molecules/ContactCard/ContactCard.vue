<template>
  <div class="contact-card">
    <div class="contact-card__headline-with-icon">
      <h2 class="contact-card__headline-with-icon--headline">
        {{ companyName }}
      </h2>
      <Icon icon="perm_contact_calendar" size="large" />
    </div>
    <div class="contact-card__tags">
      <Tag
        v-for="(tag, id) in tags"
        :key="id"
        :content="tag.displayValue"
        class="contact-card__tags--tag"
      />
    </div>
    <div class="contact-card__information">
      <div>{{ street }}</div>
      <div>{{ postalCode }} {{ city }}</div>
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
        :href="`tel:${phone}`"
      />
      <br v-if="!isDesktop" />
      <Button
        icon="mail_outline"
        :label="$t('form.contactPersons.contactButton')"
        variant="secondary"
        :shape="isDesktop ? 'outlined' : 'plain'"
        :prepend-icon="!isDesktop"
        :href="`mailto:${email}`"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import Button from '~/components/atoms/Button/Button.vue'
import Icon from '~/components/atoms/Icon/Icon.vue'
import Tag from '~/components/atoms/Tag/Tag.vue'

export default defineComponent({
  components: {
    Button,
    Icon,
    Tag,
  },
  props: {
    companyName: {
      type: String,
      default: undefined,
    },
    tags: {
      type: Array,
      default: () => [],
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
    email: {
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
  @apply tw-rounded-lg;
  @apply tw-p-6;
  @apply tw-border-pv-grey-96;
  @apply tw-border-2;
  box-shadow: 0 40px 40px -40px #ccc;

  &__headline-with-icon {
    @apply tw-flex;
    @apply tw-pb-2.5;
    @apply tw-text-pv-grey-16;

    &--headline {
      @apply tw-w-full;
      @apply tw-text-pv-grey-16;
    }
  }

  &__tags {
    @apply tw-flex;
    @apply tw-gap-x-4;
    @apply tw-pb-2.5;

    &--tag {
      @apply tw-bg-pv-red;
      font-size: 10px;
      @apply tw-leading-4;

      span {
        @apply tw-text-pv-white;
      }
    }
  }

  &__information {
    @apply tw-pb-2;
    @apply tw-text-pv-grey-16;
    @apply tw-text-base tw-leading-6;
  }

  &__buttons {
    @screen lg {
      @apply tw-flex;
    }

    .button {
      @screen lg {
        @apply tw-w-1/2;
      }
    }

    &--telephone-button {
      @apply tw-pb-6;
      @apply tw-justify-start;

      @screen lg {
        @apply tw-pb-3;
        @apply tw-mr-8;
      }
    }
  }
}
</style>
