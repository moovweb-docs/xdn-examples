import Link from 'next/link';
import { Prefetch } from '@xdn/react';
import { getCategory } from '../../lib/cms';

export default function ProductListingPage({ products }) {
  return (
    <div className="container center">
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id}>
            <Link href={product.href} passHref>
              <Prefetch>
                <a>
                  <div className="relative">
                    <div className="pb-2/3">
                      <img
                        className="object-contain h-48 w-full"
                        src={product.picture}
                      />
                    </div>
                    <div className="absolute w-full bottom-0 text-center bg-gray-500 bg-opacity-50">
                      {product.name}
                    </div>
                  </div>
                </a>
              </Prefetch>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  // fetch mock products for category
  const { products, error } = await getCategory(params.name);

  return {
    props: { products },
  };
}
