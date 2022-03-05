import { mailService } from '../../../services/mail-service.js';
import { showErrorMsg, showSuccessMsg } from '../../../services/eventBus-service.js';
import mailList from '../cmp/mail-list.cmp.js';
import mailCompose from '../cmp/mail-compose.cmp.js';
import mailPreview from '../cmp/mail-preview.cmp.js';
import mailMainMenu from '../cmp/mail-main-menu.cmp.js';
import mailHamb from '../cmp/mail-hamb.cmp.js';
import mailFilter from '../cmp/mail-filter.cmp.js';

export default {
    name: 'mail-app',
    template: `
    <section class="mail-app app-main">
        <div class="mail-utils">
            <div class="hamb-menu hamb-btn" @click="hambOpen = !hambOpen">☰</div>
            <mail-filter @filtered="setFilterBy"/>
        </div>
        <div class="main-area">
            <mail-hamb
                v-if="hambOpen"
                @folderMails='showFolderMails' 
                @composing="composing=true" 
                :unread='unreadCount'>
            </mail-hamb>
            <mail-main-menu 
                @folderMails='showFolderMails' 
                @composing="composing=true" 
                :unread='unreadCount'>
            </mail-main-menu>
            <div class="mails-area">
                <!-- mails list  -->
                <mail-list
                    v-if:="!composing"
                    :mails="renderedMails"
                    @trash='MoveToTrash'
                    @markRead="markRead"
                    @permDelete="permDelete"
                    >
                </mail-list>
                <!-- no mails msg -->
                <div v-if="!areRenderedMails" class="no-mails-msg">
                    There are no nore Emails in this box.
                </div>
                <!-- mail compose -->
                <mail-compose 
                    v-if:="composing" 
                    @addNewMail="addSentMail"
                    @closeCompose="composing = flase"
                />
            </div>
        </div>
    </section>
    `,
    data() {
        return {
            mails: null,
            renderedMails: this.mails,
            filterValue: null,
            unreadCount: null,
            composing: false,
            hambOpen: false,
        };
    },
    methods: {
        countUnread() {
            this.unreadCount = 0;
            this.mails.map(mail => {
                if (!mail.isRead) this.unreadCount++;
            });
        },
        showFolderMails(folder) {
            this.hambOpen = false;
            this.composing = false;
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
                .then(this.showFolderMails('inbox'));
            // .then(eventbus)
        },
        setFilterBy(filterBy) {
            this.filterValue = filterBy;
            this.filterMails();
        },
        filterMails() {
            if (!this.filterValue) return this.showFolderMails('inbox');
            this.mergeMail()
            console.log(this.filterValue);
            const regex = new RegExp(this.filterValue, 'i');
            this.renderedMails = this.mails.filter((mail) => regex.test(mail.merged));
        },
        mergeMail() {
            this.mails.map(mail => {
                console.log(mail.subject);
                const word = '' + mail.peer + mail.subject + mail.body;
                mail.merged = word
            });
            
        }
    },
    computed: {
        areRenderedMails() {
            if (!this.renderedMails) return;
            if (this.renderedMails.length) return true;
        },
    },
    created() {
        mailService.query()
            .then(mails => {
                this.mails = mails;
                this.renderedMails = mails;
            })
            .then(mails => this.countUnread())
            .then(mails => this.showFolderMails('inbox'));
    },
    components: {
        mailList,
        mailCompose,
        mailPreview,
        mailMainMenu,
        mailHamb,
        mailFilter,
    }

};