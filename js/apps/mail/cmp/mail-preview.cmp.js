import mailDetails from "./mail-details.cmp.js";

export default {
    name: "mail-preview",
    props:['mail'],
    template: `
    <section class="mail-preview">
        <div class="main-preview">
            <div class="peer-subject" >
                <div>{{mail.direc}}</div>
                <div>{{mail.id}}</div>
                <div>{{mail.peer}}</div>
                <div>subject: {{mail.subject}}</div>    
            </div>
            <div class="date-delete-btn">
                <div>{{mail.time}}</div>    
                <button @click="MoveToTrash">Trash</button>
            </div>
        </div>
        <hr class="preview-hr">
    </section>
    `,
    data() {
        return {

        };
    },
    methods: {
        MoveToTrash() {
            console.log('trash');
        }

    },
    computed: {

    },
    created() {

    },
    components: {
        mailDetails,
    }
};