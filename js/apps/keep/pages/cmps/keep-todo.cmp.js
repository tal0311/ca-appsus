export default {
  name: 'keep-todo',
  props: ['note'],
  template: `

  
       <section :style="{backgroundColor:color}" v-bind="$attrs">
         <label htmlFor="pin">
                &#9733;
                <input type="checkbox" @click="togglePin" v-model="pinned" :checked="note.isPinned" id="pin"/>
              </label>
          <!-- <input type="checkbox" @click="unPin"  :checked="note.isPinned" /> -->
         <h4>{{note.info.label}}</h4>

         <label htmlFor="done" v-for="todo in note.info.todos">
                 <p>{{todo.txt}}</p>
                <input type="checkbox" name="done" id=""  @click="atDone"/>
                <p>done at: {{todo.doneAt}}</p>
              </label>
              <div class="action-container">
                <input @change="addColor" type="color" name="color"
                 v-model="color"/>
                 <i class="fa-solid fa-circle-trash"></i>
                
                <button class="fa-solid fa-x"
                 @click="remove"></button>
                <button class="fa-solid fa-clone"
                @click="duplicate"></button>
              </div>
                 
        </section>

        `,
  components: {},
  created() {},
  data() {
    return {
      color: this.note.style.backgroundColor,
      pinned: this.note.isPinned,
    }
  },
  methods: {
    atDone() {
      console.log('done')
    },
    togglePin() {
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
