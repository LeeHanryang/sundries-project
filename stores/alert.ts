// stores/alert.ts
import { defineStore } from 'pinia'

export type Alert = { message: string; type: 'error' | 'success' }

export const useAlertStore = defineStore('alert', {
  state: () => ({
    alerts: [] as Alert[],
  }),
  actions: {
    vAlert(message: string, type: Alert['type'] = 'error') {
      this.alerts.push({ message, type })
      setTimeout(() => {
        this.alerts.shift()
      }, 2000)
    },
    vSuccess(message: string) {
      this.vAlert(message, 'success')
    },
  },
})
