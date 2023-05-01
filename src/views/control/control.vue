<template>
    <div flex>
        <a-card title="自定义添加节点案例" class="w-50% mr-16px">
            <a-form :model="addDiyData" layout="vertical">
                <a-form-item label="案例名">
                    <a-input
                        placeholder="请输入案例名"
                        v-model="addProjectName"
                    ></a-input>
                </a-form-item>
                <a-form-item label="退出进程名">
                    <a-input
                        placeholder="请输入excom"
                        v-model="addDiyData.excom"
                    ></a-input>
                </a-form-item>
                <a-form-item label="目录">
                    <a-input
                        placeholder="请输入workdir"
                        v-model="addDiyData.workdir"
                    ></a-input>
                </a-form-item>
                <a-form-item label="文件">
                    <a-input
                        placeholder="请输入cmd"
                        v-model="addDiyData.commands.cmd"
                    ></a-input>
                </a-form-item>
                <a-form-item label="是否可控">
                    <a-select
                        v-model="addDiyData.commands.isshell"
                        placeholder="请选择isshell"
                    >
                        <a-option>true</a-option>
                        <a-option>false</a-option>
                    </a-select></a-form-item
                >
                <a-form-item label="延迟启动的时间(秒)">
                    <a-input
                        v-model="addDiyData.delay.start"
                        placeholder="启动延迟'"
                    ></a-input>
                    <a-input
                        v-model="addDiyData.delay.end"
                        placeholder="结束延迟"
                    ></a-input>
                </a-form-item>
                <a-form-item label="选择节点">
                    <a-select
                        v-model="addProjectPoint"
                        default-value="12"
                        placeholder="请选择节点"
                    >
                        <a-option>12</a-option>
                        <a-option>15</a-option>
                        <a-option>16</a-option>
                    </a-select></a-form-item
                >
                <a-form-item>
                    <a-button @click="handleAddCommands">添加</a-button>
                </a-form-item>
            </a-form>
        </a-card>
        <a-card title="自定义删除案例" class="w-50%">
            <a-form :model="delDiyData" layout="vertical">
                <a-form-item label="选择节点">
                    <a-select
                        v-model="delDiyPoint"
                        placeholder="请选择节点"
                        @change="getCurrentProcess"
                    >
                        <a-option>12</a-option>
                        <a-option>15</a-option>
                        <a-option>16</a-option>
                    </a-select></a-form-item
                >
                <a-form-item label="选择删除的进程">
                    <a-select
                        placeholder="请选择进程"
                        v-model="delDiyProcessSel"
                    >
                        <a-option
                            v-for="(option, key) in delDiyProcessList"
                            :key="key"
                            >{{ key }}</a-option
                        >
                    </a-select></a-form-item
                >
                <a-form-item>
                    <a-popconfirm
                        content="确定要删除这个案例吗?"
                        @ok="handleDelCommands"
                    >
                        <a-button>删除</a-button>
                    </a-popconfirm>
                </a-form-item>
            </a-form>
        </a-card>
    </div>
</template>
<script setup lang="ts">
import { getDiyStatus } from '@/api/diy/diy'
import { add12Diy, add15Diy, add16Diy, diyData } from '@/api/diy/diy'
import router from '@/router'

const addProjectName = ref('')
const addProjectPoint = ref(12)

const addDiyData = ref<diyData>({
    commands: {
        cmd: '',
        isshell: 'false',
    },
    excom: 'taskkill /f /im',
    workdir: '',
    delay: {
        start: '',
        end: '',
    },
})

const delDiyData = ref({})
const delDiyPoint = ref(12)
const delDiyProcessList = ref({})
const delDiyProcessSel = ref()

onMounted(() => {
    getCurrentProcess()
})

const handleAddCommands = async () => {
    const command = {
        action: 'add',
        data: {},
    }
    command.data[addProjectName.value] = JSON.parse(
        JSON.stringify(addDiyData.value)
    )

    console.log(command)
    if (addProjectPoint.value == 15) {
        await add15Diy(command)
    } else if (addProjectPoint.value == 12) {
        await add12Diy(command)
    } else if (addProjectPoint.value == 16) {
        await add16Diy(command)
    }
    // router.go(0)
}

const handleDelCommands = async () => {
    const command = {
        action: 'del',
        data: {},
    }
    command.data[delDiyProcessSel.value] = JSON.parse(
        JSON.stringify(delDiyProcessList.value[delDiyProcessSel.value])
    )
    console.log(command)
    if (delDiyPoint.value == 15) {
        await add15Diy(command)
    } else if (delDiyPoint.value == 12) {
        await add12Diy(command)
    } else if (delDiyPoint.value == 16) {
        await add16Diy(command)
    }
    // router.go(0)
}

const getCurrentProcess = async () => {
    delDiyProcessList.value = {}
    const body = await getDiyStatus(delDiyPoint.value)
    if (typeof body !== 'undefined') {
        delDiyProcessList.value = body.data
    }
}
</script>

<style scoped></style>
