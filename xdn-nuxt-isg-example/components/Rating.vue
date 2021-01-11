<script lang="ts">
export default {
  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
}
</script>

<template>
  <div class="flex items-center mt-1">
    <span v-for="index in 5" :key="index">
      <svg
        v-if="Math.round(value) >= index + 1"
        class="w-4 h-4 fill-current text-yellow-600"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path
          d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
        />
      </svg>
      <svg
        v-else
        class="w-4 h-4 fill-current text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path
          d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
        />
      </svg>
    </span>
  </div>
</template>
