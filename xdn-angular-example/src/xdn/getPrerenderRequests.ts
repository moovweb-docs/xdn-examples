import { getCategories, getApiPath, ICategory, IProduct } from './cms'

export default async function getPrerenderRequests() {
  const categories = await getCategories()
  const requests = categories.map((c: ICategory) => ({ path: getApiPath(c.href) }))

  categories.forEach((c: ICategory) => {
    requests.push(...c.items.map((p: IProduct) => ({ path: getApiPath(p.href) })))
  })

  return requests
}
