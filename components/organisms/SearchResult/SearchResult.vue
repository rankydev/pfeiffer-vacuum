<template>
  <div class="search-result tw-grid-container">
    <div class="search-result__category">
      <CategoryTree :categories="categories" />
    </div>
    <div class="search-result__products">
      <Facets
        class="search-result__facets"
        v-bind="{ facets, currentQuery, sorts }"
        @updateSort="pushSortToQuery"
        @updateFacets="pushFacetsToQuery"
      />
      <CartItemCard
        v-for="entry in cart.deliveryOrderGroups[0].entries"
        :key="entry.entryNumber"
        :entry="entry"
        :promotions="cart.appliedOrderPromotions"
        :shop-attributes="true"
        :read-only="false"
        :price="1000"
      />
      <ProductCardGrid v-if="products.length > 0" :products="products" />
      <div v-else>
        <h2>{{ $t('category.noMatchingProducts') }}</h2>
        <span>{{ $t('category.checkSearchCriteria') }}</span>
      </div>
      <div class="search-result__pages">
        <CategoryPageSizeSelection
          :active="parseInt(pageSize)"
          @change="updatePageSize"
        />
        <Pagination
          class="search-result__pagination"
          :total-pages="pagination.totalPages"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  computed,
  useRouter,
  useRoute,
} from '@nuxtjs/composition-api'
import ProductCardGrid from '~/components/organisms/ProductCardGrid/ProductCardGrid.vue'
import Pagination from '~/components/molecules/Pagination/Pagination.vue'
import CategoryTree from '~/components/molecules/CategoryTree/CategoryTree.vue'
import CategoryPageSizeSelection from '~/components/molecules/CategoryPageSizeSelection/CategoryPageSizeSelection.vue'
import Facets from '~/components/molecules/Facets/Facets.vue'
import CartItemCard from '~/components/molecules/CartItemCard/CartItemCard'

export default defineComponent({
  name: 'SearchResult',
  components: {
    ProductCardGrid,
    Pagination,
    CategoryTree,
    CategoryPageSizeSelection,
    Facets,
    CartItemCard,
  },
  props: {
    products: {
      type: Array,
      default: () => [],
    },
    pagination: {
      type: Object,
      required: true,
    },
    categories: {
      type: Array,
      default: () => [],
    },
    facets: {
      type: Array,
      required: true,
    },
    currentQuery: {
      type: Object,
      default: () => ({}),
    },
    sorts: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const pageSize = computed(() => route.value.query?.pageSize || 9)

    const updatePageSize = (e) => {
      router.push({
        query: {
          ...route.value.query,
          pageSize: e,
          currentPage: 1,
        },
      })
    }

    const cart = {
      appliedOrderPromotions: [
        {
          description: 'You got a 20% discount on your cart',
          promotion: {
            code: 'TestPromotionOnCart',
            description:
              'Du hast einen 20% Rabatt auf deinen Einkaufswagen bekommen',
            promotionType: 'Regelbasierte Werbeaktion',
          },
        },
      ],
      calculated: true,
      code: '00468050',
      deliveryItemsQuantity: 1,
      deliveryOrderGroups: [
        {
          entries: [
            {
              entryNumber: 0,
              product: {
                purchasable: true,
                alternativeOrderNumbers: ['PK D56 702'],
                bullets: [
                  'Zweistufige Hochleistungs-Drehschieberpumpe mit Saugvermögen 1,25 m<sup>3</sup>/h bei 50 Hz / 1,50 m<sup>3</sup>/h bei 60 Hz',
                  'Bitte beachten, Kabel muss separat als Zubehör bestellt werden',
                  'Mit 1-Phasenmotor, mit C14 Stecker im Klemmkasten',
                  'Integriertes Gasballast- und Sicherheitsventil',
                  'Für alle Anwendungen im Grob- und Feinvakuumbereich',
                  'Besonderheit, Weiter Einsatzbereich durch verschiedene Motorspannungen',
                ],
                categories: [{ id: 'DUO_16', name: 'Duo 1.6' }],
                categoryPath: [
                  { id: 'PUMPS', name: 'Pumpen' },
                  { id: 'ROTARY_VANE_PUMPS', name: 'Drehschieberpumpen' },
                  { id: 'DUO_16', name: 'Duo 1.6' },
                ],
                code: 'PK_D56_702_C_sample',
                configurable: false,
                dimensionImage: {
                  altText:
                    'Dimensions for Duo 1.6, 1-ph Motor, 100 V, 50 Hz | 95–105 V, 60 Hz',
                  format: '300Wx300H',
                  url: '/medias/?context=bWFzdGVyfGltYWdlc3w1MDA0NHxpbWFnZS9wbmd8aDRlL2gxYy84ODI0Njg2MTgyNDMwfDY4MmVkNjI2ZDJiYWY2ZDgzNWFhZTc2OTBkZDgwOWQ1ZTNmZDQzMzIyOWU1M2E4ZTdhYWUzNGY4OGY4MThmMDM',
                },
                images: [
                  {
                    altText:
                      'Duo 1.6, 1-ph Motor, 100 V, 50 Hz | 95–105 V, 60 Hz',
                    format: 'product',
                    imageType: 'PRIMARY',
                    url: '/medias/?context=bWFzdGVyfGltYWdlc3w0NTcwMDd8aW1hZ2UvcG5nfGgxMy9oYTEvODgyNDY4Nzk1MTkwMnxjNGJlMmFkN2RkZTBhOWNjOTdlZThjNzMyYzlhMTc5ZWQ0YmE1ZTlkOTU4NmQ4ZGY1NzI3YmY0YWI1M2ZmNTYz',
                  },
                ],
                master: '77a36ee3-740c-49a9-aeba-5baebe01ff07_sample',
                name: 'Duo 1.6, 1-ph Motor, 100 V, 50 Hz | 95–105 V, 60 Hz',
                orderNumber: 'PK D56 702 C',
                productType: 'VARIANTPRODUCT',
                purchasable: true,
                stock: { stockLevelStatus: 'inStock' },
                url: '/Pumpen/Drehschieberpumpen/Duo-1-6/Duo-1-6%2C-1-ph-Motor%2C-100%C2%A0V%2C-50%C2%A0Hz-%7C-95%E2%80%93105%C2%A0V%2C-60%C2%A0Hz/p/PK_D56_702_C_sample',
                variationMatrix: {
                  allSelected: true,
                  masterProduct: { name: 'Duo 1.6', purchasable: true },
                  variants: [
                    {
                      code: 'PK_D56_702_C_sample',
                      name: 'Duo 1.6, 1-ph Motor, 100 V, 50 Hz | 95–105 V, 60 Hz',
                      purchasable: true,
                    },
                  ],
                  variationAttributes: [
                    {
                      code: 'pfeifferClassificationCatalog/1.0/cc_3942.3942',
                      name: 'Spezielle Produktversion',
                      variationValues: [
                        {
                          automaticallySelected: true,
                          displayValue:
                            'Für Anwendungen mit nicht korrosiven Gasen',
                          selectable: true,
                          selected: true,
                          value: 'Für Anwendungen mit nicht korrosiven Gasen',
                        },
                      ],
                    },
                    {
                      code: 'pfeifferClassificationCatalog/1.0/cc_3920.3920',
                      name: 'Netzspannung',
                      variationValues: [
                        {
                          automaticallySelected: false,
                          displayValue:
                            'DE 100 V AC, 50 Hz // 95 – 105 V AC (±10 %), 60 Hz',
                          selectable: true,
                          selected: true,
                          value:
                            'DE 100 V AC, 50 Hz // 95 – 105 V AC (±10 %), 60 Hz',
                        },
                        {
                          automaticallySelected: false,
                          displayValue:
                            'DE 105 V AC, 50 Hz // 115 – 125 V AC (±10 %), 60 Hz',
                          selectable: true,
                          selected: false,
                          value:
                            'DE 105 V AC, 50 Hz // 115 – 125 V AC (±10 %), 60 Hz',
                        },
                      ],
                    },
                  ],
                },
              },
              quantity: 1,
              updateable: true,
            },
          ],
        },
      ],
      entries: [
        {
          entryNumber: 0,
          product: {
            alternativeOrderNumbers: ['PK D56 702'],
            bullets: [
              'Zweistufige Hochleistungs-Drehschieberpumpe mit Saugvermögen 1,25 m<sup>3</sup>/h bei 50 Hz / 1,50 m<sup>3</sup>/h bei 60 Hz',
              'Bitte beachten, Kabel muss separat als Zubehör bestellt werden',
              'Mit 1-Phasenmotor, mit C14 Stecker im Klemmkasten',
              'Integriertes Gasballast- und Sicherheitsventil',
              'Für alle Anwendungen im Grob- und Feinvakuumbereich',
              'Besonderheit, Weiter Einsatzbereich durch verschiedene Motorspannungen',
            ],
            categories: [{ id: 'DUO_16', name: 'Duo 1.6' }],
            categoryPath: [
              { id: 'PUMPS', name: 'Pumpen' },
              { id: 'ROTARY_VANE_PUMPS', name: 'Drehschieberpumpen' },
              { id: 'DUO_16', name: 'Duo 1.6' },
            ],
            code: 'PK_D56_702_C_sample',
            configurable: false,
            dimensionImage: {
              altText:
                'Dimensions for Duo 1.6, 1-ph Motor, 100 V, 50 Hz | 95–105 V, 60 Hz',
              format: '300Wx300H',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3w1MDA0NHxpbWFnZS9wbmd8aDRlL2gxYy84ODI0Njg2MTgyNDMwfDY4MmVkNjI2ZDJiYWY2ZDgzNWFhZTc2OTBkZDgwOWQ1ZTNmZDQzMzIyOWU1M2E4ZTdhYWUzNGY4OGY4MThmMDM',
            },
            images: [
              {
                altText: 'Duo 1.6, 1-ph Motor, 100 V, 50 Hz | 95–105 V, 60 Hz',
                format: 'product',
                imageType: 'PRIMARY',
                url: '/medias/?context=bWFzdGVyfGltYWdlc3w0NTcwMDd8aW1hZ2UvcG5nfGgxMy9oYTEvODgyNDY4Nzk1MTkwMnxjNGJlMmFkN2RkZTBhOWNjOTdlZThjNzMyYzlhMTc5ZWQ0YmE1ZTlkOTU4NmQ4ZGY1NzI3YmY0YWI1M2ZmNTYz',
              },
            ],
            master: '77a36ee3-740c-49a9-aeba-5baebe01ff07_sample',
            name: 'Duo 1.6, 1-ph Motor, 100 V, 50 Hz | 95–105 V, 60 Hz',
            orderNumber: 'PK D56 702 C',
            productType: 'VARIANTPRODUCT',
            purchasable: true,
            stock: {
              stockLevelStatus: 'inStock',
            },
            url: '/Pumpen/Drehschieberpumpen/Duo-1-6/Duo-1-6%2C-1-ph-Motor%2C-100%C2%A0V%2C-50%C2%A0Hz-%7C-95%E2%80%93105%C2%A0V%2C-60%C2%A0Hz/p/PK_D56_702_C_sample',
            variationMatrix: {
              allSelected: true,
              masterProduct: {
                name: 'Duo 1.6',
                purchasable: true,
              },
              variants: [
                {
                  code: 'PK_D56_702_C_sample',
                  name: 'Duo 1.6, 1-ph Motor, 100 V, 50 Hz | 95–105 V, 60 Hz',
                  purchasable: true,
                },
              ],
              variationAttributes: [
                {
                  code: 'pfeifferClassificationCatalog/1.0/cc_3942.3942',
                  name: 'Spezielle Produktversion',
                  variationValues: [
                    {
                      automaticallySelected: true,
                      displayValue:
                        'Für Anwendungen mit nicht korrosiven Gasen',
                      selectable: true,
                      selected: true,
                      value: 'Für Anwendungen mit nicht korrosiven Gasen',
                    },
                  ],
                },
                {
                  code: 'pfeifferClassificationCatalog/1.0/cc_3920.3920',
                  name: 'Netzspannung',
                  variationValues: [
                    {
                      automaticallySelected: false,
                      displayValue:
                        'DE 100 V AC, 50 Hz // 95 – 105 V AC (±10 %), 60 Hz',
                      selectable: true,
                      selected: true,
                      value:
                        'DE 100 V AC, 50 Hz // 95 – 105 V AC (±10 %), 60 Hz',
                    },
                    {
                      automaticallySelected: false,
                      displayValue:
                        'DE 105 V AC, 50 Hz // 115 – 125 V AC (±10 %), 60 Hz',
                      selectable: true,
                      selected: false,
                      value:
                        'DE 105 V AC, 50 Hz // 115 – 125 V AC (±10 %), 60 Hz',
                    },
                  ],
                },
              ],
            },
          },
          quantity: 1,
          updateable: true,
        },
      ],
      guid: 'a7a6fb60-2606-4c26-bb65-ec1b8ec6be15',
      net: true,
      pickupItemsQuantity: 0,
      site: 'pfeiffer',
      store: 'pfeiffer',
      totalItems: 1,
      user: {
        uid: 'anonymous',
      },
      totalUnitCount: 1,
    }

    const pushSortToQuery = (e) => {
      router.push({
        query: { ...route.value.query, sort: e.code, currentPage: 1 },
      })
    }

    const pushFacetsToQuery = (e) => {
      let joinedFacets = ''
      e.forEach((item, i) => {
        joinedFacets += `${i > 0 ? ':' : ''}${item.key}:${item.value}`
      })
      router.push({
        query: {
          ...route.value.query,
          facets: joinedFacets.length ? joinedFacets : undefined,
          currentPage: 1,
        },
      })
    }

    return {
      cart,
      updatePageSize,
      pushSortToQuery,
      pushFacetsToQuery,
      pageSize,
    }
  },
})
</script>

<style lang="scss">
.search-result {
  @apply tw-bg-pv-grey-96;
  @apply tw-pt-4;
  @apply tw-pb-6;

  @screen lg {
    @apply tw-pt-10;
    @apply tw-pb-12;
  }

  &__category {
    @apply tw-col-start-1;
    @apply tw-col-span-6;

    @screen md {
      @apply tw-col-start-1;
      @apply tw-col-span-8;
    }

    @screen lg {
      @apply tw-col-start-1;
      @apply tw-col-span-3;
    }
  }

  &__products {
    @apply tw-col-start-1;
    @apply tw-col-span-6;

    @screen md {
      @apply tw-col-start-1;
      @apply tw-col-span-8;
    }

    @screen lg {
      @apply tw-col-start-4;
      @apply tw-col-span-9;
    }
  }

  &__facets {
    @apply tw-mb-4;
  }

  &__pages {
    @apply tw-flex;
    @apply tw-flex-col-reverse;
    @apply tw-items-center;
    @apply tw-mt-4;

    @screen md {
      @apply tw-flex-row;
      @apply tw-justify-between;
    }
  }

  &__pagination {
    @apply tw-mt-2;

    @screen md {
      @apply tw-mt-0;
    }
  }
}
</style>
