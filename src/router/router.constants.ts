import type { Component } from 'vue';
import type { RouteRecordRaw } from 'vue-router';

export const routes = [
    {
        path: '/',
        name: 'home',
        meta: {
            title: 'Home'
        },
        // route level code-splitting
        // this generates a separate chunk (Home.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: (): Promise<Component> => import('@/components/Home/VueHome.vue')
    }
] as const satisfies readonly RouteRecordRaw[];
