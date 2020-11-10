import Link from 'next/link';
import { Prefetch } from '@xdn/react';
import styles from '../styles/Header.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCategories } from '../lib/cms';

export default function Header() {
  const [categories, setCategories] = useState();
  const [activeTab, setActiveTab] = useState();
  const router = useRouter();

  useEffect(() => {
    async function fetchCategories() {
      const { categories: results, error } = await getCategories();

      setCategories(results);
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    router.events.on('routeChangeComplete', (url) => {
      if (categories) {
        setActiveTab(categories.findIndex(({ href }) => href === url));
      }
    });
  }, [categories]);

  if (!categories) return null;

  return (
    <div className={styles.container}>
      <ul>
        {categories.map(({ category, categoryName, href }, i) => (
          <li
            key={categoryName}
            className={activeTab === i ? styles.active : null}
          >
            <Link as={href} href="/category/[id]" passHref>
              <Prefetch>
                <a>{categoryName}</a>
              </Prefetch>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
