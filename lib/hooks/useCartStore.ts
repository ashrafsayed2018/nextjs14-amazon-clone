import { create } from 'zustand'
import { round2 } from '../utils'
import { OrderItem, ShippingAddress } from '../models/OrderModel'
import { persist } from 'zustand/middleware'
type Cart = {
  items: OrderItem[]
  itemsPrice: number
  taxPrice: number
  shippingPrice: number
  totalPrice: number
  paymentMethod: string
  shippingAddress: ShippingAddress
}

const initialCartState: Cart = {
  items: [],
  itemsPrice: 0,
  taxPrice: 0,
  shippingPrice: 0,
  totalPrice: 0,
  paymentMethod: 'PayPal',
  shippingAddress: {
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  },
}

export const cartStore = create<Cart>()(
  persist(() => initialCartState, { name: 'cartStore' })
)

export default function useCartService() {
  const {
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentMethod,
    shippingAddress,
  } = cartStore()
  return {
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentMethod,
    shippingAddress,
    addItem: (item: OrderItem) => {
      const existingItem = items.find((i) => i.slug === item.slug)
      //   increase the quantity of the existing item in the cart
      const updatedCartItems = existingItem
        ? items.map((x) =>
            x.slug === existingItem.slug
              ? { ...existingItem, qty: existingItem.qty + 1 }
              : x
          )
        : [...items, { ...item, qty: 1 }]

      const { itemPrice, shippingPrice, taxPrice, totalPrice } =
        calculateItemsPrice(updatedCartItems)

      cartStore.setState({
        items: updatedCartItems,
        itemsPrice: itemPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
    },
    removeItem: (item: OrderItem) => {
      const existingItem = items.find((i) => i.slug === item.slug)
      if (existingItem && existingItem.qty > 0) {
        // decrease the quantity of the existing item in the cart
        const updatedCartItems = existingItem
          ? items.map((x) =>
              x.slug === existingItem.slug
                ? { ...existingItem, qty: existingItem.qty - 1 }
                : x
            )
          : [...items, { ...item, qty: 1 }]

        const { itemPrice, shippingPrice, taxPrice, totalPrice } =
          calculateItemsPrice(updatedCartItems)

        cartStore.setState({
          items: updatedCartItems,
          itemsPrice: itemPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        })
      }
    },
    saveShippingAddress: (shippingAddress: ShippingAddress) => {
      cartStore.setState({ shippingAddress })
    },
    savePaymentMethod: (paymentMethod: string) => {
      cartStore.setState({ paymentMethod })
    },
  }
}

const calculateItemsPrice = (items: OrderItem[]) => {
  const itemPrice = round2(
    items.reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  const shippingPrice = round2(itemPrice > 100 ? 0 : 100)
  const taxPrice = round2(itemPrice * 0.15)
  const totalPrice = round2(itemPrice + shippingPrice + taxPrice)
  return {
    itemPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  }
}
