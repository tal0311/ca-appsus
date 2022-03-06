import { mailService } from "../../../services/mail-service.js";

export default {
    name: "mail-details",
    template: `
        <section v-if="mail" class="mail-details">
            <menu class="mail-details-menu">
                <router-link to="/mail">
                    <img src="js/apps/mail/icons/close.png">
                </router-link>
                <!-- <img src="js/apps/mail/icons/trash.png">
                <img src="js/apps/mail/icons/all-mail.png"> -->
            </menu>
            <div class="title">{{mail.subject}}</div>
            <br>
            <div class="sender">{{mail.peer}}</div>
            <br>
            <div class="body">{{mail.body}}</div>

        </section>
    `,
    data() {
        return {
            mail: null,
            mailId: null,
        };
    },
    methods: {


    },
    computed: {

    },
    created() {
        const id = this.$route.params.mailId;
        this.mailId = id
        mailService.get(id)
            .then(mail => this.mail = mail);
    },
    components: {
        mailService,
    }
};