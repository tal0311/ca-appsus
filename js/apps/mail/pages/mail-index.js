import { mailService } from '../../../services/mail-service.js';
import mailList from '../cmp/mail-list.cmp.js'

export default {
    name:'mail-index',
    template: `
    <section class="mail-index app-main">
    <h1>mail-index</h1>
        <mail-list :mails="mailsForDisplay" />
        <router-link to="/mail/inbox">inbox</router-link>
        <router-view></router-view>
    </section>
    `,
    data() {
        return {
            mails: null,
            filterBy: null
        };
    },
    methods: {


    },
    computed: {
        mailsForDisplay() {
            if (!this.filterBy) return this.mails;
            const regex = new RegExp(this.filterBy.vendor, 'i');
            return this.mails.filter(mail => regex.test(mail.vendor));
        }
    },
    created() {
        mailService.query()
            .then(mails => this.mails = mails);
    },
    components: {
        mailList,
    }

};