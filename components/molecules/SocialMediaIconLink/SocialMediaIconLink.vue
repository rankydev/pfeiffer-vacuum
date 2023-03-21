<template>
  <Link v-bind="$attrs">
    <Icon class="social-media__icon" v-bind="{ icon, title }" type="svg" />
  </Link>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import Icon from '~/components/atoms/Icon/Icon.vue'
import Link from '~/components/atoms/Link/Link.vue'

export default defineComponent({
  name: 'SocialMediaIconLink',
  components: {
    Link,
    Icon,
  },
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
     * The icon title for accessibility
     */
    title: {
      type: String,
      default: '',
    },
  },
})
</script>
