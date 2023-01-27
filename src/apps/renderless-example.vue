<script>
import { ref } from 'vue'
import { useAppStore } from '@/stores/app'
export default {
  name: 'renderless-test',
  setup (props, { slots }) {
    const store = useAppStore()

    const localCount = ref(0)
    const localIncrement = () => (localCount.value++)

    return () => slots.default({
      store,
      localIncrement,
      localCount
    })
  }
}
</script>
