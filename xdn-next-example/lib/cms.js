import data from './data.json';

/**
 * Gets all categories
 *
 * @return {Array}
 */
export function getCategories() {
  return data;
}

/**
 * Gets a category by ID
 * @param {String} categoryId
 *
 * @return {Object}
 */
export function getCategory(categoryId) {
  return data.find(({ id }) => categoryId === id);
}

/**
 * Gets a product by ID
 * @param {String} productId
 *
 * @return {Object}
 */
export function getProductById(productId) {
  let product;

  getCategories().some(
    ({ products }) =>
      (product = products.find(({ id }) => String(productId) === String(id)))
  );

  return product;
}
