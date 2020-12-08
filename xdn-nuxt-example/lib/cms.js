import fetch from 'axios'
// import BUILD_ID from 'raw-loader!../__sapper__/build/BUILD_ID'
const BUILD_ID = 'dev'

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
  return `/api/${BUILD_ID}/${cleanPath(path)}`
}

/**
 * Gets all categories
 *
 * @return {Object}
 */
export async function getCategories() {
  const ret = { categories: [] }
  const res = await fetch(getApiUrl('/category')).catch((e) => ({
    error: e.message,
  }))
  ret.categories = res.data

  return ret
}

/**
 * Gets a category by ID
 * @param {String} categoryId
 *
 * @return {Object}
 */
export async function getCategory(categoryName) {
  const ret = { products: [] }
  const res = await fetch(getApiUrl(`/category/${categoryName}`)).catch(
    (e) => (ret.error = e.message)
  )

  ret.products = res.data
  ret.products.forEach(
    (item) => (item.picture = getOptimizedImageUrl(item.picture))
  )

  return ret
}

/**
 * Gets a product by ID
 * @param {String} productId
 *
 * @return {Object}
 */
export async function getProductById(productId) {
  const ret = { product: {} }
  const res = await fetch(getApiUrl(`/product/${productId}`)).catch(
    (e) => (ret.error = e.message)
  )

  if (res.status === 200) {
    ret.product = res.data
    ret.product.picture = getOptimizedImageUrl(ret.product.picture)
  }

  return ret
}
