// composables/alert.ts
import { storeToRefs } from 'pinia'
import { useAlertStore } from '@/stores/alert'

export function useAlert() {
  const alertStore = useAlertStore()
  const { alerts } = storeToRefs(alertStore)
  const { vAlert, vSuccess } = alertStore
  return { alerts, vAlert, vSuccess }
}
