import susApp from './pages/sus-app.cmp.js'
import keepIndex from './apps/keep/pages/keep-index.js';
import mailApp from './apps/mail/pages/mail-app.js';
import mailDetails from './apps/mail/cmp/mail-details.cmp.js';


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
                component: mailApp,
                children:[
                    
                ]                
            },
            {
                path: 'mail/:mailId',
                component: mailDetails,                
            },
            
        ]
    },


]

export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
});

