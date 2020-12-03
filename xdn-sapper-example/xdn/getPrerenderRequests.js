import { getCategories } from '../lib/cms';

export default async function getPrerenderRequests() {
  const { categories } = await getCategories();
  const requests = categories.map((c) => ({ path: `/api${c.href}` }))

  categories.forEach((c) => {
    requests.push(...c.items.map((p) => ({ path: `/api${p.href}` })));
  });

  return requests;
}
