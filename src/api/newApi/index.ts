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

interface IResult {
    code: number
    errmsg: string
    body: any
}

interface ICurrentStatus {
    code: number
    errmsg: string
    body: {
        current_processes: Object
    }
}

interface IOpenPoint {
    process_isshell: boolean
    process_name: string
    token: string
}

interface IAddProject {
    action: string
    key: IP | string
    data: {
        [key: string]: {
            excom: string
            commands: {
                isshell: boolean | string
                cmd: string
            }
            delay: {
                start: string | number
                end: string | number
            }
            workdir: string
        }
    }
}

export type IP = 'ip1' | 'ip2'

export const getProjects = async (ip: IP) => {
    return await http.get<IResult>(`/cases?key=${ip}`)
}

export const getCommands = async (ip: IP) => {
    return await http.get<IResult>(`/commands?key=${ip}`)
}
export const finalStart = (key: string, name: string) => {
    return http.post('/start', {
        key: key,
        process_name: name,
        process_isshell: false,
        token: 1,
    })
}
export const finalStop = (key: string, id: string) => {
    return http.post('/stop', {
        key: key,
        process_id: id,
        process_isshell: false,
        token: 1,
    })
}

export const getCurrentStatus = async (ip: string) => {
    return http.get(`/status?key=${ip}`)
}

export const addNewProject = async (item: IAddProject) => {
    return await http.post('/commands', item)
}
