import { ref, watch } from '@nuxtjs/composition-api'

const useTemplating = (content) => {
  const top = ref(undefined)
  const stage = ref(undefined)
  const header = ref(undefined)
  const body = ref(undefined)
  const bottom = ref(undefined)
  const footer = ref(undefined)
  const titleTemplate = ref(undefined)

  const getTemplateContentByName = (name) => {
    return (
      content.value.template &&
      content.value.template.content &&
      content.value.template.content[name]
    )
  }

  const getCustomContentByName = (name) => {
    const customContent = content.value[name]
    const hasCustomContent = customContent && customContent.length > 0

    return hasCustomContent && customContent
  }

  /*
  const hasCustomContent = (name) => {
    return !!getCustomContentByName(name)
  }
   */

  const getContentByName = (name) => {
    const templateContent = getTemplateContentByName(name)
    const customContent = getCustomContentByName(name)

    return customContent || templateContent
  }

  const getContent = () => {
    top.value = getContentByName('top')
    stage.value = getContentByName('stage')
    header.value = getContentByName('header')
    body.value = getContentByName('body')
    bottom.value = getContentByName('bottom')
    footer.value = getContentByName('footer')
    titleTemplate.value = getTemplateContentByName('titleTemplate')
  }

  watch(content, getContent, { immediate: true })

  return {
    top,
    stage,
    header,
    body,
    bottom,
    footer,
    titleTemplate,
  }
}

export default useTemplating
