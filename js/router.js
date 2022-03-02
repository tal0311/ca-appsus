import susApp from './pages/sus-app.cmp.js'
import keepIndex from './apps/keep/pages/keep-index.js';
import mailIndex from './apps/mail/pages/mail-index.js';
import mailInbox from './apps/mail/cmp/mail-inbox.cmp.js';
import mailSent from './apps/mail/cmp/mail-sent.cmp.js';
import mailStarred from './apps/mail/cmp/mail-starred.cmp.js';
import mailAll from './apps/mail/cmp/mail-all.cmp.js';

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
            {
                path: 'sent',
                component: mailSent
            },
            {
                path: 'starred',
                component: mailStarred
            },
            {
                path: 'allMail',
                component: mailAll
            },

        ]
    },

]

export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
});

