import { http } from '@/utils/request'
export interface diyData {
    commands: {
        cmd: string
        isshell: string
    }
    excom: string
    workdir: string
    delay: {
        start: string
        end: string
    }
}
interface IDiyStatus {
    body: IDiyBody
    code: number
    errmsg: string
}

interface IDiyBody {
    data: any
}

export const get12Diy = async () => {
    return await http.get<IDiyStatus>('/commands12')
}

export const get15Diy = async () => {
    return await http.get<IDiyStatus>('/commands15')
}

export const get16Diy = async () => {
    return await http.get<IDiyStatus>('/commands16')
}

export const getDiyStatus = async (point: number) => {
    if (point == 12) {
        return (await get12Diy()).body
    } else if (point == 15) {
        return (await get15Diy()).body
    } else if (point == 16) {
        return (await get16Diy()).body
    }
    // switch (point) {
    //     case 12:
    //         return (await get12Diy()).body
    //     case 15:
    //         return (await get15Diy()).body
    //     case 16:
    //         return (await get16Diy()).body
    // }
}

export const add15Diy = async (data: any) => {
    return await http.post<IDiyStatus>('/commands15', data)
}
export const add12Diy = async (data: any) => {
    return await http.post<IDiyStatus>('/commands12', data)
}
export const add16Diy = async (data: any) => {
    return await http.post<IDiyStatus>('/commands16', data)
}
