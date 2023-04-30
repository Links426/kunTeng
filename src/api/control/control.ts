import { http } from '@/utils/request'

export const optionModal = (
    process_isshell: boolean,
    process_name: string,
    token: string = '1'
) => {
    return {
        process_isshell: process_isshell,
        process_name: process_name,
        token: token,
    }
}

interface IOpenPoint {
    process_isshell: boolean
    process_name: string
    token: string
}

export const start12Commands = async (option: IOpenPoint) => {
    return await http.post('/start12', option)
}

export const start15Commands = async (option: IOpenPoint) => {
    return await http.post('/start15', option)
}
export const start16Commands = async (option: IOpenPoint) => {
    return await http.post('/start16', option)
}

export const stop12Commands = async (process_id: string, token = '1') => {
    return await http.post('/stop12', { process_id, token })
}
export const stop15Commands = async (process_id: string, token = '1') => {
    return await http.post('/stop15', { process_id, token })
}
export const stop16Commands = async (process_id: string, token = '1') => {
    return await http.post('/stop16', { process_id, token })
}
