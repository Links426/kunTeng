const routes = [
    {
        path: '/',
        component: () => import('@/views/index/index.vue'),
        redirect: '/main',
        meta: { label: '主页', isIframe: true },
        children: [
            {
                path: '/main',
                name: '工作台',
                component: () => import('@/views/main/main.vue'),
                meta: {
                    label: '工作台',
                    openKeys: ['0'],
                    selectKeys: ['0_0'],
                    isIframe: false,
                },
            },
            {
                path: '/watch',
                name: '监视',

                component: () => import('@/views/watch/watch.vue'),
                meta: {
                    label: '监视器',
                    openKeys: ['1'],
                    selectKeys: ['1_0'],
                    isIframe: true,
                },
                children: [],
            },
            {
                path: '/control',
                name: '控制',
                component: () => import('@/views/control/control.vue'),
                meta: {
                    label: '案例控制',
                    openKeys: ['2'],
                    selectKeys: ['2_0'],
                    isIframe: false,
                },
            },
            {
                path: '/launch',
                name: '启动',
                component: () => import('@/views/launch/launch.vue'),
                meta: {
                    label: '一键启动',
                    openKeys: ['3'],
                    selectKeys: ['3_0'],
                    isIframe: false,
                },
            },
            {
                path: '/edit',
                name: '编辑',
                component: () => import('@/views/edit/edit.vue'),
                meta: {
                    label: '编辑',
                    openKeys: ['4'],
                    selectKeys: ['4_0'],
                    isIframe: false,
                },
            },
        ],
    },
]
export default routes
