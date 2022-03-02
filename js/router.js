import appMainCmp from './pages/app-main.cmp.js'

const routes = [
  {
    path: '/',
    component: appMainCmp,
  },
]

export const router = VueRouter.createRouter({
  routes,
  history: VueRouter.createWebHashHistory(),
})
