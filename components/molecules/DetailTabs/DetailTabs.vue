<template>
  <ContentWrapper :breakout="isMobile">
    <GenericTabs
      :tabs="renderableTabs"
      :active-tab="currentTabSelected"
      @selectTab="selectTab"
    >
      <template #activeTabContent>
        <DetailTabContent
          class="tab-navigation__desktop__content"
          :last-tab-selected="currentTabSelected"
        />
      </template>
    </GenericTabs>
  </ContentWrapper>
</template>

<script>
import {
  defineComponent,
  useContext,
  ref,
  computed,
} from '@nuxtjs/composition-api'

import { useProductStore } from '~/stores/product'
import { storeToRefs } from 'pinia'

import getSortedFeatures from './partials/getSortedFeatures'

import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper'
import GenericTabs from '~/components/molecules/GenericTabs/GenericTabs'
import DetailTabContent from './DetailTabContent/DetailTabContent'

export default defineComponent({
  components: {
    ContentWrapper,
    GenericTabs,
    DetailTabContent,
  },
  props: {
    accessories: {
      type: Array,
      default: () => [],
    },
    references: {
      type: Array,
      default: () => [],
    },
    downloads: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const { i18n, app } = useContext()
    const { isMobile } = app.$breakpoints
    const productStore = useProductStore()
    const {
      product,
      productReferencesSpareParts,
      productReferencesConsumables,
      productAccessoriesGroups,
    } = storeToRefs(productStore)

    const currentTabSelected = ref('productInfo')

    const tabs = ref([
      {
        name: i18n.t('product.productInformation'),
        trigger: 'productInfo',
        active: true,
      },
      {
        name: i18n.t('product.technicalData'),
        trigger: 'technicalData',
        active: true,
      },
      {
        name: i18n.t('product.dimensions'),
        trigger: 'dimensions',
        active: true,
      },
      {
        name: i18n.t('product.accessories'),
        trigger: 'accessories',
        active: true,
      },
      {
        name: i18n.t('product.consumables'),
        trigger: 'consumables',
        active: true,
      },
      {
        name: i18n.t('product.spareParts'),
        trigger: 'spareparts',
        active: true,
      },
      {
        name: 'Service',
        trigger: 'service',
        active: false,
      },
      {
        name: i18n.t('product.downloads'),
        trigger: 'downloads',
        active: true,
      },
    ])

    const isDisabled = (code) => {
      switch (code) {
        case 'technicalData':
          return getSortedFeatures(product.value, 'TechnicalData')?.length === 0
        case 'dimensions':
          return (
            !product.value ||
            (!product.value.dimensionImage &&
              getSortedFeatures(product, 'Dimension')?.length === 0)
          )
        case 'accessories':
          return !productAccessoriesGroups.value?.length
        case 'consumables':
          return !productReferencesConsumables.value?.length
        case 'spareparts':
          return !productReferencesSpareParts.value?.length
        case 'service':
          return true
        default:
          return false
      }
    }

    const renderableTabs = computed(() => {
      return tabs.value
        .filter((o) => o.active)
        .map((item) => {
          return {
            ...item,
            disabled: isDisabled(item.trigger),
          }
        })
    })

    const selectTab = (code) => {
      currentTabSelected.value = code
    }

    return {
      isMobile,
      currentTabSelected,
      renderableTabs,
      selectTab,
    }
  },
})
</script>
