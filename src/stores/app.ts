import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const count = ref<number>(0)

  const increment = () => (count.value++)

  return {
    count,
    increment
  }
})
