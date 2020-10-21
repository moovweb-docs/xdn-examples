import Link from 'next/link';
import { Prefetch } from '@xdn/react';
import styles from '../styles/Header.module.css';
import { getCategories } from '../lib/cms';

export default function Header() {
  return (
    <div className={styles.container}>
      <ul>
        {getCategories().map(({ name, href }) => (
          <li key={name}>
            <Link href={href}>
              <Prefetch>
                <a>{name}</a>
              </Prefetch>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
