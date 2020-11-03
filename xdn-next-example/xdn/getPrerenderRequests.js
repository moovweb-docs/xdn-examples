import { getCategory } from './lib/cms'

export default async function getPrerenderRequests() {
  const categories = await cms.getCategories()
  const requests = categories.map(c => ({ url: c.url }))

  categories.forEach(c => {
    const category = await getCategory(c.name)
    requests.push(...category.products.map(p => ({ url: p.url })))
  })

  return requests
}