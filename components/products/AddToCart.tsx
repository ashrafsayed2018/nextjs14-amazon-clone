'use client'
import { OrderItem } from '@/lib/models/OrderModel'
import { useRouter } from 'next/navigation'
import useCartService from '@/lib/hooks/useCartStore'
import { useEffect, useState } from 'react'
function AddToCart({ item }: { item: OrderItem }) {
  const router = useRouter()
  const { items, addItem, removeItem } = useCartService()
  const [existItem, setExistItem] = useState<OrderItem | undefined>()

  useEffect(() => {
    setExistItem(items.find((i) => i.slug === item.slug))
  }, [items, item])

  const addToCartHandler = () => {
    addItem(item)
    // router.push('/cart')
  }

  return existItem ? (
    <div>
      <button
        className="btn"
        type="button"
        onClick={() => removeItem(existItem)}
      >
        -
      </button>
      <span className="px-2">{existItem.qty}</span>
      <button className="btn" type="button" onClick={() => addItem(existItem)}>
        +
      </button>
    </div>
  ) : (
    <button
      className="btn btn-primary w-full"
      type="button"
      onClick={addToCartHandler}
    >
      AddToCart
    </button>
  )
}

export default AddToCart
