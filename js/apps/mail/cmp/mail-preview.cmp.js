export default {
    name:'mail-preview',
    props:['mail'],
    template: `
    <section class="mail-preview">
        <div>subject: {{mail.subject}}</div>        
        <div>{{mail.body}}</div>        
        <div>{{mail.id}}</div>        
        <div>{{mail.label}}</div>        
        <hr>
    </section>
    `,
    data() {
        return {

        };
    },
    methods: {


    },
    computed: {

    },
    created() {

    },
    components: {

    }

};