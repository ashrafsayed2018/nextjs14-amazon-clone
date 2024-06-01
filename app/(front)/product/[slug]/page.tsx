import AddToCart from '@/components/products/AddToCart'
import { Product } from '@/lib/models/ProductModel'
import ProductService from '@/lib/services/productService'
import { convertDocToObj } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const product = await ProductService.getBySlug(params.slug)
  if (!product) {
    return { title: 'product not found' }
  }
  return {
    title: product.name,
    description: product.description,
  }
}

async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await ProductService.getBySlug(params.slug)
  if (!product) {
    return <div>product not found</div>
  }
  return (
    <>
      <div className="my-2">
        <Link href={'/'}> Home</Link>
        <div className="grid md:grid-cols-4 md:gap-3">
          <div className="md:col-span-2">
            <Image
              src={product.image}
              alt={product.name}
              width={640}
              height={640}
              sizes="(100vw)"
              className="object-cover h-auto w-full"
            />
          </div>
          {/* product info */}
          <div>
            <ul className="space-y-4">
              <li>
                <h1>{product.name}</h1>
              </li>
              <li>
                Rating: {product.rating} of {product.numReviews} reviews
              </li>

              <li>Brand: {product.brand}</li>
              <li>
                <div className="divider"></div>
              </li>
              <li>
                Description: <p>{product.description}</p>
              </li>
            </ul>
          </div>
          {/* product action for adding to the cart */}

          <div>
            <div className="card bg-base-300 shadow-xl mt-4 md:mt-0">
              <div className="card-body ">
                <div className="mb-2 flex justify-between items-center">
                  <p>Price</p>
                  <h2 className="text-xl">${product.price}</h2>
                </div>
                <div className="mb-2 flex justify-between items-center">
                  <p>status</p>
                  <h2 className="text-xl">
                    {product.countInStock > 0 ? (
                      <p className="text-success">in stock</p>
                    ) : (
                      <p className="text-error">out of stock</p>
                    )}
                  </h2>
                </div>
                {product.countInStock > 0 && (
                  <div className="card-actions justify-between">
                    <AddToCart
                      item={{
                        ...convertDocToObj(product),
                        qty: 1,
                        color: '',
                        size: '',
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductPage
