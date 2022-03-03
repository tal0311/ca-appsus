import mailPreview from "./mail-preview.cmp.js";

export default {
    name:'mail-all',
    props:['mails'],
    template: `
    <section class="mail-list">
        <ul>
            <li v-for="mail in mails" :key="mail.id" class="mail-preview-container">
                <mail-preview :mail='mail' @markRead="markRead" @delete="deleteMail"/>
            </li>
        </ul>   
    </section>
    `,
    data() {
        return {

        };
    },
    methods: {
        markRead(mail) {
            // console.log('accepted at list', mail.id);
            this.$emit('markRead', mail)
        },
        deleteMail(mail) {
            this.$emit('delete', mail)
        }

    },
    computed: {

    },
    created() {

    },
    components: {
        mailPreview,
    }

};