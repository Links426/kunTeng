<template>
    <div class="guacomponents">
        <div ref="gua"></div>
    </div>
</template>
<script setup lang="ts">
import Guacamole from 'guacamole-common-js'
const props = withDefaults(
    defineProps<{
        url: string
    }>(),
    {
        url: '',
    }
)

const gua = ref<HTMLDivElement | null>(null)
const guaC = new Guacamole.Client(new Guacamole.WebSocketTunnel(props.url))
onMounted(() => {
    gua.value?.appendChild(guaC.getDisplay().getElement())
    // Error handler
    guaC.onerror = function (error) {
        alert(error)
    }
    // Connect
    guaC.connect()
    // Disconnect on close
    window.onunload = () => {
        guaC.disconnect()
    }
    // Mouse
    const mouse = new Guacamole.Mouse(guaC.getDisplay().getElement())

    mouse.onmousedown =
        mouse.onmouseup =
        mouse.onmousemove =
            (mouseState) => {
                guaC.sendMouseState(mouseState)
            }

    // Keyboard
    const keyboard = new Guacamole.Keyboard(document)

    keyboard.onkeydown = (keySym) => {
        guaC.sendKeyEvent(1, keySym)
    }
    keyboard.onkeyup = (keySym) => {
        guaC.sendKeyEvent(0, keySym)
    }
})
onBeforeUnmount(() => {
    guaC.disconnect()
})
</script>

<style scoped>
.guacomponents {
    z-index: 9;
}
</style>
