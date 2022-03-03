import { mailService } from '../../../services/mail-service.js';
// import mailList from '../cmp/mail-list.cmp.js';

export default {
    name: 'mail-index',
    template: `
    <section class="mail-index app-main">
        <h1>Mail</h1>
        <div class="mail-utils">
            <router-link to="/mail/compose" >Compose Mail</router-link>
        </div>
        <div class="main-area">
            <div class="side-menu">
                <div>
                <div>
                    <router-link to="/mail/allMail" @click="mailType='allMail', showType()">All {{unreadCount}}</router-link>
                </div>
                    <router-link to="/mail/inbox" @click="mailType='inbox', showType()">inbox</router-link>
                </div>
                <div>
                    <router-link to="/mail/sent" @click="mailType='sent', showType() ">Sent</router-link>
                </div>
                <div>
                    <router-link to="/mail/starred" @click="mailType='starred', showType()">Starred</router-link>
                </div>
            </div>
            <div class="main-display">
                    <router-view 
                    :mails="displayMails" 
                    @markRead="markRead" 
                    @addNewMail='addSentMail'
                    @delete="deleteMail"
                    ></router-view>
            </div>
        </div>
    </section>
    `,
    data() {
        return {
            mails: null,
            filterBy: null,
            mailType: 'allMail',
            displayMails: this.mails,
            currMail: null,
            unreadCount: null,
        };
    },
    methods: {
        showType() {
            if (this.mailType === 'allMail') return this.displayMails = this.mails;
            const result = this.mails.filter(mail => mail.label === this.mailType);
            this.displayMails = result;
        },
        markRead(mail) {
            // console.log('accepted at index',mail.id);
            if (mail.isRead) return;
            mail.isRead = true;
            mailService.save(mail)
                .then(this.unreadCount--);
        },
        addSentMail(mailToAdd) {
            mailService.save(mailToAdd)
                .then(mail => this.mails.push(mailToAdd))
                .then(mail => this.formattedDate());
            // .then(eventbus)
            this.$router.push('/mail/allMail');
        },
        deleteMail(mail) {
            console.log('male deleted from service');
            const mailId = mail.id;
            mailService.remove(mail.id)
                .then(() => {
                    const idx = this.mails.findIndex((mail) => mail.id === mailId);
                    this.mails.splice(idx, 1);
                    this.showType();
                    console.log('male deleted from controller');
                    // showSuccessMsg('Deleted succesfully');
                });
        },
        countUnread() {
            this.mails.map(mail => { if (!mail.isRead) this.unreadCount++; });
        },
        formattedDate() {
            this.mails.map(mail => {
                console.log('yay');
                mail.time = new Date(mail.time).toLocaleTimeString();
                console.log(mail.time);
            });
        }
    },
    computed: {
    },
    created() {
        mailService.query()
            .then(mails => this.mails = mails)
            .then(mails => this.displayMails = mails)
            // TODO - move unreadCount to computed:
            .then(mails => this.countUnread())
            .then(mails => this.formattedDate());
    },
    components: {
        // mailList,
    }

};