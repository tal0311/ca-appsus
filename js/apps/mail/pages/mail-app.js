import { mailService } from '../../../services/mail-service.js';
import { showErrorMsg, showSuccessMsg } from '../../../services/eventBus-service.js';
import mailList from '../cmp/mail-list.cmp.js';
import mailCompose from '../cmp/mail-compose.cmp.js';

export default {
    name: 'mail-app',
    template: `
    <section class="mail-app app-main">
        <div class="mail-utils">
            <div class="compose">COMPOSE+</div>
        </div>
        <div class="main-area">
            <nav class="side-menu">
                <button @click="showFolderMails('all')" class="side-menu-item">all</button>
                <button @click="showFolderMails('inbox')" class="side-menu-item">inbox</button>
                <button @click="showFolderMails('sent')" class="side-menu-item">sent</button>
            </nav>
            <div class="mails-area">
                <mail-list :mails="renderedMails"/>
            </div>
        </div>
    </section>
    `,
    data() {
        return {
            mails: null,
            renderedMails: this.mails,
            selectedBook: null,
            filterBy: null,
        };
    },
    methods: {
        showFolderMails(folder) {
            if (folder === 'inbox' || folder === 'sent') {
                this.renderedMails = this.mails.filter(mail => mail.direc === `${folder}`);
            }
            else this.renderedMails = this.mails
        }

    },
    computed: {
        mailToShow() {
            if (!this.filterBy) return this.mails;
            // const regex = new RegExp(this.filterBy.title, 'i');
            // return this.mails.filter(mail => regex.test(mail.title));
        },
        formatDate(mail) {
            mail.time = new Date(mail.time).toLocaleTimeString()
        }
    },
    created() {
        mailService.query()
            .then(mails => {
                this.mails = mails
                this.renderedMails = mails
            })
            
    },
    components: {
        mailList,
        mailCompose,
    }

};