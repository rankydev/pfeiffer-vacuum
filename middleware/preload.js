import { useCartStore } from '~/stores/cart'

export default async () => {
  const cartStore = useCartStore()
  const { initialCartCheck } = cartStore

  // Cart handling
  await initialCartCheck()
}
