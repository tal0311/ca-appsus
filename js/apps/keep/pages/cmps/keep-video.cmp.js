export default {
  name: 'videoNote',
  props: ['note'],
  emit: ['remove-note', 'duplicate-note', 'change-color', 'pin', 'selected'],
  template: `

  <section :style="{backgroundColor:color}"
     v-bind="$attrs"
     @click="select">

    <label htmlFor="pin">
      &#9733;
      <input type="checkbox" @click="togglePin" v-model="pinned" :checked="note.isPinned" id="pin"/>

    </label>
     
    <h4>{{note.info.title}}</h4>
    <iframe :src="note.info.content" frameborder="0"></iframe>
    
    
        <div class="action-container">
        <input @change="addColor" type="color" name="color"
          v-model="color"/>
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
      color: this.note.style.backgroundColor || '#ffffff',
      pinned: this.note.isPinned,
    }
  },
  methods: {
    select() {
      console.log('ok')
      this.$emit('selected', this.note)
    },
    togglePin() {
      console.log(this.note.id, this.note.isPinned)
      this.$emit('pin', this.note.id, this.pinned)
    },
    addColor() {
      this.$emit('change-color', this.color, this.note.id)
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
