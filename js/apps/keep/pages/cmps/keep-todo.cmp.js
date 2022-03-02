export default {
  props: ['info'],
  template: `
       <section>
         <h4>{{info.label}}</h4>
            <div>
           
            <ul>
              <li v-for="todo in info.todos" >
                <p>{{todo.txt}}</p>
                <p>done at: {{todo.doneAt}}</p>
              </li>
            </ul>
            
             
             </div>
       </section>

        `,
  components: {},
  created() {},
  data() {
    return {}
  },
  methods: {},
  computed: {},
}
