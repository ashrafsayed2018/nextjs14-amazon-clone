import ProductItem from '@/components/products/ProductItem'
import data from '@/lib/data'
import ProductService from '@/lib/services/productService'
import { convertDocToObj } from '@/lib/utils'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || 'amazon clone',
  description: process.env.NEXT_PUBLIC_APP_DESC || 'amazon clone',
}
export default async function Home() {
  const latestProducts = await ProductService.getLatest()
  const featuredProducts = await ProductService.getFeatured()
  return (
    <>
      <div className="w-full carousel rounded-box mt-4">
        {featuredProducts.map((product, index) => (
          <div
            key={product.slug}
            id={`slide-${index}`}
            className="carousel-item relative w-full bg-red-400"
          >
            <Link href={`product/${product.slug}`} className="w-full h-[400px]">
              <Image
                src={product.image as string}
                alt={product.name}
                width={50}
                height={50}
                className="w-full h-full object-contain"
              />
            </Link>
            {/* carousel arrows  */}
            <div className="absolute flex justify-between transform translate-y-1/2 top-1/2 left-5 right-5">
              <a
                href={`#slide-${
                  index === 0 ? featuredProducts.length - 1 : index - 1
                }`}
                className="btn btn-circle"
              >
                &larr;
              </a>
              <a
                href={`#slide-${
                  index === featuredProducts.length - 1 ? 0 : index + 1
                }`}
                className="btn btn-circle"
              >
                &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>
      <h2 className="text-2xl px-2">latest products</h2>
      <div className="grid grid-cols-1 gap-4  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {latestProducts.map((product) => (
          <ProductItem key={product.slug} product={convertDocToObj(product)} />
        ))}
      </div>
    </>
  )
}
