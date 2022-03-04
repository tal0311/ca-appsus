import mailDetails from "./mail-details.cmp.js";

export default {
    name: "mail-preview",
    props: ['mail'],
    template: `
    <section class="mail-preview">
        <div class="main-preview">
            
            <div class="peer-subject" >
                <router-link :to="/mail/+mail.id" @click="markRead" :class="readClass">
                    <div>{{mail.direc}}</div>
                    <div>{{mail.id}}</div>
                    <div>{{mail.peer}}</div>
                    <div>subject: {{mail.subject}}</div>    
                    <div>trashed: {{mail.trashed}}</div>    
                </router-link>
            </div>
            <div class="date-delete">
                <div>{{formattedTime}}</div>    
                <img 
                    src="js/apps/mail/icons/trash.png"
                    v-if="!mail.trashed"
                    @click="MoveToTrash"
                    
                >
                <img 
                    src="js/apps/mail/icons/delete empty.png"
                    v-if="mail.trashed"
                    @click="permDelete"
                    
                >
            </div>
        </div>
        <hr class="preview-hr">
    </section>
    `,
    data() {
        return {
            formattedTime: new Date(this.mail.time).toLocaleTimeString(),
        };
    },
    methods: {
        markRead() {
            this.$emit('markRead', this.mail)
        },
        MoveToTrash() {
            this.$emit('trash', this.mail);
        },
        permDelete() {
            const deleteMail = confirm('Perminantly delete this mail?');
            if (deleteMail) this.$emit('permDelete', this.mail)
        }
    },
    computed: {
        readClass() {
            return !this.mail.isRead ? 'notRead' : "";
        },
    },
    created() {

    },
    components: {
        mailDetails,
    }
};