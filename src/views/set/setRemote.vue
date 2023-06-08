<template>
    <div>
        <a-card title="设置监控画面信息">
            <a-tag bordered color="orange" size="large"
                >操作前请刷新此网页,Gua的特性会导致此页面无法操作</a-tag
            >
            <a-form :model="pointForm" layout="vertical">
                <a-form-item field="ip" label="IP">
                    <a-input
                        v-model="pointForm.ip"
                        placeholder="please enter your username..."
                    />
                </a-form-item>
                <a-form-item field="port" label="Port">
                    <a-input
                        v-model="pointForm.port"
                        placeholder="please enter your post..."
                    />
                </a-form-item>
                <a-form-item field="username" label="Username">
                    <a-input
                        v-model="pointForm.username"
                        placeholder="please enter your post..."
                    />
                </a-form-item>
                <a-form-item field="password" label="Password">
                    <a-input
                        v-model="pointForm.password"
                        placeholder="please enter your post..."
                    />
                </a-form-item>

                <a-form-item>
                    <a-popconfirm content="确定这次设置吗？" @ok="confirmForm">
                        <a-button>提交</a-button>
                    </a-popconfirm>
                </a-form-item>
            </a-form>
        </a-card>
    </div>
</template>
<script setup lang="ts">
import { commandsStore } from '@/stores/index'

const useCommandsStore = commandsStore()
const { watchPointForm } = storeToRefs(useCommandsStore)

const pointForm = ref({
    ip: 'ip1',
    port: '6400',
    username: 'huangxiaojie',
    password: 'Aa123456',
})
const confirmForm = () => {
    watchPointForm.value = pointForm.value
}
</script>

<style scoped></style>
