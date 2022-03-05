import { router } from './router.js'

const options = {
  template: `
    <section class="main-body">
        <router-view />
    </section>
    `,
  components: {},
}

const app = Vue.createApp(options)
app.use(router)
app.mount('#app')
