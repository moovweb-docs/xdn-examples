import { getCategories } from '../lib/cms';

export default async function getPrerenderRequests() {
  const { categories } = await getCategories();
  const requests = categories.map((c) => ({ path: c.href }))

  categories.forEach((c) => {
    requests.push(...c.items.map((p) => ({ path: p.href })));
  });

  return requests;
}