<template>
  <div class="myaccount-sidebar">
    <div class="myaccount-sidebar__desktop">
      <MyAccountNavigation variant="sidebar" />
    </div>
    <div class="myaccount-sidebar__mobile">
      <GenericHorizontalSlider>
        <MyAccountNavigation variant="horizontal" />
      </GenericHorizontalSlider>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import GenericHorizontalSlider from '~/components/molecules/GenericHorizontalSlider/GenericHorizontalSlider.vue'
import MyAccountNavigation from '../partials/MyAccountNavigation.vue'

export default defineComponent({
  components: {
    GenericHorizontalSlider,
    MyAccountNavigation,
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
    margin: 0 -1.25rem;

    @screen md {
      margin: 0 -1.5rem;
    }

    @screen lg {
      @apply tw-hidden;
    }
  }
}
</style>
