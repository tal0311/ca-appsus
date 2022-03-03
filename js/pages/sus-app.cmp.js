export default {
    template: `
    <section class="sus-app app-main">
        <header>
            <span class="logo">AppSus</span>
            <div class="app-nav">
                <router-link to="/keep">Keep</router-link> |
                <router-link to="/mail/allMail">Mail</router-link>
            </div>
        </header>
        <router-view class="main-router-view"/>
        <footer>
            footer
        </footer>
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