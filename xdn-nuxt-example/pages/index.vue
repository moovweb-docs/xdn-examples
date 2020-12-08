<template>
  <div class="container">
    <main class="main">
      <p class="description">
        This is an example NuxtJS app powered by Moovweb XDN. Click a category
        above to get started.
      </p>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
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

.container {
  @apply container mx-auto;
}

.description {
  line-height: 1.5;
  font-size: 1.5rem;
}
</style>
