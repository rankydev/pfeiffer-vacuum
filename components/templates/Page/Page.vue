<template>
  <div>
    <div class="container">
      <div>
        <Logo />
        <h1>pvweb</h1>
        <h3 class="subtitle">Website for Pfeiffer Vacuum</h3>
        <p>{{ text }}</p>
        <div class="links">
          <a
            href="https://nuxtjs.org/"
            target="_blank"
            rel="noopener noreferrer"
            class="button--green"
          >
            Documentation
          </a>
          <a
            href="https://github.com/nuxt/nuxt.js"
            target="_blank"
            rel="noopener noreferrer"
            class="button--grey"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>

    <main class="js-page-wrapper flex-grow">
      <slot>
        <nuxt-dynamic
          v-for="item in body"
          :key="item._uid"
          v-editable="item"
          :name="item.component"
          v-bind="item"
        />
      </slot>
    </main>
  </div>
</template>

<script lang="js">
import { defineComponent, toRefs } from '@nuxtjs/composition-api'
import Logo from '~/components/atoms/Logo/Logo.vue'

export default defineComponent({
  name: 'Page',
  components: { Logo },
  props: {
    content: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const { content } = toRefs(props)
    const { text, body } = content.value

    return {
      text,
      body
    }
  }
})
</script>

<style lang="scss">
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/

.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.button {
  &--green {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #3b8070;
    color: #3b8070;
    text-decoration: none;
    padding: 10px 30px;

    &:hover {
      color: #fff;
      background-color: #3b8070;
    }
  }

  &--grey {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #35495e;
    color: #35495e;
    text-decoration: none;
    padding: 10px 30px;
    margin-left: 15px;

    &:hover {
      color: #fff;
      background-color: #35495e;
    }
  }
}
</style>
