<template>
    <div class="box">
        <div flex justify-between>
            <a-select
                v-model="selValue"
                mb-12px
                :style="{ width: '320px' }"
                placeholder="请选择在16节点上的代码"
                @change="changeCode"
            >
                <a-option v-for="option in AlgorithmOptions">{{
                    option.run_process_name
                }}</a-option>
            </a-select>

            <a-popconfirm content="确定提交代码修改？" @ok="submitCode">
                <a-button>确定</a-button>
            </a-popconfirm>
        </div>

        <Editor v-model="code"> </Editor>
    </div>
</template>
<script setup lang="ts">
import { change16Algorithm, get16Algorithm } from '@/api/project/project'
import Editor from '@/components/Monaco/Editor.vue'
const code = ref('')
const selValue = ref()
const AlgorithmOptions = ref<{ code: string; run_process_name: string }[]>([])

const changeCode = () => {
    code.value = toRaw(
        AlgorithmOptions.value.find(
            (item: { run_process_name: string }) =>
                item.run_process_name === selValue.value
        )
    )!.code
}
onMounted(async () => {
    AlgorithmOptions.value = (await get16Algorithm()).body.userals
})
const submitCode = () => {
    change16Algorithm(selValue.value, code.value)
}
</script>

<style scoped>
.box {
    height: calc(100vh - 176px);
    width: 100%;
}
</style>
