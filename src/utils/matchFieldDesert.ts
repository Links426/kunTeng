export const match = (arr1: string[], arr2: string[]): string[] => {
    let regex = /field\d+|desert\d+/

    let map = new Map<string, string[]>()

    for (let item of arr1) {
        let match = item.match(regex)
        if (match) {
            let key = match[0] // 取出匹配到的子字符串作为键
            if (map.has(key)) {
                // 如果map已经有这个键，就把对象追加到值数组中
                map.get(key)?.push(item)
            } else {
                // 如果map没有这个键，就创建一个新的值数组，并把对象放入其中
                map.set(key, [item])
            }
        }
    }

    // 遍历第二个数组，用同样的方法匹配每个对象，并放入map中
    for (let item of arr2) {
        let match = item.match(regex)
        if (match) {
            let key = match[0]
            if (map.has(key)) {
                map.get(key)?.push(item)
            } else {
                map.set(key, [item])
            }
        }
    }

    // 定义一个结果数组来存储所有的新数组
    let result: any = []

    // 遍历map中的每个键值对，把值数组放入结果数组中
    for (let [key, value] of map) {
        result.push(value)
    }
    console.log(result)
    return result
}
