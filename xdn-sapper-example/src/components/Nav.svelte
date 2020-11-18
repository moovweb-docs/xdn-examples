<script>
  import { onMount } from 'svelte';
  import { Prefetch } from '@xdn/svelte';
  import { getCategories, getCategory } from '../../lib/cms';

  export let categories = [];
  export let segment;

  onMount(async () => {
    const data = await getCategories();
    categories = data.categories;
  });

  console.log('segment', segment)
</script>

<style>
  nav {
    border-bottom: 1px solid rgba(255, 62, 0, 0.1);
    font-weight: 300;
    padding: 0 1em;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  /* clearfix */
  ul::after {
    content: '';
    display: block;
    clear: both;
  }

  li {
    display: block;
    float: left;
  }

  a {
    text-decoration: none;
    padding: 1em 0.5em;
    display: block;
  }

  .logoContainer {
    width: 200px;
  }
</style>

<nav>
  <header class="bg-white rounded-lg p-2 justify-center">
    <div class="container md:flex logoContainer">
      <Prefetch url="/" immediately>
        <a href="/">
          <img src="/moovweb.svg" alt="Moovweb Logo" />
          <div class="text-center text-gray-700">Sapper Example</div>
        </a>
      </Prefetch>
    </div>
    <div class="md:flex">
      <ul>
        {#each categories as category, i}
          <li>
            <Prefetch url={category.href} immediately>
              <a href={category.href}>{category.categoryName}</a>
            </Prefetch>
          </li>
        {/each}
      </ul>
    </div>
  </header>
  <!-- <div class="container">{displayBackButton && <BackButton />}</div> -->
</nav>
