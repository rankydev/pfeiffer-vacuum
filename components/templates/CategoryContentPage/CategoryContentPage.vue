<template>
  <Page :content="content">
    <template #onPageNavigation>
      <OnPageNavigation v-bind="(quicklinks || [])[0]">
        <Button
          v-if="hasLinkedCat"
          :label="$t('navigation.button.shop.label')"
          :href="href"
          size="small"
        />
      </OnPageNavigation>
    </template>
  </Page>
</template>

<script>
import { defineComponent, computed, useContext } from '@nuxtjs/composition-api'
import OnPageNavigation from '~/components/molecules/OnPageNavigation/OnPageNavigation'
import Button from '~/components/atoms/Button/Button'
import Page from '~/components/templates/Page/Page'
import { joinURL } from 'ufo'

export default defineComponent({
  name: 'CategoryContentPage',
  components: {
    Page,
    OnPageNavigation,
    Button,
  },
  props: {
    content: {
      type: Object,
      default: /* istanbul ignore next */ () => ({}),
    },
  },
  setup(props) {
    const context = useContext()

    const path = context.app.localePath('shop-categories')
    const catId = computed(() => props.content.categoryShopId || '')
    const hasLinkedCat = computed(() => catId.value.length > 0)
    const href = computed(() => joinURL(path, catId.value.toUpperCase()))

    return {
      hasLinkedCat,
      href,
      quicklinks: props.content.quicklinks,
    }
  },
})
</script>
