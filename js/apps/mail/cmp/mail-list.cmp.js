// import mailPreview from "./mail-preview.cmp.js";

// export default {
//     name:'mail-list',
//     props:['mails'],
//     template: `
//     <section class="mail-list">
//         <ul>
//             <li v-for="mail in mails" :key="mail.id" class="mail-preview-container">
//                     <mail-preview :mail='mail' @click="markRead(mail.id)"/>
//             </li>
//         </ul>
        
//     </section>
//     `,
//     data() {
//         return {

//         };
//     },
//     methods: {
//         markRead(id) {
//             console.log(id);
//             // this.$emit('yoyo', id)
//             // this.mail.isRead = true
//             // mailService.save(this.mail)
//             //     .then(mail => console.log(mail))
//         },
//     },
//     computed: {

//     },
//     created() {

//     },
//     components: {
//         mailPreview,
//     }

// };