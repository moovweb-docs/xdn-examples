import { Router } from '@xdn/core/router'
import { getCategories, getCategory } from '../lib/cms'

export default async function getPrerenderRequests() {
  const categories = await getCategories()
  const requests = categories.map(c => ({ path: c.href }))

  categories.forEach(async c => {
    const category = await getCategory(c.name)
    requests.push(...category.items.map(p => ({ path: p.href })))
  })

  return requests
}
