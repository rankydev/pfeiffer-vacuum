import { ref, watch } from '@nuxtjs/composition-api'
// TODO With the changes I made this composable seems obsolete - check if we need it, espacially if something is done here that is missing in the other code
const useTemplating = (content) => {
  const top = ref(undefined)
  const header = ref(undefined)
  const stage = ref(undefined)
  const body = ref(undefined)
  const bottom = ref(undefined)
  const footer = ref(undefined)
  const stickyBar = ref(undefined)

  const getTemplateContentByName = (name) => {
    return content?.value?.template?.content?.[name]
  }

  const getCustomContentByName = (name) => {
    const customContent = content.value[name]
    const hasCustomContent = customContent?.length > 0

    return hasCustomContent && customContent
  }

  const getContentByName = (name) => {
    const templateContent = getTemplateContentByName(name)
    const customContent = getCustomContentByName(name)

    return customContent || templateContent
  }

  const getContent = () => {
    top.value = getContentByName('top')
    header.value = getContentByName('header')
    stage.value = getContentByName('stage')
    body.value = getContentByName('body')
    bottom.value = getContentByName('bottom')
    footer.value = getContentByName('footer')
    stickyBar.value = getContentByName('stickyBar')
  }

  watch(content, getContent, { immediate: true })

  return {
    top,
    header,
    stage,
    body,
    bottom,
    footer,
    stickyBar,
  }
}

export default useTemplating
