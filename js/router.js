import susApp from './pages/sus-app.cmp.js'
import keepIndex from './apps/keep/pages/keep-index.js';
import mailIndex from './apps/mail/pages/mail-index.js';
import mailInbox from './apps/mail/cmp/mail-inbox.cmp.js';

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
        children: [
            {
                path: 'inbox',
                component: mailInbox
            },
        ]
    },

]

export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
});

