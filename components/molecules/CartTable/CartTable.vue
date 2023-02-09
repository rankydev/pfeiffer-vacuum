<template>
  <div class="cart-item-wrapper">
    <div class="cart-item-header">
      <div class="cart-item-header__quantity">
        <span>{{ $t('cart.quantity') }}</span>
      </div>
      <div class="cart-item-header__price">
        <span>
          {{ $t('cart.productPrice') }}
        </span>
        <Icon icon="unfold_more" @click="sortPrices('price')" />
      </div>
      <div class="cart-item-header__totalPrice">
        <span>
          {{ $t('cart.totalPrice') }}
        </span>
        <Icon icon="unfold_more" @click="sortPrices('totalPrice')" />
      </div>
    </div>
    <CartItemCard2
      v-for="entry in cart.deliveryOrderGroups[0].entries"
      :key="entry.entryNumber"
      :entry="entry"
      :promotions="cart.appliedOrderPromotions"
      :shop-attributes="true"
      :read-only="false"
      :price="null"
      :show-price="true"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
import Icon from '~/components/atoms/Icon/Icon'

export default defineComponent({
  name: 'CartTable',
  components: {
    Icon,
  },
  props: {},
  emits: [],
  setup() {
    const sortVariable = ref(null)

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

    const sortPrices = (param) => {
      sortVariable.value = 'aufsteigendPrice'
      console.log('sortByPrice clicked', param, sortVariable.value)
    }
    const sortByPrice = () => {
      sortVariable.value = 'aufsteigendPrice'
      console.log('sortByPrice clicked', sortVariable.value)
    }
    const sortByTotalPrice = () => {
      sortVariable.value = 'aufsteigendTotalPrice'
      console.log('sortByTotalPrice clicked', sortVariable.value)
    }

    return {
      sortVariable,
      cart,
      sortPrices,
      sortByPrice,
      sortByTotalPrice,
    }
  },
})
</script>

<style lang="scss">
.cart-item-header {
  @apply tw-grid tw-grid-rows-1 tw-grid-cols-12;
  @apply tw-mx-4;

  &__quantity {
    @apply tw-row-start-1 tw-row-end-1;
    @apply tw-col-start-9 tw-col-end-9;
  }

  &__price {
    @apply tw-row-start-1 tw-row-end-1;
    @apply tw-col-start-10 tw-col-end-10;
    @apply tw-flex;
    @apply tw-justify-center;
    @apply tw-items-center;
    @apply tw-cursor-pointer;

    :hover {
      @apply tw-text-pv-grey-48;
    }
  }

  &__totalPrice {
    @apply tw-row-start-1 tw-row-end-1;
    @apply tw-col-start-11 tw-col-end-11;
    @apply tw-flex;
    @apply tw-justify-center;
    @apply tw-items-center;
    @apply tw-cursor-pointer;

    :hover {
      @apply tw-text-pv-grey-48;
    }
  }
}
</style>
