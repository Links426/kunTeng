import { http } from '@/utils/request'
import { defineStore } from 'pinia'

export const commandsStore = defineStore('command', () => {
    const finalExampleList = ref()
    const commandsLibrary = ref({
        ip1: [],
        ip2: [],
    })
    return {
        finalExampleList,
        commandsLibrary,
    }
})
