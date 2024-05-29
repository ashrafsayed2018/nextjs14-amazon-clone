import ProductItem from '@/components/ProductItem'
import data from '@/lib/data'

export default function Home() {
  return (
    <>
      <h2 className="text-2xl px-2">latest products</h2>
      <div className="grid grid-cols-1 gap-4  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.products.map((product) => (
          <ProductItem key={product.slug} product={product} />
        ))}
      </div>
    </>
  )
}
