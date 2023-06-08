<template>
    <div flex>
        <a-card title="自定义启动节点案例" class="w-50% mr-16px">
            <a-form :model="lanuchData" layout="vertical">
                <a-form-item label="案例名">
                    <a-input
                        placeholder="请输入案例名"
                        v-model="lanuchData.process_name"
                    ></a-input>
                </a-form-item>

                <a-form-item label="选择节点">
                    <a-input
                        placeholder="请输入 Key 值"
                        v-model="lanuchData.key"
                    ></a-input
                ></a-form-item>
                <a-form-item>
                    <a-popconfirm
                        content="确定要启动这个案例吗?"
                        @ok="handleLanuchCommand"
                    >
                        <a-button>启动</a-button>
                    </a-popconfirm>
                </a-form-item>
            </a-form>
        </a-card>

        <a-card title="自定义停止节点案例" class="w-50% mr-16px">
            <a-form :model="lanuchData" layout="vertical">
                <a-form-item label="案例名">
                    <a-input
                        placeholder="请输入案例名"
                        v-model="stopData.process_name"
                    ></a-input>
                </a-form-item>

                <a-form-item label="选择节点">
                    <a-input
                        placeholder="请输入 Key 值"
                        v-model="stopData.key"
                    ></a-input
                ></a-form-item>
                <a-form-item>
                    <a-popconfirm
                        content="确定要停止这个案例吗?"
                        @ok="handleLanuchCommand"
                    >
                        <a-button>停止</a-button>
                    </a-popconfirm>
                </a-form-item>
            </a-form>
        </a-card>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { finalStart, finalStop } from '../../api/newApi'

const lanuchData = ref({
    process_name: '',
    key: '',
})

const stopData = ref({
    process_name: '',
    key: '',
})

const handleLanuchCommand = () => {
    finalStart(lanuchData.value.key, lanuchData.value.process_name)
}

const handleStopCommand = () => {
    finalStop(stopData.value.key, stopData.value.process_name)
}
</script>

<style scoped></style>
