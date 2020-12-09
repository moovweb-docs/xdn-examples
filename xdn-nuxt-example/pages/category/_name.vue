<script lang="ts">
import { Prefetch } from '@xdn/vue'
import { getCategory, getApiPath } from '../../lib/cms'
import Rating from '../../components/Rating.vue'

export default {
  components: {
    Rating,
    Prefetch,
  },
  async asyncData({ params }) {
    const { products } = await getCategory(params.name)

    return { products }
  },
  methods: {
    getApiPath,
  },
}
</script>

<template>
  <div class="container mx-auto">
    <div
      class="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <div v-for="product in products" :key="product.name">
        <Prefetch :url="getApiPath(product.href)">
          <NuxtLink :to="product.href">
            <div class="relative">
              <div
                class="pb-2/3 bg-contain bg-center bg-no-repeat h-48"
                :style="{ 'background-image': 'url(' + product.picture + ')' }"
              />
              <div class="w-full text-left lowercase font-bold">
                {{ product.name }}
              </div>
              <div class="w-full text-left">
                <Rating :value="Number(product.rating)" />
              </div>
              <div class="w-full text-left">${{ product.price }}</div>
            </div>
          </NuxtLink>
        </Prefetch>
      </div>
    </div>
  </div>
</template>
