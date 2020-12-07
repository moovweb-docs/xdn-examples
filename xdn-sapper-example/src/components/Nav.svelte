<script>
  import { onMount } from 'svelte'
  import { stores } from '@sapper/app'
  import { Prefetch } from '@xdn/svelte'
  import { getCategories, getApiPath } from '../../lib/cms'

  export let categories = []
  export let segment

  const { page } = stores()

  onMount(async () => {
    const data = await getCategories()
    categories = data.categories
  })
</script>

<style lang="postcss">
  nav {
    border-bottom: 1px solid rgba(255, 62, 0, 0.1);
    font-weight: 300;
    padding: 0 1em;
  }

  li {
    display: block;
    float: left;
  }

  a {
    text-decoration: none;
    display: block;
    padding: 0.5em;
  }

  [aria-current] {
    position: relative;
    display: inline-block;
  }

  [aria-current]::after {
    position: absolute;
    content: '';
    width: calc(100% - 1em);
    height: 2px;
    background-color: rgb(255, 62, 0);
    display: block;
    bottom: -1px;
  }

  .flex-container {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
  }

  .flex-container ul {
    width: 50%;
    display: flex;
    align-items: stretch;
    justify-content: space-between;
  }

  .flex-container li {
    flex: 0 1 auto;
    list-style-type: none;
  }

  .logoContainer {
    width: 200px;
  }
</style>

<nav>
  <header class="bg-white rounded-lg p-2 justify-center">
    <div class="container mx-auto logoContainer">
      <a href="/">
        <img src="/moovweb.svg" alt="Moovweb Logo" />
        <div class="text-center text-gray-700">Sapper Example</div>
      </a>
    </div>
    <div class="flex-container mx-auto">
      <ul>
        {#each categories as category, i}
          <li>
            <Prefetch url={getApiPath(category.href)} immediately>
              <a
                aria-current={$page.path === category.href ? 'page' : undefined}
                href={category.href}>{category.categoryName}</a>
            </Prefetch>
          </li>
        {/each}
      </ul>
    </div>
  </header>
</nav>
