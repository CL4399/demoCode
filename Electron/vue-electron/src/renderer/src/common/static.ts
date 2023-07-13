import { getCurrentInstance, ComponentInternalInstance } from 'vue'
const {
  appContext: {
    config: {
      globalProperties: { $message }
    }
  }
} = getCurrentInstance() as ComponentInternalInstance
const message = (type: string, title = '提示') => {
  return $message[type](title)
}
export default {
    message
}
