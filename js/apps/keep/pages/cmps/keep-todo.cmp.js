export default {
  name: 'keep-todo',
  props: ['info', 'noteStyle', 'noteId'],
  template: `
       <section :style="{backgroundColor:color}">
         <h4>{{info.label}}</h4>
         <label htmlFor="done" v-for="todo in info.todos">
                 <p>{{todo.txt}}</p>
                <input type="checkbox" name="done" id="" />
                <p>done at: {{todo.doneAt}}</p>
              </label>
              <div class="action-container">
                <input @change="addColor" type="color" name="color"
                 v-model="color"/>
                <button @click="remove">remove</button>
                <button @click="duplicate">duplicate</button>
              </div>
                 
        </section>

        `,
  components: {},
  created() {},
  data() {
    return {
      color: this.noteStyle.backgroundColor,
    }
  },
  methods: {
    addColor() {
      this.$emit('change-color', this.color, this.noteId)
      console.log(this.color)
    },
    remove() {
      console.log('remove', this.noteId)
      this.$emit('remove-note', this.noteId)
    },
    duplicate() {
      console.log('dup', this.noteId)
      this.$emit('duplicate-note', this.noteId)
    },
  },
  computed: {},
}
