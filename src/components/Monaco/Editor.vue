<template>
    <div ref="editContainer" class="code-editor"></div>
</template>
<script>
import { getCurrentInstance, onMounted, watch } from 'vue'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.main.js'
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'

self.MonacoEnvironment = {
    getWorker(workerId, label) {
        if (label === 'json') {
            return new JsonWorker()
        }
        return new EditorWorker()
    },
}

export default {
    props: {
        modelValue: String,
    },
    setup(props, { emit }) {
        let monacoEditor = null
        const { proxy } = getCurrentInstance()

        watch(
            () => props.modelValue,
            (value) => {
                // 防止改变编辑器内容时光标重定向
                if (value !== monacoEditor?.getValue()) {
                    monacoEditor.setValue(value)
                }
            }
        )

        onMounted(() => {
            monacoEditor = monaco.editor.create(proxy.$refs.editContainer, {
                value: props.modelValue,
                readOnly: false,
                language: 'python',
                theme: 'vs',
                selectOnLineNumbers: true,
                renderSideBySide: false,
                automaticLayout: true,
                scrollBeyondLastLine: false,
            })
            // 监听值变化
            monacoEditor.onDidChangeModelContent(() => {
                const currenValue = monacoEditor?.getValue()
                emit('update:modelValue', currenValue)
            })
        })
        return {}
    },
}
</script>
<style scoped>
.code-editor {
    height: 100%;
    width: 100%;
}
</style>
