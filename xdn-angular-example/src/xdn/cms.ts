import fetch from 'axios'
// @ts-ignore
// import BUILD_ID from '!raw-loader!../BUILD_ID'
const BUILD_ID = 'dev'

const origin = 'https://moovweb-docs-xdn-examples-api-default.moovweb-edge.io'

function cleanPath(path: string) {
  return path.replace(/^\//, '')
}

export interface ICategory {
  category: string
  categoryName: string
  href: string
  items: Array<IProduct>
}

export interface IProduct {
  _id: string
  description: string
  href: string
  name: string
  picture: string
  price: string
  rating: string
  reviews: number
}

export function getApiUrl(path: string) {
  if (typeof window === 'undefined') {
    return `${origin}/${cleanPath(path)}`
  }

  return location.protocol + '//' + location.host + getApiPath(path)
}

export function getOptimizedImageUrl(path: string) {
  return `https://opt.moovweb.net?quality=30&height=250&width=250&img=${encodeURIComponent(
    origin + path
  )}`
}

export function getApiPath(path: string) {
  return `/api/${BUILD_ID}/${cleanPath(path)}`
}

/**
 * Gets all categories
 *
 * @return {Object}
 */
export async function getCategories() {
  const res = await fetch(getApiUrl('/category'))
  return res.data
}

/**
 * Gets a category by ID
 * @param {String} categoryId
 *
 * @return {Object}
 */
export async function getProductsByCategory(categoryName: any) {
  const res = await fetch(getApiUrl(`/category/${categoryName}`))

  const products = res.data
  products.forEach((item: any) => (item.picture = getOptimizedImageUrl(item.picture)))

  return products
}

/**
 * Gets a product by ID
 * @param {String} productId
 *
 * @return {Object}
 */
export async function getProductById(productId: any) {
  const res = await fetch(getApiUrl(`/product/${productId}`))
  const product = res.data
  product.picture = getOptimizedImageUrl(product.picture)

  return product
}
