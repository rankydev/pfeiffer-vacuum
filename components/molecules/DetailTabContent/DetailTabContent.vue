<template>
  <div class="tab-content-wrapper">
    <div
      v-if="lastTabSelected === 'productInfo'"
      :title="$t('product.productInformation')"
    >
      <!-- <ProductInformation :product="product" /> -->
    </div>
    <div
      v-if="lastTabSelected === 'technicalData'"
      :title="$t('product.technicalData')"
    >
      <!-- <ProductTechnicalData
    :features="getSortedFeatures(product, 'TechnicalData')"
  /> -->
    </div>
    <div
      v-if="lastTabSelected === 'dimensions'"
      :title="$t('product.dimensions')"
    >
      <!-- <Dimensions :product="product" /> -->
    </div>
    <div
      v-if="lastTabSelected === 'accessories'"
      :title="$t('product.accessories')"
    >
      <!-- <ProductAccessories :accessories="accessories" /> -->
    </div>
    <div
      v-if="lastTabSelected === 'consumables'"
      :title="$t('product.consumables')"
    >
      <div class="tw-grid tw-grid-cols-12 tw-pt-4 tw-text-center">
        <div class="tw-col-span-12">
          <h4>
            {{ $t('product.consumables') }}
          </h4>
        </div>
      </div>
      <!-- <accessories-slider :entries="consumables" /> -->
    </div>
    <div
      v-if="lastTabSelected === 'spareparts'"
      :title="$t('product.spareParts')"
    >
      <div class="spareparts-container">
        <div
          class="tw-grid tw-grid-cols-12 tw-text-center previous-versions tw-mb-6"
        >
          <div class="tw-col-span-4 lg:tw-col-span-2 icon">
            <div class="tw-p-3">
              <Icon icon="info" />
            </div>
          </div>
          <div class="tw-col-span-8 lg:tw-col-span-10 info tw-p-3">
            <h6 class="tw-mt-4">
              {{ $t('product.previousVersionsSpareParts') }}
            </h6>
          </div>
        </div>
        <div class="tw-grid tw-grid-cols-12">
          <div class="tw-col-span-12">
            <h4>
              {{ $t('product.spareParts') }}
            </h4>
          </div>
        </div>
        <!-- <accessories-slider :entries="spareParts" /> -->
      </div>
    </div>
    <!-- Service Tab should not be visible in MVP -->
    <div v-if="false" :title="$t('product.service')">Service</div>
    <div
      v-if="lastTabSelected === 'downloads'"
      :title="$t('product.downloads')"
    >
      <!-- <ProductFiles :files="downloads" :loading="loadingReferences" /> -->
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  useContext,
  ref,
  computed,
} from '@nuxtjs/composition-api'
import Icon from '~/components/atoms/Icon/Icon.vue'

export default defineComponent({
  components: { Icon },
  props: {
    lastTabSelected: {
      type: String,
      required: true,
    },
    tab: {
      type: String,
      default: '',
    },
  },
  emits: [
    'getAccessories',
    'getConsumables',
    'getReferences',
    'getSpareParts',
    'getDownloads',
  ],
  setup(props, { emit }) {
    const { i18n } = useContext()

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

    const spareParts = computed(() => {
      return props.references.filter((o) => o.referenceType === 'SPAREPART')
    })

    const consumables = computed(() => {
      return props.references.filter((o) => o.referenceType === 'CONSUMABLE')
    })

    const hasConsumables = computed(() => {
      if (props.product && props.product.productReferences) {
        return props.product.productReferences.filter(
          (o) => o.referenceType === 'CONSUMABLE'
        )
      }
      return []
    })

    const hasSpareParts = computed(() => {
      if (props.product && props.product.productReferences) {
        return props.product.productReferences.filter(
          (o) => o.referenceType === 'SPAREPART'
        )
      }
      return []
    })

    const hasAccessories = computed(() => {
      if (props.product && props.product.productReferences) {
        return props.product.productReferences.filter(
          (o) => o.referenceType === 'ACCESSORIES'
        )
      }
      return []
    })

    const getSortedFeatures = (product, code) => {
      if (!product || !product.typedFeatureList) {
        return []
      }

      const data = product.typedFeatureList.filter((o) => o.code === code)

      if (data && data?.length > 0) {
        const features = [...data[0].features]
        return features.sort((a, b) => {
          const nameA = a.name.toUpperCase()
          const nameB = b.name.toUpperCase()

          if (nameA < nameB) {
            return -1
          }
          if (nameA > nameB) {
            return 1
          }

          return 0
        })
      } else {
        return []
      }
    }

    const isDisabled = (code) => {
      switch (code) {
        case 'technicalData':
          return getSortedFeatures(props.product, 'TechnicalData')?.length === 0
        case 'dimensions':
          return !props.product || !props.product.dimensionImage
        case 'accessories':
          return props.hasAccessories?.length === 0
        case 'consumables':
          return props.hasConsumables?.length === 0
        case 'spareparts':
          return props.hasSpareParts?.length === 0
        case 'service':
          return true
        default:
          return false
      }
    }

    return {
      tabs,
      spareParts,
      consumables,
      hasConsumables,
      hasSpareParts,
      hasAccessories,
      isDisabled,
      getSortedFeatures,
      i18n,
    }
  },
})
</script>

<style lang="scss">
.tab-navigation {
  @apply tw-w-full;
}

.tab-navigation-desktop {
  @apply tw-hidden;

  @screen lg {
    @apply tw-flex;
    @apply tw-flex-row;
    @apply tw-justify-between;
    @apply tw-border-b-2;
    @apply tw-border-pv-red;
  }
}

.tab-navigation-mobile {
  @apply tw-flex;
  @apply tw-justify-evenly;
  @apply tw-flex-col;

  @screen lg {
    @apply tw-hidden;
  }

  .tab-nav-item {
    @apply tw-mt-8;
  }
}

.accessories-container,
.spareparts-container {
  @apply tw-py-8;
  @apply tw-px-4;

  @screen md {
    @apply tw-pl-6;
  }
}

.previous-versions {
  @apply tw-py-0;
  @apply tw-px-4;

  .icon {
    @apply tw-bg-pv-red;
    @apply tw-flex;
    @apply tw-flex-col;
    @apply tw-justify-center;
    @apply tw-items-center;

    .material-icons {
      font-size: 80px;
      @apply tw-text-pv-white;
    }
  }

  .info {
    @apply tw-bg-pv-grey-96;
    @apply tw-pl-8;
  }
}
</style>
