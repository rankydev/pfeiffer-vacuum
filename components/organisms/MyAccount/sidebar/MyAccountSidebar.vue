<template>
  <div class="myaccount-sidebar">
    <div class="myaccount-sidebar__desktop">
      <MyAccountNavigation variant="sidebar" />
    </div>
    <div class="myaccount-sidebar__mobile">
      <GenericHorizontalSlider>
        <MyAccountNavigation
          variant="horizontal"
          @entry-clicked="handleEntrySelected"
        />
      </GenericHorizontalSlider>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import GenericHorizontalSlider from '~/components/molecules/GenericHorizontalSlider/GenericHorizontalSlider.vue'
import MyAccountNavigation from '../partials/MyAccountNavigation/MyAccountNavigation.vue'

export default defineComponent({
  components: {
    GenericHorizontalSlider,
    MyAccountNavigation,
  },
  setup() {
    const handleEntrySelected = ($el) => {
      $el?.target?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      })
    }

    return {
      handleEntrySelected,
    }
  },
})
</script>

<style lang="scss" scoped>
.myaccount-sidebar {
  &__desktop {
    @apply tw-hidden;

    @screen lg {
      @apply tw-block;
    }
  }

  &__mobile {
    margin: 0 -1rem;

    @screen md {
      margin: 0 -1.5rem;
    }

    @screen lg {
      @apply tw-hidden;
    }
  }
}
</style>
