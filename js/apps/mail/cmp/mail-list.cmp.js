import mailPreview from "./mail-preview.cmp.js";

export default {
    name: "mail-list",
    props: ['mails'],
    template: `
    <section class="mail-list">
        <ul>
            <li v-for="mail in mails" :key="mail.id"  class="mail-preview-container">
                    <mail-preview 
                    :mail="mail" 
                    @trash='MoveToTrash' 
                    @markRead="markRead"
                    @permDelete="permDelete"
                    />
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
            this.$emit('markRead', mail)
        },
        MoveToTrash(mail) {
            this.$emit('trash', mail)
        },
        permDelete(mail) {
            this.$emit('permDelete', mail)
        },
    },
    computed: {

    },
    created() {

    },
    components: {
        mailPreview,
    }
};