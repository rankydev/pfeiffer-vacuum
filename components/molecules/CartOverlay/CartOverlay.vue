<template>
  <div class="cart-overlay">
    <div class="cart-overlay-title">
      <h2>
        <span>$t('cart.shoppingCart')</span>
        <span>({{ numberOfDifferentProducts }})</span>
      </h2>
    </div>
    <CartTable :cart="cart" :is-mini-cart="isMiniCart" />
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  onMounted,
  ref,
} from '@nuxtjs/composition-api'
import CartTable from '../CartTable/CartTable.vue'

export default defineComponent({
  name: 'CartOverlay',
  components: {
    CartTable,
  },
  setup() {
    const cart = ref([])
    const isMiniCart = ref(true)

    const numberOfDifferentProducts = computed(() => {
      return cart.value.products.length
    })
    const initCartFromStore = () => {
      console.log('initCartfromStore')
    }
    onMounted(() => {
      initCartFromStore()
    })

    return { cart, isMiniCart, numberOfDifferentProducts }
  },
})
</script>
