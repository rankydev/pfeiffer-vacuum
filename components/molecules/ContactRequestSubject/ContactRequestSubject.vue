<template>
  <div>
    <div class="contact-request-subject" @click="openSubject">
      <div class="contact-request-subject__text">
        <h5 class="contact-request-subject__title">{{ title }}</h5>
        <NuxtDynamic
          v-for="item in description"
          :key="item._uid"
          class="contact-request-subject__description"
          v-bind="item"
          :name="item.uiComponent || item.component"
        />
      </div>
      <Icon
        size="large"
        :icon="isSelected ? 'edit' : 'arrow_forward'"
        class="contact-request-subject__icon"
      />
    </div>
  </div>
</template>
<script>
import Icon from '~/components/atoms/Icon/Icon'
import { defineComponent, toRefs } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ContactRequestSubject',
  components: {
    Icon,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: Array,
      default: () => [],
    },
    type: {
      type: Array,
      default: () => [],
      required: true,
    },
    isSelected: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['selected'],
  setup(props, { emit, attrs }) {
    const { isSelected } = toRefs(props)

    const openSubject = () => {
      if (isSelected.value) {
        emit('selected', {})
      } else {
        emit('selected', { id: attrs._uid, type: props.type })
      }
    }

    return { openSubject }
  },
})
</script>
<style lang="scss">
.contact-request-subject {
  $root: &;

  @apply tw-flex tw-items-center tw-justify-between;
  @apply tw-gap-4;
  @apply tw-p-6;
  @apply tw-rounded-md;
  @apply tw-border-2 tw-border-pv-grey-96;

  &__title {
    @apply tw-transition-colors tw-duration-150;
  }

  &__icon {
    @apply tw-text-pv-red;
  }

  &:hover {
    @apply tw-cursor-pointer;

    #{$root}__title,
    #{$root}__icon {
      @apply tw-text-pv-red-lighter;
    }
  }

  &__text {
    @apply tw-flex tw-flex-col;
  }
}
</style>
