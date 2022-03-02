import mailPreview from "./mail-preview.cmp.js";

export default {
    name:'mail-list',
    template: `
    <section class="mail-list">
        <ul>
            <li>
                <mail-preview />
            </li>
        </ul>
        
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
        mailPreview,
    }

};