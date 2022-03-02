import appHome from '../views/appHome.js'
import appAbout from '../views/appAbout.js'
import booksApp from '../views/booksApp.js'
import bookDetails from '../views/bookDetails.js'

const routes = [
  {
    path: '/',
    component: appHome,
  },
  {
    path: '/about',
    component: appAbout,
  },
  {
    path: '/book',
    component: booksApp,
  },
  {
    path: '/book/:bookId',
    component: bookDetails,
  },
]

export const router = VueRouter.createRouter({
  routes,
  history: VueRouter.createWebHashHistory(),
})
