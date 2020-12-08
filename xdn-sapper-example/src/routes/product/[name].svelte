<script context="module">
  import { getProductById } from '../../../lib/cms'

  export async function preload({ params }) {
    const { product } = await getProductById(params.name)

    return { product }
  }
</script>

<script>
  import Rating from '../../components/Rating.svelte'

  export let product
</script>

<div class="container center flex flex-row">
  <div class="container px-4"><img src={product.picture} alt={product.name} /></div>
  <div class="container px-4 flex flex-col">
    <h2 class="font-bold py-2 m2">{product.name}</h2>
    <div class="py-2 m2">{product.description}</div>
    <div class="py-2 m2">${product.price}</div>
    <div class="py-2 m2">
      <Rating value={Number(product.rating)} />
    </div>
    <div class="py-2 m2">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Add To Cart
      </button>
    </div>
  </div>
</div>
