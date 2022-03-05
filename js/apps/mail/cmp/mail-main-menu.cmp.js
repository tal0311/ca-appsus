export default {
    name: "mail-main-menu",
    props:['unread'],
    template: `
    <section class="mail-main-menu">
        <nav class="side-menu">
            <div class="inbox side-menu-item" >
                <div><img src="js/apps/mail/icons/inbox.png" class="icon side-menu-btn"></div>    
                <div @click="showFolderMails('inbox')" class="side-menu-btn word">Inbox ({{unread}})</div>
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
        <button class="btn-menu" onclick="toggleMenu()">☰</button>
    </section>
    `,
    data() {
        return {

        };
    },
    methods: {
        showFolderMails(folder) {
            this.$emit('folderMails', folder);
        }

    },
    computed: {

    },
    created() {

    },
    components: {

    }
};