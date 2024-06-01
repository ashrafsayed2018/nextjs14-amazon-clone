'use client'
import useCartService from '@/lib/hooks/useCartStore'
import Link from 'next/link'
import { useEffect, useState } from 'react'

function Menu() {
  const { items } = useCartService()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  return (
    <div>
      <ul className="flex items-stretch">
        <li>
          <Link href="/cart" className="btn btn-ghost rounded-btn">
            Cart
            {mounted && items.length > 0 && (
              <div className="badge badge-secondary">
                {items.reduce((acc, item) => acc + item.qty, 0)}
              </div>
            )}
          </Link>
        </li>
        <li>
          <Link href="/login" className="btn btn-ghost rounded-btn">
            Login
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Menu
