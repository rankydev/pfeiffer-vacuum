<template>
  <div class="footer-navigation__block footer-navigation__block--newsletter">
    <h5 class="tw-text-inverse">
      {{ title }}
    </h5>
    <richtext :content="text.content" class="tw-text-inverse tw-teaser" />
    <form action="">
      <input type="text" placeholder="E-Mail" />
      <button>Send</button>
    </form>
  </div>
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'
import Richtext from '~/components/atoms/Richtext/Richtext'

export default defineComponent({
  name: 'NewsletterInput',
  components: { Richtext },
  props: {
    /**
     * Title of Newsletter section
     */
    title: {
      type: String,
      default: '',
    },
    /**
     * Richtext displayed above the form
     */
    text: {
      type: Object,
      default: () => {},
    },
    /**
     * Placeholder & form button
     */
    form: {
      type: Object,
      default: () => {},
    },
  },
})
</script>
