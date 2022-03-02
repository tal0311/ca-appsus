import { mailService } from '../../../services/mail-service.js';
import mailList from '../cmp/mail-list.cmp.js'

export default {
    name:'mail-index',
    template: `
        <section class="mail-index app-main">
        <h1>Mail</h1>
        <div>
            <router-link to="/mail/inbox" @click="mailType='inbox', showType()">inbox</router-link>
        </div>
        <div>
            <router-link to="/mail/sent" @click="mailType='sent', showType()">Sent</router-link>
        </div>
        <div>
            <router-link to="/mail/starred" @click="mailType='starred', showType()">Starred</router-link>
        </div>
        <hr>
        <router-view :mails="displayMails"></router-view>
    </section>
    `,
    data() {
        return {
            mails: null,
            filterBy: null,
            mailType: 'inbox',
            displayMails: this.mails,
        };
    },
    methods: {
        showType() {
            // console.log(this.mailType);
            const result = this.mails.filter(mail => mail.label === this.mailType)
            this.displayMails = result
            // console.log(this.displayMails);
        },
    },
    computed: {
        mailsForDisplay() {
            if (!this.filterBy) return this.mails;
            const regex = new RegExp(this.filterBy.vendor, 'i');
            return this.mails.filter(mail => regex.test(mail.vendor));
        },

    },
    created() {
        mailService.query()
            .then(mails => this.mails = mails);
    },
    components: {
        mailList,
    }

};