export default {
  name: 'keep-todo',
  props: ['info'],
  template: `
       <section>
         <h4>{{info.label}}</h4>
         <label htmlFor="done" v-for="todo in info.todos">
                 <p>{{todo.txt}}</p>
                <input type="checkbox" name="done" id="" />
                <p>done at: {{todo.doneAt}}</p>
              </label>
            
                 
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
