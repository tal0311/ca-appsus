import mailPreview from "./mail-preview.cmp.js";

export default {
    name:'mail-list',
    props:['mails'],
    template: `
    <section class="mail-list">
        <ul>
            <li v-for="mail in mails" :key="mail.id" class="mail-preview-container">
                <router-link :to="+mail.id">
                    <mail-preview :mail='mail'/>
                </router-link>
            </li>
        </ul>
        
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
        mailPreview,
    }

};