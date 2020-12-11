<template>
  <div class="wrapper">
    <main class="main">
      <p class="description">
        This is an example Vue.js app powered by Moovweb XDN. Click a category above to get started.
      </p>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style>
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

.wrapper {
  @apply container mx-auto;
}

.description {
  line-height: 1.5;
  font-size: 1.5rem;
}
</style>
