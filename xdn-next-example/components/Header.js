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
    <>
      <header className="bg-white rounded-lg p-2 justify-center">
        <div className={`container ${styles.logoContainer}`}>
          <Link href="/" passHref>
            <a>
              <img src="/moovweb.svg" alt="Moovweb Logo" />
              <div className="text-center text-gray-700">Next.js Example</div>
            </a>
          </Link>
        </div>
        <div className={`md:flex ${styles.container}`}>
          <ul>
            {categories.map(({ category, categoryName, href }, i) => (
              <li
                key={categoryName}
                className={activeTab === i ? styles.active : null}
              >
                <Link href={href} passHref>
                  <Prefetch>
                    <a>{categoryName}</a>
                  </Prefetch>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </>
  );
}
