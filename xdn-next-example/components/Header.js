import Link from 'next/link';
import { Prefetch } from '@xdn/react';
import styles from '../styles/Header.module.css';
import { useEffect, useState } from 'react';
import { getCategories } from '../lib/cms';

export default function Header() {
  const [categories, setCategories] = useState();

  useEffect(() => {
    async function fetchCategories() {
      const { categories: results, error } = await getCategories();

      setCategories(results);
    }
    fetchCategories();
  }, []);

  if (!categories) return null;

  return (
    <div className={styles.container}>
      <ul>
        {categories.map(({ category, categoryName, href }) => (
          <li key={categoryName}>
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
