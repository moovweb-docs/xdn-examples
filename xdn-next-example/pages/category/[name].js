import Link from 'next/link';
import { useRouter } from 'next/router';
import { Prefetch } from '@xdn/react';
import { getCategory } from '../../lib/cms';

export default function ProductListingPage({ products }) {
  const router = useRouter()
  
  return (
    <>
      <div className="container">
        <a onClick={() => router.push('/')}>
          <i className="arrow arrow-left"></i>back home
        </a>
      </div>
      <div className="container center">
        <div className="grid grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id}>
              <Link href={product.href} passHref>
                <Prefetch>
                  <a>
                    <div className="relative">
                      <div
                        className="pb-2/3 bg-contain bg-center bg-no-repeat h-48"
                        style={{ backgroundImage: `url(${product.picture})` }}
                      ></div>
                      <div className="w-full text-center bg-gray-500 bg-opacity-50 lowercase">
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
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { products, error } = await getCategory(params.name);

  return {
    props: { products },
  };
}
