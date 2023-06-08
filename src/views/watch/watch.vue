<template>
    <div>
        <div w-full bg-white flex flex-nowrap>
            {{ watchPointForm }}
            <watchPoint :url="watchPointUrl" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { commandsStore } from '@/stores/index'
import watchPoint from './watchPoint.vue'
const useCommandsStore = commandsStore()
const { watchPointForm } = storeToRefs(useCommandsStore)
const watchPointUrl = computed(() => {
    return `ws://172.22.56.12:9632/webSocket?height=600&width=800&ip-key=${watchPointForm.value.ip}&port=${watchPointForm.value.port}&username=${watchPointForm.value.username}&password=${watchPointForm.value.password}&`
})
</script>

<style scoped></style>
