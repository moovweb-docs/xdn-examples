import fetch from 'axios';

const apiUrl = `https://moovweb-docs-xdn-examples-api-default.moovweb-edge.io`;

export function getOptimizedImageUrl(path) {
  return `https://opt.moovweb.net?quality=30&height=250&width=250&img=${encodeURIComponent(
    apiUrl + path
  )}`;
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
  ret.categories = res.data;

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

  ret.products = res.data;
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
export async function getProductById(productId) {
  const ret = { product: {} };

  const res = await fetch(`${apiUrl}/product/${productId}`).catch(
    (e) => (ret.error = e.message)
  );

  if (res.status === 200) {
    ret.product = res.data;
    ret.product.picture = getOptimizedImageUrl(ret.product.picture);
  }

  return ret;
}
