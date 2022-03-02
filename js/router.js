import susApp from './pages/sus-app.cmp.js'
import keepIndex from './apps/keep/pages/keep-index.js';
import mailIndex from './apps/mail/pages/mail-index.js';


const routes = [
    {
        path: '/',
        component: susApp,
    },
    {
        path: '/keep',
        component: keepIndex,
    },
    {
        path: '/mail',
        component: mailIndex,
    },

]

export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
});

