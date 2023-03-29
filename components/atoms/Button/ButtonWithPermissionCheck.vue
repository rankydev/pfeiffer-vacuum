<template>
  <Button v-bind="{ ...props }" @click="openUrl" />
</template>

<script>
import { defineComponent, toRefs, useContext } from '@nuxtjs/composition-api'
import { storeToRefs } from 'pinia'
import { useToast } from '~/composables/useToast'
import { useUserStore } from '~/stores/user'
import Button from './Button.vue'
import propsData from './partials/props.js'

export default defineComponent({
  name: 'ButtonWithPermissionCheck',
  components: {
    Button,
  },
  props: {
    ...propsData,
    loginNeeded: {
      type: Boolean,
      required: true,
    },
    onlyApproved: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const { loginNeeded, onlyApproved, href } = toRefs(props)
    const { i18n } = useContext()
    const toast = useToast()
    const userStore = useUserStore()
    const { isLoggedIn, isApprovedUser, userStatusTypeForInfoText } =
      storeToRefs(userStore)

    const openUrl = () => {
      if (onlyApproved && isLoggedIn.value && !isApprovedUser.value) {
        toast.error({
          description: i18n.t(
            `myaccount.userStatus.${userStatusTypeForInfoText.value}.functionalityInfo`
          ),
        })
      } else {
        openUrlWithLogin(href.value)
      }
    }

    const openUrlWithLogin = (url) => {
      if (loginNeeded.value && !isLoggedIn.value) {
        return userStore.login()
      }

      return window.open(url)
    }

    const buttonProps = structuredClone(props)
    delete buttonProps.href
    delete buttonProps.anchor
    return { props: buttonProps, openUrl }
  },
})
</script>

<style lang="scss"></style>
