import { getCategories, getCategory } from './lib/cms'

export default async function getPrerenderRequests() {
  const categories = await getCategories()
  const requests = categories.map(c => ({ url: c.href }))

  categories.forEach(c => {
    const category = await getCategory(c.name)
    requests.push(...category.products.map(p => ({ url: p.href })))
  })

  return requests
}
