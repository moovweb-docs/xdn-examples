<script context="module">
  import { getCategory } from '../../../lib/cms';

  export async function preload({ params }) {
    const { products } = await getCategory(params.name);

    return { products };
  }
</script>

<script>
  import { Prefetch } from '@xdn/svelte';
  import Rating from '../../components/Rating.svelte';
  
  export let products = [];
</script>

<div class="container center">
  <div
    class="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {#each products as product}
      <div>
        <Prefetch url={product.href}>
          <a href={product.href}>
            <div class="relative">
              <div
                class="pb-2/3 bg-contain bg-center bg-no-repeat h-48"
                style="background-image: url({product.picture})" />
              <div class="w-full text-left lowercase font-bold">
                {product.name}
              </div>
              <div class="w-full text-left">
                <Rating value={product.rating} />
              </div>
              <div class="w-full text-left">${product.price}</div>
            </div>
          </a>
        </Prefetch>
      </div>
    {/each}
  </div>
</div>
