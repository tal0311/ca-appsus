import mailList from '../cmp/mail-list.cmp.js'

export default {
    name:'mail-index',
    template: `
    <section class="mail-index app-main">
    <h1>mail-index</h1>
        <mail-list />
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
        mailList,
    }

};