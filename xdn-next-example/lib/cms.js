import fetch from 'isomorphic-fetch';

const apiUrl = `https://${process.env.EXAMPLES_API_HOST}`;

/**
 * Gets all categories
 *
 * @return {Array}
 */
export async function getCategories() {
  const ret = { categories: [] }
  return await fetch(`${apiUrl}/category`)
    .then(async (res) => ret.categories = await res.json())
    .catch((e) => ({ error: e.message }));
}

/**
 * Gets a category by ID
 * @param {String} categoryId
 *
 * @return {Object}
 */
export async function getCategory(categoryName) {
  const ret = { products: [] };
  await fetch(`${apiUrl}/category/${categoryName}`)
    .then(async (res) => ret.products = await res.json())
    .catch((e) => (ret.error = e.message));

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
  await fetch(`${apiUrl}/category/${categoryName}/${productId}`)
    .then(async (res) => ret.product = await res.json())
    .catch((e) => (ret.error = e.message));

  return ret;
}
