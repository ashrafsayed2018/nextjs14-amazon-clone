'use client'
import useCartService from '@/lib/hooks/useCartStore'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

function Menu() {
  const { items } = useCartService()
  const { data: session } = useSession()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  const signoutHandler = () => {
    signOut({ callbackUrl: '/signin' })
  }
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
        {session && session.user ? (
          <>
            <li>
              <div className="dropdown dropdown-bottom dropdown-end">
                <label className="btn btn-ghost rounded-btn" tabIndex={0}>
                  {session.user.name}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </label>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content z-[1] p-2 shadow bg-base-300 rounded-box w-full"
                >
                  <li>
                    <button type="button" onClick={signoutHandler}>
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            </li>
          </>
        ) : (
          <></>
        )}
      </ul>
    </div>
  )
}

export default Menu
