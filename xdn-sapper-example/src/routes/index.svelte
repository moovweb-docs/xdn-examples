<style lang="postcss">
  h1,
  p {
    @apply text-center my-0 mx-auto;
  }

  h1 {
    @apply text-3xl uppercase font-bold m-0 mb-4 text-orange-500 font-sans;
  }

  p {
    @apply my-0 mx-auto;
  }

  @screen md {
    h1 {
      @apply text-4xl;
    }
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
