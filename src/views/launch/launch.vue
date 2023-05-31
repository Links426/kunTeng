<template>
    <div flex flex-wrap>
        <a-card
            w-320px
            mr-16px
            mb-16px
            :title="value.friendly_name"
            v-for="(value, key) in finalExampleList"
        >
            <div mb-20px>{{ value.brief }}</div>
            <div flex justify-between>
                <a-button @click="startCommand(key)">一键启动</a-button>
                <a-button @click="stopCommand(key)">停止</a-button>
            </div>
        </a-card>
    </div>
</template>
<script setup lang="ts">
import {
    getCommands,
    getProjects,
    IP,
    finalStart,
    finalStop,
    getCurrentStatus,
} from '@/api/newApi'
import { commandsStore } from '@/stores/index'
import { isNull } from '@/utils/isNull'

const useCommandsStore = commandsStore()
const { finalExampleList, commandsLibrary } = storeToRefs(useCommandsStore)

const getCommandsName = (commandName: string) => {
    let commandsList = [] as any[]
    for (let key in commandsLibrary.value) {
        console.log(commandsLibrary.value[key])
        for (let value in commandsLibrary.value[key]) {
            if (value.includes(commandName)) {
                commandsList.push({ point: key, command: value })
            }
        }
    }
    return commandsList
}
const startCommand = (name: number | string) => {
    const result = getCommandsName(name as string)
    result.map((item) => {
        finalStart(item.point, item.command)
    })
}
const stopCommand = async (name: any) => {
    let points = ['ip1', 'ip2']
    for (let item in points) {
        let current = (await getCurrentStatus(points[item] as IP)).body
            .current_processes
        if (isNull(current)) {
            return
        }
        for (let key in current) {
            if (current[key].command.includes(name)) {
                console.log(key)
                finalStop(points[item] as IP, key)
            }
        }
    }
}

onBeforeMount(async () => {
    finalExampleList.value = await (await getProjects('ip1')).body
    commandsLibrary.value.ip1 = (await getCommands('ip1')).body.data
    commandsLibrary.value.ip2 = (await getCommands('ip2')).body.data
})
</script>

<style scoped></style>
