import { mailService } from "../../../services/mail-service.js";

export default {
    name: "mail-details",
    template: `
        <section v-if="mail" class="mail-details">
            <router-link to="/mail"><button>go back</button></router-link>
            <button>delete</button>
            <button>mark unread</button>
            <div class="title">{{mail.subject}}</div>
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