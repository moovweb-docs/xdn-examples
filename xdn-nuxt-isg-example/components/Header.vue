<template>
  <nav>
    <header class="bg-white rounded-lg p-2 justify-center">
      <div class="container mx-auto logoContainer">
        <a href="/">
          <img src="/moovweb.svg" alt="Moovweb Logo" />
          <div class="text-center text-gray-700">NuxtJS Example</div>
        </a>
      </div>
      <div class="flex-container mx-auto">
        <ul>
          <li v-for="category in categories" :key="category.name">
            <Prefetch :url="getApiPath(category.href)">
              <NuxtLink :to="category.href">{{ category.categoryName }}</NuxtLink>
            </Prefetch>
          </li>
        </ul>
      </div>
    </header>
  </nav>
</template>

<script lang="ts">
import { getCategories, getApiPath } from '../lib/cms'
const { Prefetch } = require('@xdn/vue')

export default {
  components: {
    Prefetch,
  },
  async fetch() {
    // @ts-ignore
    this.categories = await getCategories()
  },
  data() {
    return {
      categories: [],
    }
  },
  methods: {
    getApiPath,
  },
}
</script>

<style>
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
