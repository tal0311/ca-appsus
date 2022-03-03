import { mailService } from '../../../services/mail-service.js';
import mailList from '../cmp/mail-list.cmp.js';

export default {
    name: 'mail-index',
    template: `
    <section class="mail-index app-main">
        <h1>Mail</h1>
        <div class="main-area">
            <div class="side-menu">
                <div>
                    <router-link to="/mail/inbox" @click="mailType='inbox', showType()">inbox ({{unreadCount}})</router-link>
                </div>
                <div>
                    <router-link to="/mail/sent" @click="mailType='sent', showType() ">Sent</router-link>
                </div>
                <div>
                    <router-link to="/mail/allMail" @click="mailType='allMail', showType()">All</router-link>
                </div>
                <div>
                    <router-link to="/mail/starred" @click="mailType='starred', showType()">Starred</router-link>
                </div>
            </div>
            <div class="mail-display">
                <router-view :mails="displayMails"></router-view>
            </div>
        </div>
    </section>
    `,
    data() {
        return {
            mails: null,
            filterBy: null,
            mailType: 'inbox',
            displayMails: this.mails,
            currMail: null,
            unreadCount: null
        };
    },
    methods: {
        showType() {
            if (this.mailType === 'allMail') return this.displayMails = this.mails;
            const result = this.mails.filter(mail => mail.label === this.mailType);
            this.displayMails = result;
        },

    },
    computed: {
        mailsForDisplay() {
            // if (!this.filterBy) return this.mails;
            // const regex = new RegExp(this.filterBy.vendor, 'i');
            // return this.mails.filter(mail => regex.test(mail.vendor));
        },
        countUnread() {
            
        },
    },
    created() {
        mailService.query()
            .then(mails => this.mails = mails)
            .then(mails => this.displayMails = mails)
            // TODO - move unreadCount to computed:
            .then(mails => this.mails.map(mail=> {if (!mail.isRead) this.unreadCount++}))
    },
    components: {
        mailList,
    }

};