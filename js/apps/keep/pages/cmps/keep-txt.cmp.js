export default {
  name: 'txt-cmp',
  props: ['note'],
  emits: [
    'remove-note',
    'duplicate-note',
    'change-color',
    'un-pin',
    'selected',
    'save-edits',
    'close-modal',
  ],

  template: `
  
       
          <section
              :style="{backgroundColor:color}"
                v-bind="$attrs"
                @click="select">

              <label htmlFor="pin">
                &#9733;
                <input type="checkbox" @click="togglePin" v-model="pinned" :checked="note.isPinned" id="pin"/>
              </label>

            
            <h4 :contenteditable="isEditable"
                @keyup="log"
                >{{note.info.title}}</h4>
                <p :style="{backgroundColor:color}"
                @keyup="log" 
                :contenteditable="isEditable"
                >{{note.info.content}}</p>
            <div class="action-container">
                <input @change="addColor" type="color" name="color"
                 v-model="color"/>
                <button @click.stop="remove">&#10754;</button>
                <button @click.stop="duplicate">&#x29C9;</button>
                <button @onchange="saveEdits" @click="toggleEdit">{{isEditable? 'save': '+'}}</button>
                
                            
              </div>
          </section>

        `,
  components: {},
  created() {},
  data() {
    return {
      color: this.note.style.backgroundColor,
      pinned: this.note.isPinned,
      edits: {},
      isEditable: false,
    }
  },
  methods: {
    saveEdits(ev) {
      console.log(ev.target.value)
    },
    log(ev) {
      if (ev.target.nodeName === 'P') {
        this.edits.content = ev.target.innerText
      }

      if (ev.target.nodeName === 'H4') {
        this.edits.title = ev.target.innerText
      }
      console.log(ev.target.nodeName)
      // console.log(ev.target.innerText)
    },
    toggleEdit(ev) {
      if (ev.target.innerText === 'save') {
        console.log('save')
        this.$emit('save-edits', this.edits, this.note.id)
      }
      this.isEditable = !this.isEditable
      console.log('edit:', this.isEditable)
    },
    select() {
      console.log('ok')
      this.$emit('selected', this.note)
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
