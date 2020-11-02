import { getProductById } from '../../../lib/cms';

function Rating({ value }) {
  const yellowStar = (<svg className="w-4 h-4 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>)
  const grayStar = (<svg className="w-4 h-4 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>)
  
  return (
    <div className="flex items-center mt-1">
      {Array.from({ length: 5 }, (item, i) => Math.round(value) >= (i+1) ? yellowStar : grayStar)}
    </div>
  )
}

export default function ProductPage({ product }) {
  return (
    <div className="container center flex flex-row">
      <div className="container px-4">
        <img src={product.picture} />
      </div>
      <div className="container px-4 flex flex-col">
        <h2 className="font-bold py-2 m2">{product.name}</h2>
        <div className="py-2 m2">{product.description}</div>
        <div className="py-2 m2">${product.price}</div>
        <div className="py-2 m2">
          <Rating value={Number(product.rating)} />
        </div>
        <div className="py-2 m2">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
export async function getServerSideProps({ params }) {
  // fetch mock product by id
  const { product, error } = await getProductById(params.name, params.id);

  return {
    props: { product },
  };
}
