import susApp from './pages/sus-app.cmp.js'
import keepIndex from './apps/keep/pages/keep-index.js';
import mailIndex from './apps/mail/pages/mail-index.js';
import mailInbox from './apps/mail/cmp/mail-inbox.cmp.js';
import mailSent from './apps/mail/cmp/mail-sent.cmp.js';
import mailStarred from './apps/mail/cmp/mail-starred.cmp.js';
import mailAll from './apps/mail/cmp/mail-all.cmp.js';
import mailCompose from './apps/mail/cmp/mail-compose.cmp.js';

const routes = [
    {
        path: '/',
        component: susApp,
        children: [
            {
                path: 'keep',
                component: keepIndex,
            },
            {
                path: 'mail',
                component: mailIndex,
                children: [
                    {
                        path: 'allMail',
                        component: mailAll
                    },
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
                        path: 'compose',
                        component: mailCompose
                    },
        
                ]
            },

        ]
    },


]

export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
});

