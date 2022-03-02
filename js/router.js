
import susApp from './pages/sus-app.cmp.js'


const routes = [
    {
        path: '/',
        component: susApp
    },

]

export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
});

