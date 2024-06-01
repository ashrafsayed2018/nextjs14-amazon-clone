import { cache } from 'react'
import dbConnect from '../dbConnect'
import ProductModel, { Product } from '../models/ProductModel'
export const revalidate = 3600
const getLatest = cache(async () => {
  await dbConnect()
  const products = (await ProductModel.find({})
    .sort({ _id: -1 })
    .limit(4)
    .lean()) as Product[]
  return products
})

const getFeatured = cache(async () => {
  const featured = (await ProductModel.find({ isFeatured: true })
    .limit(3)
    .lean()) as Product[]
  return featured
})
const getBySlug = cache(async (slug: string) => {
  await dbConnect()
  const product = (await ProductModel.findOne({ slug }).lean()) as Product
  return product
})
const ProductService = {
  getLatest,
  getFeatured,
  getBySlug,
}
export default ProductService
