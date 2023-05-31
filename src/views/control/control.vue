<template>
    <div flex>
        <a-card title="自定义添加节点案例" class="w-50% mr-16px">
            <a-form :model="addDiyData" layout="vertical">
                <a-form-item label="案例名">
                    <a-input
                        placeholder="请输入案例名"
                        v-model="projectItemName"
                    ></a-input>
                </a-form-item>

                <a-form-item label="退出进程名">
                    <a-input
                        placeholder="请输入excom"
                        v-model="projectItem.excom"
                    ></a-input>
                </a-form-item>
                <a-form-item label="目录">
                    <a-input
                        placeholder="请输入workdir"
                        v-model="projectItem.workdir"
                    ></a-input>
                </a-form-item>
                <a-form-item label="文件">
                    <a-input
                        placeholder="请输入cmd"
                        v-model="projectItem.commands.cmd"
                    ></a-input>
                </a-form-item>
                <a-form-item label="是否可控">
                    <a-select
                        v-model="projectItem.commands.isshell"
                        placeholder="请选择isshell"
                    >
                        <a-option>true</a-option>
                        <a-option>false</a-option>
                    </a-select></a-form-item
                >
                <a-form-item label="延迟启动的时间(秒)">
                    <a-input
                        v-model="projectItem.delay.start"
                        placeholder="启动延迟'"
                    ></a-input>
                    <a-input
                        v-model="projectItem.delay.end"
                        placeholder="结束延迟"
                    ></a-input>
                </a-form-item>
                <a-form-item label="选择节点">
                    <a-select
                        v-model="addDiyData.key"
                        default-value="15"
                        placeholder="请选择节点"
                    >
                        <a-option value="ip1">15</a-option>
                        <a-option value="ip2">16</a-option>
                    </a-select></a-form-item
                >
                <a-form-item>
                    <a-popconfirm
                        content="确定要添加这个案例吗?"
                        @ok="handleAddCommands"
                    >
                        <a-button>添加</a-button>
                    </a-popconfirm>
                </a-form-item>
            </a-form>
        </a-card>
        {{ delDiyPointSel }}
        <a-card title="自定义删除案例" class="w-50%">
            <a-form :model="delDiyData" layout="vertical">
                <a-form-item label="选择节点">
                    <a-select
                        v-model="delDiyPointSel"
                        placeholder="请选择节点"
                        @change="getCurrentProjectList"
                    >
                        <a-option value="ip1">15</a-option>
                        <a-option value="ip2">16</a-option>
                    </a-select></a-form-item
                >
                <a-form-item label="选择删除的进程">
                    <a-select
                        placeholder="请选择进程"
                        v-model="delDiyProcessSel"
                        :loading="delProjectListLoading"
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
import { addNewProject, getCommands } from '@/api/newApi'
import router from '@/router'

const addProjectPoint = ref()

const addDiyData = ref({
    action: 'add',
    key: '',
    data: {},
})
const projectItemName = ref('')

const projectItem = ref({
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

const handleAddCommands = () => {
    addDiyData.value.data[projectItemName.value] = projectItem.value
    if (!projectItemName.value) {
        return
    }

    addNewProject(addDiyData.value).then((res) => {
        if (res.code === 200) {
            setTimeout(() => {
                router.go(0)
            }, 1000)
        }
    })
}

const getCurrentProjectList = async () => {
    delProjectListLoading.value = true
    await getCommands(delDiyPointSel.value).then((res) => {
        delDiyProcessList.value = res.body.data

        delProjectListLoading.value = false
    })
}

const delProjectListLoading = ref(false)

const delDiyPointSel = ref()

const delDiyData = ref({ action: 'del', key: 'ip1', data: {} })

const delDiyProcessList = ref({})
const delDiyProcessSel = ref()

const handleDelCommands = () => {
    delDiyData.value.data[delDiyProcessSel.value] = toRaw(
        delDiyProcessList.value
    )[delDiyProcessSel.value]

    addNewProject(toRaw(delDiyData.value)).then((res) => {
        if (res.code === 200) {
            setTimeout(() => {
                router.go(0)
            }, 1000)
        }
    })
}
</script>

<style scoped></style>
