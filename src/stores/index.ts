import { http } from '@/utils/request'
import { defineStore } from 'pinia'

export const commandsStore = defineStore('command', () => {
    const finalExampleList = ref()
    const commandsLibrary = ref({
        ip1: [],
        ip2: [],
    })
    const watchPointForm = ref({
        ip: 'ip1',
        port: '6400',
        username: 'huangxiaojie',
        password: 'Aa123456',
    })
    return {
        finalExampleList,
        commandsLibrary,
        watchPointForm,
    }
})
