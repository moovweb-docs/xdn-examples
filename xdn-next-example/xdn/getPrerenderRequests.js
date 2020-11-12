import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { getCategories } from '../lib/cms';

// Read the Next.js build ID from '.next/BUILD_ID
// This is configured in `xdn.config.js` to be included in the build/deploy
const buildIdPath = join(process.cwd(), '.next', 'BUILD_ID');

export default async function getPrerenderRequests() {
  const { categories } = await getCategories();
  const requests = categories.map((c) => ({ path: c.href }));

  categories.forEach((c) => {
    requests.push(...c.items.map((p) => ({ path: p.href })));
  });

  if (existsSync(buildIdPath)) {
    const buildId = readFileSync(buildIdPath, 'utf8');
    const apiPaths = requests.map((req) => ({
      path: `/_next/data/${buildId}/${req.path.replace(/^\/|\/$/, '')}.json`,
    }));
    requests.push(...apiPaths);
  }

  return requests;
}
