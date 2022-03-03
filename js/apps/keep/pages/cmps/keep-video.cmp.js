export default {
  name: 'videoNote',
  props: ['note'],
  emit: ['remove-note', 'duplicate-note', 'change-color', 'pin'],
  template: `

  <section :style="{backgroundColor:color}" v-bind="$attrs">
     <input type="checkbox" @click="togglePin" v-model="pinned" :checked="note.isPinned" />
     
    <h4>{{note.info.title}}</h4>
    <iframe :src="note.info.content" frameborder="0"></iframe>
    <p>{{note.info.content}}</p>
    
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
      pinned: this.note.isPinned,
    }
  },
  methods: {
    togglePin() {
      console.log(this.note.id, this.note.isPinned)
      this.$emit('pin', this.note.id, this.pinned)
    },
    addColor() {
      this.color
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
