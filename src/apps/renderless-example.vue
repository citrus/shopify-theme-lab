<script>
import { useAppStore } from '@/stores/app'
export default {
  name: 'renderless-test',
  setup (props, { slots }) {
    const store = useAppStore()
    return () => slots.default({
      store
    })
  }
}
</script>
