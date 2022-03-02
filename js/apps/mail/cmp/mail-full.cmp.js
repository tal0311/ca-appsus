export default {
props:['mail'],
template:`
<section class="mail-full">
    <div class="full-mail-body">    
        <div>{{mail.body}}</div>        
        <div>{{mail.id}}</div>        
        <div>{{mail.label}}</div>           
    </div>     
    <hr>
</section>
`,

};