<template>
  <Link :is="links[0] ? 'Link' : 'template'" v-bind="links[0] || {}">
    <Icon class="social-media__icon" :icon="icon" type="svg" />
  </Link>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    /**
     * The icon to display
     * @values facebook, twitter, linkedin, youtube, xing, wechat, zhihu
     */
    icon: {
      type: String,
      required: true,
      validator: (val) =>
        [
          'facebook',
          'twitter',
          'linkedin',
          'youtube',
          'xing',
          'wechat',
          'zhihu',
        ].includes(val),
    },
    /**
     * The size of the icon
     * @values small, base, large, xlarge
     */
    links: {
      type: Array,
      default: () => [],
    },
  },
})
</script>
