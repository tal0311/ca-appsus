import { mailService } from '../../../services/mail-service.js';
import { showErrorMsg, showSuccessMsg } from '../../../services/eventBus-service.js';
import mailList from '../cmp/mail-list.cmp.js';
import mailCompose from '../cmp/mail-compose.cmp.js';
import mailPreview from '../cmp/mail-preview.cmp.js';

export default {
    name: 'mail-app',
    template: `
    <section class="mail-app app-main">
        <div class="mail-utils">
            <div class="compose" @click="composing = true">
                <img src="js/apps/mail/icons/plus.png" class="plus-sign">
                <span>
                    COMPOSE
                </span> 
            </div>
        </div>
        <div class="main-area">
            <nav class="side-menu">
                <div class="inbox side-menu-item" >
                    <div><img src="js/apps/mail/icons/inbox.png" class="icon side-menu-btn"></div>    
                    <div @click="showFolderMails('inbox')" class="side-menu-btn word">Inbox ({{unreadCount}})</div>
                </div>
                <div class="all-mail side-menu-item">
                    <div><img src="js/apps/mail/icons/all-mail.png" class="icon side-menu-btn"></div>    
                    <div @click="showFolderMails('all')" class="side-menu-btn word">All</div>
                </div>
                <div class="sent side-menu-item">
                    <div><img src="js/apps/mail/icons/sent.png" class="icon side-menu-btn"></div>    
                    <div @click="showFolderMails('sent')" class="side-menu-btn word">Sent</div>
                </div>
                <div class="trash side-menu-item">
                    <div><img src="js/apps/mail/icons/trash.png" class="icon side-menu-btn"></div>    
                    <div @click="showFolderMails('trash')" class="side-menu-btn word">Trash</div>
                </div>
            </nav>
            <div v-if="areRenderedMails">yay</div>
            <div class="mails-area">
                <mail-list
                    v-if:="!composing"
                    :mails="renderedMails"
                    @trash='MoveToTrash'
                    @markRead="markRead"
                    @permDelete="permDelete"
                    >
                </mail-list>
                <mail-compose v-if:="composing" @addNewMail="addSentMail"/>
            </div>


        </div>
    </section>
    `,
    data() {
        return {
            mails: null,
            renderedMails: this.mails,
            filterBy: null,
            unreadCount: null,
            composing: false,
        };
    },
    methods: {
        countUnread() {
            this.unreadCount = 0
            this.mails.map(mail => {
                if (!mail.isRead) this.unreadCount++;
            });
        },
        showFolderMails(folder) {
            this.composing = false
            if (folder === 'inbox' || folder === 'sent') {
                this.renderedMails = this.mails.filter(mail =>
                    !mail.trashed && mail.direc === `${folder}`);
            }
            else if (folder === 'trash') {
                this.renderedMails = this.mails.filter(mail => mail.trashed);
            }
            else this.renderedMails = this.mails;
        },
        markRead(mail) {
            // console.log('app mark red', mail);
            if (mail.isRead) return;
            mail.isRead = true;
            mailService.save(mail)
                .then(this.countUnread());
        },
        MoveToTrash(mail) {
            // console.log('trash app', mail);
            mail.trashed = true;
            mailService.save(mail)
                .then(this.countUnread());
        },
        permDelete(mail) {
            const mailId = mail.id;
            mailService.remove(mail.id)
                .then(() => {
                    const idx = this.mails.findIndex((mail) => mail.id === mailId);
                    this.mails.splice(idx, 1);
                    this.showFolderMails('inbox');
                })
                .then(this.countUnread());
        },
        addSentMail(mailToAdd) {
            mailService.save(mailToAdd)
                .then(mail => this.mails.push(mailToAdd))
                .then(this.showFolderMails('all'))
            // .then(eventbus)
        },

    },
    computed: {
        mailToShow() {
            if (!this.filterBy) return this.mails;
            // const regex = new RegExp(this.filterBy.title, 'i');
            // return this.mails.filter(mail => regex.test(mail.title));
        },   
        areRenderedMails() {
            // if (this.renderedMails.length) return true
        }
    },
    created() {
        mailService.query()
            .then(mails => {
                this.mails = mails;
                this.renderedMails = mails;
            })
            .then(mails => this.countUnread())
            .then(mails => this.showFolderMails('inbox'))
            

    },
    components: {
        mailList,
        mailCompose,
        mailPreview,
    }

};