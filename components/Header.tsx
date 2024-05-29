import Link from 'next/link'

function Header() {
  return (
    <header>
      <nav>
        <div className="navbar justify-between bg-base-300">
          <Link href="/" className="btn btn-ghost text-lg">
            Next amazon v2
          </Link>
          <ul className="flex">
            <li>
              <Link href="/cart" className="btn btn-ghost rounded-btn">
                Cart
              </Link>
            </li>
            <li>
              <Link href="/login" className="btn btn-ghost rounded-btn">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header
