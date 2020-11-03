import fetch from 'isomorphic-fetch';

const apiUrl = `https://${process.env.EXAMPLES_API_HOST}`;

export function getOptimizedImageUrl(path) {
  return `https://opt.moovweb.net?quality=30&height=250&width=250&img=${encodeURIComponent(
    apiUrl + path
  )}`;
}

export function getCategoryURLs() {
  return ['/category/hats', '/category/shoes', '/category/watches']
}

export function getProductURLs() {
  return ['/products/shoes/1', '/products/shoes/2']
}

/**
 * Gets all categories
 *
 * @return {Array}
 */
export async function getCategories() {
  const ret = { categories: [] };

  const res = await fetch(`${apiUrl}/category`).catch((e) => ({
    error: e.message,
  }));
  ret.categories = await res.json();

  return ret;
}

/**
 * Gets a category by ID
 * @param {String} categoryId
 *
 * @return {Object}
 */
export async function getCategory(categoryName) {
  const ret = { products: [] };

  const res = await fetch(`${apiUrl}/category/${categoryName}`).catch(
    (e) => (ret.error = e.message)
  );

  ret.products = await res.json();
  ret.products.forEach(
    (item) => (item.picture = getOptimizedImageUrl(item.picture))
  );

  return ret;
}

/**
 * Gets a product by ID
 * @param {String} productId
 *
 * @return {Object}
 */
export async function getProductById(categoryName, productId) {
  const ret = { product: {} };

  const res = await fetch(
    `${apiUrl}/category/${categoryName}/${productId}`
  ).catch((e) => (ret.error = e.message));

  ret.product = await res.json();
  ret.product.picture = getOptimizedImageUrl(ret.product.picture);

  return ret;
}
