<template>
  <div class="pv-card">
    <Link class="pv-card__content" v-bind="{ href }">
      <div class="pv-card__image" :class="`pv-card__image--${imageSize}`">
        <div v-if="hasSlot('tag')" class="pv-card__tag">
          <!-- @slot displays a text on top of the image.
          Should only be used with imageSize cover -->
          <slot name="tag" />
        </div>
        <!-- @slot the card image -->
        <slot name="image" />
      </div>

      <div v-if="hasSlot('subheading')" class="pv-card__subheading">
        <!-- @slot To show additional informations above the heading  -->
        <slot name="subheading" />
      </div>

      <h3 class="pv-card__heading">
        <!-- @slot the main heading of the card component -->
        <slot name="heading" />
      </h3>

      <div v-if="hasSlot('tags')" class="pv-card__tags">
        <!-- @slot tags normally displayed between heading and description -->
        <slot name="tags" />
      </div>

      <div v-if="hasSlot('description')" class="pv-card__description">
        <!-- @slot short description which displays up to 4 lines of text -->
        <slot name="description" />
      </div>
    </Link>

    <div v-if="hasSlot('additionalInfo')" class="pv-card__additional-info">
      <!-- @slot information which lives outside of the link continer of the card -->
      <slot name="additionalInfo" />
    </div>

    <div v-if="hasSlot('actionItems')" class="pv-card__action-items">
      <!-- @slot this slot should contain action items like buttons or links or input fields -->
      <slot name="actionItems" />
    </div>
  </div>
</template>

<script>
/**
 * Magic comments for PurgeCSS
 * pv-card__image--contain
 * pv-card__image--cover
 **/
import { defineComponent } from '@nuxtjs/composition-api'
import Link from '~/components/atoms/Link/Link'

export default defineComponent({
  components: { Link },
  props: {
    /**
     * Link where the card points to
     */
    href: {
      type: String,
      required: true,
    },
    /**
     * The defines if the image should be fill the whole space or pced inside the wrapper
     * @values cover, contain
     */
    imageSize: {
      type: String,
      default: 'cover',
      validator: (val) => ['cover', 'contain'].includes(val),
    },
  },
  setup(_, { slots }) {
    const hasSlot = (slot) => !!slots?.[slot]

    return { hasSlot }
  },
})
</script>

<style lang="scss">
@import '/assets/scss/mixins';

$card-image-height: 200px;

.search-results-highlight {
  @apply tw-text-pv-red;
  @apply tw-font-normal;
}

.pv-card {
  @include box-shadow;
  @apply tw-bg-pv-white;
  @apply tw-flex-col;
  @apply tw-h-full;
  @apply tw-rounded-lg;
  @apply tw-overflow-hidden;
  @apply tw-p-4;

  /**
   * need to be important because the slick slider will
   * append 'display: inline-block' onto the element
   */
  display: flex !important;

  @screen lg {
    @apply tw-py-6;
  }

  &__image {
    @apply tw-relative;
    @apply tw-flex;
    @apply tw-items-center;
    @apply tw-justify-center;
    @apply tw-content-center;
    @apply tw-mb-6;
    height: $card-image-height;

    img {
      @apply tw-w-full;
      height: $card-image-height;
    }

    &--cover {
      @apply tw--mx-4 tw--mt-4;

      @screen lg {
        @apply tw--mt-6;
      }

      img {
        @apply tw-object-cover;
      }
    }

    &--contain {
      img {
        @apply tw-object-contain;
      }
    }
  }

  &__tag {
    @apply tw-absolute;
    @apply tw-top-0 tw-left-4;
    @apply tw-bg-pv-red;
    @apply tw-text-pv-white;
    @apply tw-text-xs;
    @apply tw-py-1 tw-px-1.5;
    @apply tw-font-bold;
  }

  &__subheading {
    @apply tw-text-pv-grey-64;
    @apply tw-font-bold;
    @apply tw-text-xs;
    @apply tw-mb-1;
  }

  &__heading {
    @apply tw-text-lg;
    @apply tw-font-bold;
    @apply tw-mb-2;
  }

  &__tags {
    @apply tw-text-xs;
    @apply tw--mt-1.5;
    @apply tw-mb-2;
  }

  &__description {
    @apply tw-block;
    @apply tw-overflow-hidden;
    @apply tw-text-base;
    @apply tw-leading-6;
    @apply tw-mb-4;

    @include text-overflow;
  }

  &__additional-info {
    @apply tw-text-pv-grey-48;
    @apply tw-text-xs;
    @apply tw-mt-auto;
  }

  &__content {
    @apply tw-flex tw-flex-col tw-flex-auto;
    @apply tw-text-pv-black;

    &:hover {
      @apply tw-no-underline;

      .pv-card {
        &__heading,
        &__subheading {
          @apply tw-text-pv-red;
        }
      }
    }
  }
}
</style>
