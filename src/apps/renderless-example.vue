<script>
import { ref } from 'vue'
// import { useAppStore } from '@/stores/app'
export default {
  name: 'renderless-test',
  setup (props, { slots }) {
    // const store = useAppStore()

    const count = ref(0)
    const increment = () => (count.value++)

    return () => slots.default({
      increment,
      count
    })
  }
}
</script>
