export default {
  name: 'keep-todo',
  props: ['note'],
  template: `

  
       <section :style="{backgroundColor:color}" v-bind="$attrs">
         <h4>{{note.info.label}}</h4>
         <label htmlFor="done" v-for="todo in note.info.todos">
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
      color: this.note.style.backgroundColor,
    }
  },
  methods: {
    unPin() {
      console.log(this.note.id)
      this.$emit('pin', this.note.id)
    },
    addColor() {
      this.$emit('change-color', this.color, this.note.id)
      console.log(this.color)
    },
    remove() {
      console.log('remove', this.note.id)
      this.$emit('remove-note', this.note.id)
    },
    duplicate() {
      console.log('dup', this.note.id)
      this.$emit('duplicate-note', this.note.id)
    },
  },
  computed: {},
}
