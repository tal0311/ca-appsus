export default {
  name: 'mail-app',
  template: `
    <section class="sus-app app-main">
        <header>
            <span class="logo">AppSus</span>
            <div class="app-nav">
                <router-link to="/keep">Keep</router-link> |
                <router-link to="/mail">Mail</router-link>
            </div>
        </header>
        <router-view class="main-router-view"/>
        
    </section>
    `,
    data() {
        return {

        };
    },
    methods: {


    },
    computed: {

    },
    created() {

    },
    components: {

    }
};
