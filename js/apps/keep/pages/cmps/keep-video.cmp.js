export default {
  props: ['info', 'noteId'],
  template: `
  <section>
    <h4>{{info.title}}</h4>
    <iframe :src="info.content" frameborder="0"></iframe>
    <p>{{info.content}}</p>
    
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
      color: '',
    }
  },
  methods: {
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
