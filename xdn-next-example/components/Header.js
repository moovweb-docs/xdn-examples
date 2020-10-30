import Link from 'next/link';
import { Prefetch } from '@xdn/react';
import styles from '../styles/Header.module.css';

export default function Header({ categories }) {
  if (!categories) return null
  
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
