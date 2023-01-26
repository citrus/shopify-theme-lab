<template>
  <div class="my-5">
    <div class="bg-purple-700 text-white rounded p-5">
      <h2 class="text-xl mb-1">
        Hello from Vue with Vite!
      </h2>
      <p>Count: {{ store.count }}</p>
      <button
        class="block border rounded mt-3 px-1 bg-white bg-opacity-10 hover:bg-opacity-30"
        @click="store.increment"
      >
        Increment!
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app'
const store = useAppStore()
</script>
