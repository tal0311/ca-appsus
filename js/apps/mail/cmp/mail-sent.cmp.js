import mailPreview from "./mail-preview.cmp.js";

export default {
    name:'mail-sent',
    props:['mails'],
    template: `
    <section class="mail-list">
        <ul>
            <li v-for="mail in mails" :key="mail.id" class="mail-preview-container">
                <mail-preview :mail='mail'/>
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