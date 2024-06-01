'use client'
import useCartService from '@/lib/hooks/useCartStore'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
function CartDetails() {
  const router = useRouter()
  const { items, itemsPrice, addItem, removeItem } = useCartService()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) return <></>
  return (
    <>
      <h1 className="px-4 text-2xl">Shopping Cart</h1>
      {itemsPrice === 0 ? (
        <div className="flex items-center justify-center h-[600px]">
          <span>Cart is Empty</span>{' '}
          <Link href="/" className="text-lg text-blue-600 font-bold ml-3">
            {' '}
            Go Shopping
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) =>
                  item.qty > 0 ? (
                    <tr key={item.slug}>
                      <td>
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex items-center"
                        >
                          <Image
                            src={item.image}
                            alt={item.slug}
                            width={50}
                            height={50}
                            className="w-12 h-12 object-cover"
                          ></Image>
                          <span className="px-2">{item.name}</span>
                        </Link>
                      </td>
                      <td>
                        <button
                          className="btn"
                          type="button"
                          onClick={() => removeItem(item)}
                        >
                          -
                        </button>
                        <span className="px-2">{item.qty}</span>
                        <button
                          className="btn"
                          type="button"
                          onClick={() => addItem(item)}
                        >
                          +
                        </button>
                      </td>
                      <td>$ {item.price}</td>
                      <td>$ {item.qty * item.price}</td>
                    </tr>
                  ) : (
                    <></>
                  )
                )}
              </tbody>
            </table>
          </div>
          <div>
            <div className="card bg-base-300">
              <div className="card-body">
                <ul>
                  <li>
                    <div className="pb-3 text-xl">Subtotal: $ {itemsPrice}</div>
                  </li>
                  <li>
                    <button
                      onClick={() => router.push('/checkout')}
                      className="w-full btn btn-primary"
                    >
                      process to checkout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CartDetails
