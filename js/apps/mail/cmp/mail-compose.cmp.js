import { mailService } from "../../../services/mail-service.js";

export default {
    name: 'mail-compose',
    template: `
    <section class="mail-compose">
        <h3>New Message</h3>
        <form @submit.prevent="send">
            <input type="text" required v-model="mailToAdd.peer" placeholder="To" ref="address">
            <input type="text"  v-model="mailToAdd.subject" placeholder="Subject">
            <textarea v-model="mailToAdd.body" cols="30" rows="10" style="resize: none;"></textarea>
            <br>
            <button >Send</button>
        </form>
    </section>
    `,
    data() {
        return {
            mailToAdd: {
                id: null,
                subject: '',
                body: '',
                isRead: true,
                time: Date.now(),
                peer: null,
                label: 'sent',
            }
        };
    },
    methods: {
        send(){
            this.$emit('addNewMail', this.mailToAdd)
        },
    },
    computed: {

    },
    created() {
    },
    mounted(){

    },
    components: {
        mailService,
    }
};