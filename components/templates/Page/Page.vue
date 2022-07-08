<template>
  <div class="page-template">
    <slot name="header">
      <nuxt-dynamic
        v-for="item in top"
        :key="item._uid"
        v-editable="item"
        v-bind="item"
        :name="item.uiComponent || item.component"
      />

      <nuxt-dynamic
        v-for="item in header"
        :key="item._uid"
        v-bind="item"
        :name="item.uiComponent || item.component"
      />
    </slot>

    <slot name="onPageNavigation">
      <OnPageNavigation v-bind="(quicklinks || [])[0]" />
    </slot>

    <slot>
      <main>
        <PvSelect
          :placeholder="'Hallo hier auswählen ...?!'"
          :options="[
            {
              displayValue: 'OptionValue1',
              selectable: true,
              selected: false,
              value: 'OptionValue1',
              icon: 'arrow_forward',
            },
            {
              displayValue: 'OptionValue2',
              selectable: true,
              selected: false,
              value: 'OptionValue2',
              icon: 'arrow_forward',
            },
          ]"
          :has-error="false"
          label-key="displayValue"
          @update="logUpdate($event)"
        />
        <nuxt-dynamic
          v-for="item in stage"
          :key="item._uid"
          v-editable="item"
          v-bind="item"
          :name="item.uiComponent || item.component"
        />
        <ContentWrapper>
          <nuxt-dynamic
            v-for="item in body"
            :key="item._uid"
            v-editable="item"
            v-bind="item"
            :name="item.uiComponent || item.component"
          />
        </ContentWrapper>
      </main>
    </slot>

    <slot name="footer">
      <nuxt-dynamic
        v-for="item in bottom"
        :key="item._uid"
        v-editable="item"
        v-bind="item"
        :name="item.uiComponent || item.component"
      />

      <nuxt-dynamic
        v-for="item in footer"
        :key="item._uid"
        v-bind="item"
        :name="item.uiComponent || item.component"
      />
    </slot>
  </div>
</template>

<script>
import { defineComponent, inject, toRefs } from '@nuxtjs/composition-api'
import useMeta from '~/composables/useMeta'
import useTemplating from '~/composables/useTemplating'
import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper'
import OnPageNavigation from '~/components/molecules/OnPageNavigation/OnPageNavigation.vue'
import PvSelect from '~/components/atoms/FormComponents/PvSelect/PvSelect.vue'

export default defineComponent({
  name: 'Page',
  components: {
    ContentWrapper,
    OnPageNavigation,
    PvSelect,
  },
  props: {
    content: {
      type: Object,
      default: /* istanbul ignore next */ () => {},
    },
  },
  setup(props, context) {
    const { content } = toRefs(props)
    const translatedSlugs = inject('getTranslatedSlugs', () => [])()
    const defaultFullSlug = inject('getDefaultFullSlug', () => '')()
    const { top, header, stage, body, bottom, footer } = useTemplating(content)
    const { getMetaData } = useMeta(
      content,
      defaultFullSlug,
      translatedSlugs,
      context
    )

    const logUpdate = (x) => {
      console.log(x, 'innerValue')
    }

    return {
      top,
      header,
      stage,
      body,
      bottom,
      footer,
      quicklinks: content.value.quicklinks,
      metaData: getMetaData(),
      logUpdate,
    }
  },
  head() {
    return this.metaData
  },
})
</script>

<style lang="scss">
.page-template {
  @apply tw-flex;
  @apply tw-flex-col;
  @apply tw-h-screen;
}
</style>
