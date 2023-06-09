import { http } from '@/utils/request'
import type { I12Status } from './types'

export const check12Status = () => {
    return http.get<I12Status>('/statusOn12')
}

export const check15Status = () => {
    return http.get<I12Status>('/statusOn15')
}
