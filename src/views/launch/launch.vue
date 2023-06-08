<template>
    <div flex>
        <div flex flex-wrap>
            <a-card
                w-320px
                mr-16px
                mb-16px
                :title="value.friendly_name"
                v-for="(value, key) in finalExampleList"
            >
                <div mb-20px>{{ value.brief }}</div>
                <div flex justify-between mb-12px>
                    <a-button @click="startCommand(key)">一键启动</a-button>
                    <a-button @click="stopCommand(key)">停止</a-button>
                </div>
                <a-button mb-20px @click="getDiyLaunchList(key)"
                    >展示自定义启动列表</a-button
                >
            </a-card>
        </div>
        <div>
            <a-card title="自定义启动列表">
                <a-list>
                    <a-list-item
                        v-for="(item, index) in diyLaunchList"
                        :key="index"
                    >
                        <a-tag color="orange" size="large" mr-20px>{{
                            item.command
                        }}</a-tag>
                        <a-button @click="startCommand(item.command)" mr-24px
                            >启动</a-button
                        >
                        <a-button @click="stopCommand(item.command)"
                            >停止</a-button
                        >
                    </a-list-item>
                </a-list></a-card
            >
        </div>
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

const diyLaunchList = ref()

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

const getDiyLaunchList = (name: any) => {
    diyLaunchList.value = getCommandsName(name)
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

    console.log(toRaw(finalExampleList.value))
})
</script>

<style scoped></style>
