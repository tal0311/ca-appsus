export default {
    name: "mail-main-menu",
    props:['unread'],
    template: `
    <section class="mail-main-menu">
        <!-- full screen -->
        <nav class="side-menu">
            <div @click="composing" class="compose">
                <img src="js/apps/mail/icons/plus.png" class="plus-sign">
                <span>
                    COMPOSE
                </span> 
            </div>
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
    </section>
    
    `,
    data() {
        return {
            openHamb: false,

        };
    },
    methods: {
        showFolderMails(folder) {
            this.$emit('folderMails', folder);
        },
        composing() {
            this.$emit('composing')
        }

    },
    computed: {

    },
    created() {

    },
    components: {

    }
};