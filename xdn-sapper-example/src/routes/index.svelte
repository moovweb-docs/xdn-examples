<style lang="postcss">
  p {
    @apply text-center my-0 mx-auto;
  }
  .main {
    padding: 5rem 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .description {
    line-height: 1.5;
    font-size: 1.5rem;
  }
</style>

<svelte:head>
  <title>XDN Sapper Example</title>
</svelte:head>

<main class="main">
  <p class="description">
    This is an example Sapper app powered by Moovweb XDN. Click a category above to get started.
  </p>
</main>
