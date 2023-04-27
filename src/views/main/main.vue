<template>
    <div>
        <div flex>
            <a-card
                w-360px
                mr-16px
                mb-16px
                :title="card.title"
                v-for="card in pointList"
                :key="card.id"
            >
                <template #extra>
                    <a-link @click="card.requestMethod">刷新</a-link>
                </template>

                <div h-full>{{ card.status }}</div>
            </a-card>
        </div>
        <!-- 12 -->
        <div flex mb-20px>
            <a-card
                mr-8px
                v-for="project in point12Status"
                :key="project"
                :title="project"
            >
                <a-button @click="launchProject(project, 12)">启动</a-button>
                <a-button @click="closeProject(project, 12)">关闭</a-button>
            </a-card>
        </div>
        <!-- 15 -->
        <div flex mb-20px flex-wrap>
            <a-card
                min-w-200px
                mr-8px
                mb-8px
                v-for="project in point15Status"
                :key="project"
                :title="project"
            >
                <div flex justify-between>
                    <a-button @click="launchProject(project, 15)"
                        >启动</a-button
                    >
                    <a-button @click="closeProject(project, 15)">关闭</a-button>
                </div>
            </a-card>
        </div>
        <!-- 16 -->
        <div flex flex-wrap>
            <a-card
                min-w-200px
                mr-8px
                mb-8px
                v-for="project in point16Status"
                :key="project"
                :title="project"
            >
                <div flex justify-between>
                    <a-button @click="launchProject(project, 16)"
                        >启动</a-button
                    >
                    <a-button @click="closeProject(project, 16)">关闭</a-button>
                </div>
            </a-card>
        </div>
    </div>
</template>
<script setup lang="ts">
import {
    optionModal,
    start12Commands,
    start15Commands,
    start16Commands,
    stop15Commands,
} from '@/api/control/control'
import { get12Diy, get15Diy, get16Diy, getDiyStatus } from '@/api/diy/diy'
import { commandsStore } from '@/stores/index'
import {
    get12ParamsStatus,
    get15ParamsStatus,
    get16ParamsStatus,
} from '@/stores/index'

const useCommandsStore = commandsStore()
const { point12Status, point15Status, point16Status } =
    storeToRefs(useCommandsStore)
const { refresh12Status, refresh15Status, refresh16Status } = useCommandsStore

const pointList = ref([
    {
        id: 0,
        title: '节点12',
        requestMethod: refresh12Status,
        status: point12Status,
    },
    {
        id: 1,
        title: '节点15',
        requestMethod: refresh15Status,
        status: point15Status,
    },
    {
        id: 2,
        title: '节点16',
        requestMethod: refresh16Status,
        status: point16Status,
    },
])

interface Command {
    point: number
    control: {
        commands: {
            cmd: string
            isshell: boolean
        }
        excom: string
    }
}

const launchProject = async (name: string, point: number) => {
    let command: Command = {
        point: 0,
        control: { commands: { cmd: '', isshell: false }, excom: '' },
    }
    const body = await getDiyStatus(point) // 这个函数根据point的值返回不同的数据
    command.control = body!.data[name]
    command.point = point
    switch (point) {
        case 12:
            start12Commands(optionModal(command.control.commands.isshell, name))
            break
        case 15:
            start15Commands(optionModal(command.control.commands.isshell, name))
            break
        case 16:
            start16Commands(optionModal(command.control.commands.isshell, name))
            break
        default:
            console.log('Invalid point value')
    }
}

const closeProject = async (name: string, point: number) => {
    if (point === 12) {
        await get12ParamsStatus()
    } else if (point === 15) {
        const { body } = await get15ParamsStatus()
        const processId = Object.keys(body.current_processes).find(
            (key) => body.current_processes[key].command === name
        )
        await stop15Commands(processId!)
    } else if (point === 16) {
        await get16ParamsStatus()
    }
}
</script>

<style scoped></style>
