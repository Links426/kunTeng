export function debounce(func: Function, delay: number) {
    let timer: string | number | NodeJS.Timeout | undefined
    return function (this: unknown, ...args: any[]) {
        let that = this
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(that, args)
        }, delay)
    }
}
