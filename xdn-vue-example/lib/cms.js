import fetch from 'axios'

const origin = 'https://moovweb-docs-xdn-examples-api-default.moovweb-edge.io'

function cleanPath(path) {
  return path.replace(/^\//, '')
}

function getApiUrl(path) {
  if (typeof window === 'undefined') {
    return `${origin}/${cleanPath(path)}`
  }

  return location.protocol + '//' + location.host + getApiPath(path)
}

export function getOptimizedImageUrl(path) {
  return `https://opt.moovweb.net?quality=30&height=250&width=250&img=${encodeURIComponent(
    origin + path
  )}`
}

export function getApiPath(path) {
  return `/api/${cleanPath(path)}`
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
export async function getProductsByCategory(categoryName) {
  const res = await fetch(getApiUrl(`/category/${categoryName}`))

  const products = res.data
  products.forEach(item => (item.picture = getOptimizedImageUrl(item.picture)))

  return products
}

/**
 * Gets a product by ID
 * @param {String} productId
 *
 * @return {Object}
 */
export async function getProductById(productId) {
  const res = await fetch(getApiUrl(`/product/${productId}`))
  const product = res.data
  product.picture = getOptimizedImageUrl(product.picture)

  return product
}
