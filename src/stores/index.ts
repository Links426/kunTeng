import { http } from '@/utils/request'
import { defineStore } from 'pinia'
interface IDiyStatus {
    body: any
    code: number
    errmsg: string
}

interface IParamsStatus {
    body: IParamsBody
    code: number
    errmsg: string
}
interface IParamsBody {
    acceptcommands: string[]
    current_processes: { [key: string]: any }
    healthy_check: Object
}

export const get12ParamsStatus = async () => {
    return await http.get<IParamsStatus>('/statusOn12')
}
export const get15ParamsStatus = async () => {
    return await http.get<IParamsStatus>('/statusOn15')
}
export const get16ParamsStatus = async () => {
    return await http.get<IParamsStatus>('/statusOn16')
}

// 使用setup模式定义
export const commandsStore = defineStore('command', () => {
    const point12Status = ref({})

    const point15Status = ref({})
    const point16Status = ref({})

    const currentProcessList = reactive([])

    const refresh12Status = async () => {
        const { body } = await get12ParamsStatus()
        point12Status.value = body.acceptcommands
    }

    const refresh15Status = async () => {
        const { body } = await get15ParamsStatus()
        point15Status.value = body.acceptcommands
    }
    const refresh16Status = async () => {
        const { body } = await get16ParamsStatus()
        point16Status.value = body.acceptcommands
    }

    return {
        point12Status,
        point15Status,
        point16Status,
        refresh12Status,
        refresh15Status,
        refresh16Status,
    }
})
