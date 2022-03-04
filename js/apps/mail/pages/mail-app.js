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
            <div class="compose">COMPOSE+</div>
        </div>
        <div class="main-area">
            <nav class="side-menu">
                <div class="all-mail side-menu-item">
                    <div><img src="js/apps/mail/icons/all-mail.png" class="icon side-menu-btn"></div>    
                    <div @click="showFolderMails('all')" class="side-menu-btn word">All</div>
                </div>
                <div class="inbox side-menu-item" >
                    <div><img src="js/apps/mail/icons/inbox.png" class="icon side-menu-btn"></div>    
                    <div @click="showFolderMails('inbox')" class="side-menu-btn word">Inbox</div>
                </div>
                <div class="sent side-menu-item">
                    <div><img src="js/apps/mail/icons/sent.png" class="icon side-menu-btn"></div>    
                    <div @click="showFolderMails('sent')" class="side-menu-btn word">Sent</div>
                </div>
                <div class="trash side-menu-item">
                    <div><img src="js/apps/mail/icons/trash.png" class="icon side-menu-btn"></div>    
                    <div @click="showFolderMails('trash')" class="side-menu-btn word">Trash</div>
                </div>
                
                <!-- <div class="side-menu-icons">                    
                </div>
                <div class="side-menu-word">
                </div> -->
            </nav>
            <div class="mails-area">
                <mail-list 
                :mails="renderedMails"
                @trash='MoveToTrash'
                @markRead="markRead"
                @permDelete="permDelete"
                />
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
            unreadCount: null,
        };
    },
    methods: {
        showFolderMails(folder) {
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
                .then(this.unreadCount--);
        },
        MoveToTrash(mail) {
            // console.log('trash app', mail);
            mail.trashed = true;
            mailService.save(mail)
                .then(mail => console.log('mail trashed'));
        },
        permDelete(mail) {
            const mailId = mail.id;
            mailService.remove(mail.id)
                .then(() => {
                    const idx = this.mails.findIndex((mail) => mail.id === mailId);
                    this.mails.splice(idx, 1);
                });
        },

    },
    computed: {
        mailToShow() {
            if (!this.filterBy) return this.mails;
            // const regex = new RegExp(this.filterBy.title, 'i');
            // return this.mails.filter(mail => regex.test(mail.title));
        },
        // formatDate(mail) {
        //     mail.time = new Date(mail.time).toLocaleTimeString();
        // }
    },
    created() {
        mailService.query()
            .then(mails => {
                this.mails = mails;
                // this.mails.foreach(mail => this.formatDate(mail));
                this.renderedMails = mails;
            });

    },
    components: {
        mailList,
        mailCompose,
        mailPreview,
    }

};