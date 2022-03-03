import { mailService } from "../../../services/mail-service.js";
import mailFull from "./mail-full.cmp.js";

export default {
    name:'mail-preview',
    props:['mail'],
    template: `
    <section class="mail-preview" >
        <div class="preview-body" @click="fullMailDisp(), markRead()" :class="readClass">
            <div>subject: {{mail.subject}}</div>    
            <div>{{mail.time}}</div>    
            <div>{{mail.peer}}</div>
        </div>    
        <hr v-show="!fullMail">
        <mail-full v-if="fullMail" :mail="mail"/>
    </section>
    `,
    data() {
        return {
            fullMail: false,
        };
    },
    methods: {
        fullMailDisp() {
            this.fullMail = !this.fullMail
        },
        markRead() {
            this.mail.isRead = true
            mailService.save(this.mail)
                .then(mail => console.log(mail))
        },

    },
    computed: {
        readClass() {
            return !this.mail.isRead ? 'notRead' : ""
        }
    },
    created() {

    },
    components: {
        mailFull,
    }

};