export default {
    name: "mail-hamb",
    props:['unread'],
    template: `
    <section class="mail-hamb">
        <!-- hamburger -->
            <nav class="hamburger">
            <div @click="composing" class="compose">
                <img src="js/apps/mail/icons/plus.png" class="plus-sign">
                <span>
                    COMPOSE
                </span> 
            </div>
            <div class="inbox hamburger-item" >
                <div><img src="js/apps/mail/icons/inbox.png" class="icon hamburger-btn"></div>    
                <div @click="showFolderMails('inbox')" class="hamburger-btn word">Inbox ({{unread}})</div>
            </div>
            <div class="all-mail hamburger-item">
                <div><img src="js/apps/mail/icons/all-mail.png" class="icon hamburger-btn"></div>    
                <div @click="showFolderMails('all')" class="hamburger-btn word">All</div>
            </div>
            <div class="sent hamburger-item">
                <div><img src="js/apps/mail/icons/sent.png" class="icon hamburger-btn"></div>    
                <div @click="showFolderMails('sent')" class="hamburger-btn word">Sent</div>
            </div>
            <div class="trash hamburger-item">
                <div><img src="js/apps/mail/icons/trash.png" class="icon hamburger-btn"></div>    
                <div @click="showFolderMails('trash')" class="hamburger-btn word">Trash</div>
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