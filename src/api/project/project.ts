import { IParamsStatus } from '@/stores/index'
import { http } from '@/utils/request'
export const getAllExample = async () => {
    return await http.get<IParamsStatus>('/cases15')
}

export const search15Action = async (name: string) => {
    return await http.post<IParamsStatus>('/search15', { case_name: name })
}

export const search16Action = async (name: string) => {
    return await http.post<IParamsStatus>('/search16', { case_name: name })
}

// 获取16算法
export const get16Algorithm = async () => {
    return await http.get<IParamsStatus>('/useral16')
}

// 修改16算法
export const change16Algorithm = async (
    run_process_name: string,
    code: string
) => {
    return await http.post<IParamsStatus>('/useral16', {
        run_process_name,
        code,
    })
}
