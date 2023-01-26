<script>
import { useAppStore } from '@/stores/app'
export default {
  name: 'renderless-example',
  props: {
    message: {
      type: String,
      required: true
    }
  },
  setup (props, { slots }) {
    const store = useAppStore()
    return () => slots.default({
      message: props.message.toUpperCase(),
      store
    })
  }
}
</script>
