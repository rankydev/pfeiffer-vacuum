<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div @click="handleClick" v-html="html" />
</template>

<script lang="js">
export default {
  props: {
    html: {
      type: String,
      required: true
    }
  },
  methods: {
    handleClick (event) {
      // non <a> elements
      if (!event.target || !event.target.attributes || !event.target.attributes.href) {
        return
      }

      const linkNode = event.target
      // NOTE: we cannot use linkNode.href here, because this is the already processed url (absolute)
      const targetUrl = linkNode.attributes.href.value

      // download links
      if (linkNode.attributes.download) {
        return
      }

      // absolute links
      if (targetUrl.startsWith('http')) {
        return
      }

      // email address link
      if (targetUrl.startsWith('mailto:')) {
        return
      }

      // telephone link
      if (targetUrl.startsWith('tel:')) {
        return
      }

      event.preventDefault()
      this.$router.push(targetUrl)
    }
  }
}
</script>
