<template>
    <a-layout style="height: 100vh">
        <a-layout-header
            h-60px
            flex
            items-center
            px-24px
            justify-between
            class="header-shadow"
            ><div flex-center>
                <img src="@/assets/img/answer.png" w-20px h-28px mr-12px />
                <span>广州大学 系统流变所控制系统</span>
            </div>
            <div>
                <a-button @click="changeColor">换色黑</a-button>
                <a-button @click="changeColor1">换色亮</a-button>
            </div>
        </a-layout-header>
        <a-layout>
            <a-layout-sider
                breakpoint="lg"
                :width="220"
                collapsible
                :collapsed="collapsed"
                @collapse="onCollapse"
            >
                <div />
                <a-menu
                    :defaultOpenKeys="router.currentRoute.value.meta.openKeys"
                    :defaultSelectedKeys="
                        router.currentRoute.value.meta.selectKeys
                    "
                    @menu-item-click="To"
                >
                    <a-sub-menu key="0">
                        <template #icon><icon-apps></icon-apps></template>
                        <template #title>仪表台</template>
                        <a-menu-item key="0_0">工作台</a-menu-item>
                    </a-sub-menu>
                    <a-sub-menu key="1">
                        <template #icon><icon-apps></icon-apps></template>
                        <template #title>监测</template>
                        <a-menu-item key="1_0">监视节点状态</a-menu-item>
                        <a-menu-item key="1_1">监视节点设置</a-menu-item>
                    </a-sub-menu>
                    <a-sub-menu key="2">
                        <template #icon><icon-apps></icon-apps></template>
                        <template #title>案例</template>
                        <a-menu-item key="2_0">案例添加</a-menu-item>
                    </a-sub-menu>
                    <a-sub-menu key="3">
                        <template #icon><icon-apps></icon-apps></template>
                        <template #title>一键启动台</template>
                        <a-menu-item key="3_0">启动台</a-menu-item>
                    </a-sub-menu>
                    <a-sub-menu key="4">
                        <template #icon><icon-apps></icon-apps></template>
                        <template #title>编辑</template>
                        <a-menu-item key="4_0">代码编辑</a-menu-item>
                    </a-sub-menu>
                    <a-sub-menu key="5">
                        <template #icon><icon-apps></icon-apps></template>
                        <template #title>自定义启动</template>
                        <a-menu-item key="5_0">启动控制</a-menu-item>
                    </a-sub-menu>
                    <a-sub-menu key="6">
                        <template #icon><icon-apps></icon-apps></template>
                        <template #title>自定义监控</template>
                        <a-menu-item key="6_0">监控设置</a-menu-item>
                    </a-sub-menu>
                </a-menu>
            </a-layout-sider>
            <a-layout-content class="w-full p-20px content-bg">
                <a-breadcrumb :routes="routesList" mb-16px>
                    <template #item-render="{ route, paths }">
                        <a-link @click="toBrumbPage(paths)">{{
                            route.meta.label
                        }}</a-link>
                    </template>
                </a-breadcrumb>
                <router-view v-slot="{ Component }">
                    <transition name="fade" mode="out-in">
                        <keep-alive>
                            <component :is="Component" />
                        </keep-alive>
                    </transition>
                </router-view>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script setup lang="ts">
const router = useRouter()

const collapsed = ref(false)

const routesList: any = ref([])
const onCollapse = (val: boolean) => {
    collapsed.value = val
}

const To = (key: string) => {
    if (key === '0_0') {
        router.push('/main')
    } else if (key === '1_0') {
        router.push('/watch')
    } else if (key === '1_1') {
        router.push('/set')
    } else if (key === '2_0') {
        router.push('/control')
    } else if (key === '3_0') {
        router.push('/launch')
    } else if (key === '4_0') {
        router.push('/edit')
    } else if (key === '5_0') {
        router.push('/diyLanch')
    } else if (key === '6_0') {
        router.push('/setRemote')
    }
}

const useKeys = ['path', 'meta']
onBeforeRouteUpdate((to: any) => {
    const newArr: any = []
    to.matched.forEach(
        (item: { [s: string]: unknown } | ArrayLike<unknown>) => {
            const list = Object.entries(item).filter(([key]) =>
                useKeys.includes(key)
            )
            const newItem = Object.fromEntries(list)
            newArr.push(newItem)
        }
    )
    routesList.value = newArr
})

const toBrumbPage = (paths: string | any[]) => {
    router.push('/' + paths[paths.length - 1])
}

onMounted(async () => {
    const newArr: any = []
    router.currentRoute.value.matched.forEach((item) => {
        const list = Object.entries(item).filter(([key]) =>
            useKeys.includes(key)
        )
        const newItem = Object.fromEntries(list)
        newArr.push(newItem)
    })
    routesList.value = newArr
})

const changeColor = () => {
    document.body.setAttribute('arco-theme', 'dark')
}
const changeColor1 = () => {
    document.body.setAttribute('arco-theme', 'light')
}
</script>

<style scoped>
.header-shadow {
    z-index: 15;
    background-color: var(--color-bg-2);
    color: var(--color-neutral-10);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.content-bg {
    background-color: var(--color-neutral-1);
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
