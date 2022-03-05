import { mailService } from "../../../services/mail-service.js";
import { utilService } from "../../../services/util-service.js";

export default {
    name: 'mail-compose',
    template: `
    <section class="mail-compose">
        <div class="mini-title">New Message</div>
        <form @submit.prevent="send" class="mail-form">
            <div><input class="form-field" type="text" required v-model="mailToAdd.peer" placeholder="To" ref="address"></div>
            <div><input class="form-field" type="text"  v-model="mailToAdd.subject" placeholder="Subject"></div>
            <div><textarea class="form-field" v-model="mailToAdd.body" cols="30" rows="10" style="resize: none;"></textarea></div>
            <button>Send</button>
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
                time: 1551133930594,
                peer: '',
                direc: 'sent',
                starred: false,
                trashed: false,
            }
        };
    },
    methods: {
        send() {
            this.$emit('addNewMail', this.mailToAdd);
        },
    },
    computed: {

    },
    created() {
    },
    mounted() {

    },
    components: {
        mailService,
    }
};