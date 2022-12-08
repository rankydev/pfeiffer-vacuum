<template>
  <div class="tab-navigation">
    <div v-if="!isMobile" class="tab-navigation__wrapper">
      <div class="tab-navigation__desktop">
        <Button
          v-for="(tab, index) in tabs.filter((o) => o.active)"
          :key="index"
          :label="tab.name"
          :variant="
            lastTabSelected === tab.trigger || isDisabled(tab.trigger)
              ? 'secondary'
              : 'inverted'
          "
          :class="{ active: lastTabSelected === tab.trigger }"
          cutaway="bottom"
          class="tab-navigation__desktop__item"
          :disabled="isDisabled(tab.trigger)"
          @click="selectTab(tab.trigger)"
        />
      </div>
      <DetailTabContent
        class="tab-navigation__desktop__content"
        :last-tab-selected="lastTabSelected"
      />
    </div>
    <GenericAccordion
      v-else
      :accordion-entries="mobileAccordionItems"
      level="h3"
      use-tab-styles
      class="tab-navigation__mobile"
    >
      <template v-for="item in mobileAccordionItems" #[item.slotName]>
        <!-- eslint-disable-next-line vue/valid-v-for -->
        <DetailTabContent :last-tab-selected="item.slotName" />
      </template>
    </GenericAccordion>
  </div>
</template>

<script>
import {
  defineComponent,
  useContext,
  ref,
  computed,
} from '@nuxtjs/composition-api'
import { useProductStore } from '~/stores/product'
import Button from '~/components/atoms/Button/Button'
import DetailTabContent from './DetailTabContent/DetailTabContent'
import getSortedFeatures from './partials/getSortedFeatures'
import GenericAccordion from '~/components/atoms/GenericAccordion/GenericAccordion'

export default defineComponent({
  components: {
    Button,
    DetailTabContent,
    GenericAccordion,
  },
  props: {
    productCode: {
      type: String,
      default: '',
    },
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
    loadingReferences: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { i18n, app } = useContext()
    const { isMobile } = app.$breakpoints

    const {
      product,
      productReferencesSpareParts,
      productReferencesConsumables,
    } = useProductStore()

    let lastTabSelected = ref('productInfo')
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

    const mobileAccordionItems = computed(() => {
      return tabs.value
        .filter((o) => o.active)
        .map((item) => {
          return {
            label: item.name,
            isActive: false, // no initial open tab
            disabled: isDisabled(item.trigger),
            slotName: item.trigger,
          }
        })
    })

    const spareParts = computed(() => {
      return props.references.filter((o) => o.referenceType === 'SPAREPART')
    })

    const consumables = computed(() => {
      return props.references.filter((o) => o.referenceType === 'CONSUMABLE')
    })

    const hasAccessories = computed(() => {
      if (product && product.productReferences) {
        return product.productReferences.filter(
          (o) => o.referenceType === 'ACCESSORIES'
        )
      }
      return []
    })

    const selectTab = (code) => {
      lastTabSelected.value = code
    }

    const isDisabled = (code) => {
      switch (code) {
        case 'technicalData':
          return getSortedFeatures(product, 'TechnicalData')?.length === 0
        case 'dimensions':
          return (
            !product ||
            (!product.dimensionImage &&
              getSortedFeatures(product, 'Dimension')?.length === 0)
          )
        case 'accessories':
          return !hasAccessories.value?.length
        case 'consumables':
          return !productReferencesConsumables.length
        case 'spareparts':
          return !productReferencesSpareParts.length
        case 'service':
          return true
        default:
          return false
      }
    }

    return {
      lastTabSelected,
      tabs,
      mobileAccordionItems,
      spareParts,
      consumables,
      hasAccessories,
      selectTab,
      isDisabled,
      i18n,
      isMobile,
    }
  },
})
</script>

<style lang="scss">
.tab-navigation {
  @apply tw-w-full;

  &__desktop {
    @apply tw-hidden;

    @screen md {
      @apply tw-flex;
      @apply tw-flex-row;
      @apply tw-justify-start;
      @apply tw-border-b-2;
      @apply tw-border-pv-red;
      @apply tw-w-full;
      @apply tw-overflow-y-auto;
    }

    &__content {
      @apply tw-hidden;

      @screen md {
        @apply tw-flex;
      }
    }

    &__item {
      @apply tw-ml-2;

      &:first-child {
        @apply tw-ml-0;
      }
    }
  }

  &__mobile {
    @apply tw-flex;
    @apply tw-justify-evenly;
    @apply tw-flex-col;

    &__item {
      @apply tw-mt-2;
    }
  }
}
</style>
