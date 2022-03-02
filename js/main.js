import { router } from './router.js'

const options = {
  template: `

  <!-- app header -->
  
<!-- router view -->
<router-view />
<!-- app footer -->
   `,
  components: {},

  data() {
    return {
      title: 'vue main component',
    }
  },
  methods: {},
  computed: {},
  updated: {},
  unmounted: {},
}

const app = Vue.createApp(options)
app.use(router)
app.mount('#app')
