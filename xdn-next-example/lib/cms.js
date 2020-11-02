import fetch from 'isomorphic-fetch';

const apiUrl = `https://${process.env.EXAMPLES_API_HOST}`;

/**
 * Gets all categories
 *
 * @return {Array}
 */
export async function getCategories() {
  const ret = { categories: [] }
  ret.categories = await fetch(`${apiUrl}/category`)
    .then((res) => res.json())
    .catch((e) => ({ error: e.message }));

  return ret
}

/**
 * Gets a category by ID
 * @param {String} categoryId
 *
 * @return {Object}
 */
export async function getCategory(categoryName) {
  const ret = { products: [] };
  ret.products = await fetch(`${apiUrl}/category/${categoryName}`)
    .then((res) => res.json())
    .catch((e) => (ret.error = e.message));

  ret.products.forEach(item => item.picture = `https://${process.env.EXAMPLES_API_HOST}${item.picture}`)

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
  
  ret.product = await fetch(`${apiUrl}/category/${categoryName}/${productId}`)
    .then((res) => res.json())
    .catch((e) => (ret.error = e.message));

  ret.product.picture = `https://${process.env.EXAMPLES_API_HOST}${ret.product.picture}`

  return ret;
}
