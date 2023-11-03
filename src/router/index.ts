import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Index",
        meta: {
            title: "Home Page",
            keepAlive: true,
            requireAuth: false,
        },
        component: () => import("@/pages/Index.vue"),
    },
    {
        path: "/bookings",
        name: "Booking",
        meta: {
            title: "Booking Page",
            keepAlive: true,
            requireAuth: false,
        },
        component: () => import("@/pages/Booking.vue"),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export { router }
