<template>
    <div flex flex-wrap>
        <a-card
            w-320px
            mr-16px
            mb-16px
            :title="item.name"
            v-for="item in finalExampleList"
        >
            <div mb-20px>{{ item.brief }}</div>
            <div flex justify-between>
                <a-button @click="startCommand(item.name)">一键启动</a-button>
                <a-button @click="closeCommand(item.name)">停止</a-button>
            </div>
        </a-card>
    </div>
</template>
<script setup lang="ts">
import {
    optionModal,
    start15Commands,
    start16Commands,
    stop15Commands,
    stop16Commands,
} from '@/api/control/control'
import {
    getAllExample,
    search15Action,
    search16Action,
} from '@/api/project/project'
import {
    commandsStore,
    get15ParamsStatus,
    get16ParamsStatus,
} from '@/stores/index'

const useCommandsStore = commandsStore()
const { finalExampleList } = storeToRefs(useCommandsStore)

const startCommand = async (item: string) => {
    const cmd15 = (await search15Action(item)).body.process_names
    const cmd16 = (await search16Action(item)).body.process_names

    for (let cmd of cmd15) {
        start15Commands(optionModal(false, cmd))
    }
    for (let cmd of cmd16) {
        start16Commands(optionModal(false, cmd))
    }
}

const closeCommand = async (item: string) => {
    const cls15 = (await search15Action(item)).body.process_names
    const cls16 = (await search16Action(item)).body.process_names
    for (let cls of cls15) {
        const { body } = await get15ParamsStatus()
        const processId = Object.keys(body.current_processes).find(
            (key) => body.current_processes[key].command === cls
        )
        await stop15Commands(processId!)
    }
    for (let cls of cls16) {
        const { body } = await get16ParamsStatus()
        const processId = Object.keys(body.current_processes).find(
            (key) => body.current_processes[key].command === cls
        )
        await stop16Commands(processId!)
    }
}
onMounted(async () => {
    finalExampleList.value = Object.entries((await getAllExample()).body).map(
        ([name, { brief, friendly_name }]) => ({
            name,
            brief,
            friendly_name,
        })
    )
})
</script>

<style scoped></style>
