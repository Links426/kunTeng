import { http } from '@/utils/request'

// 获取16算法
export const get16Algorithm = async () => {
    return await http.get(`/useral?key=ip2`)
}

// 修改16算法
export const change16Algorithm = async (
    run_process_name: string,
    code: string,
    key: string
) => {
    return await http.post('/useral', {
        run_process_name,
        code,
        key,
    })
}
