import { mailService } from "../../../services/mail-service.js";
import mailFull from "./mail-full.cmp.js";

export default {
    name:'mail-preview',
    props:['mail'],
    template: `
    <section class="mail-preview" @click="mailClicked" :class="readClass">
        <div class="main-preview">
            <div class="peer-subject" >
                <div>{{mail.peer}}</div>
                <div>subject: {{mail.subject}}</div>    
            </div>
            <div class="date-delete-btn">
                <div>{{mail.time}}</div>    
                <button @click="deleteMail">Delete</button>
            </div>
        </div>
        <hr v-show="!fullMail" class="preview-hr">
        <mail-full v-if="fullMail" :mail="mail"/>
    </section>
    `,
    data() {
        return {
            fullMail: false,
        };
    },
    methods: {
        mailClicked() {
            this.fullMail = !this.fullMail
            this.markRead()
        },
        markRead() {
            // this.mail.isRead = true
            this.$emit('markRead', this.mail)
        },
        deleteMail() {
            this.$emit('delete', this.mail)
        }

    },
    computed: {
        readClass() {
            return !this.mail.isRead ? 'notRead' : ""
        },

    },
    created() {

    },
    components: {
        mailFull,
    }

};