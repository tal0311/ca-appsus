export default {
  name: 'keep-add-note-comp',
  props: [],
  template: `
         <section>

          <input type="text" 
          name="title" 
          placeholder="title"
           v-model="newNote.TitleInput"/>
          <input type="text" 
          placeholder="add note here"
           v-model="newNote.contentInput" />
 
          <input  title="Pin note" type="checkbox"
           name="isPinned" value="true" v-model="newNote.isPinned"/>
          <button @click="saveNote" >add note</button>
         </section>

        `,
  components: {},
  created() {},
  data() {
    return {
      newNote: {
        TitleInput: '',
        contentInput: '',
        isPinned: '',
      },
    }
  },
  methods: {
    saveNote() {
      console.log()
      this.$emit('new-note', this.newNote)
      this.newNote.TitleInput = ''
      this.newNote.contentInput = ''
      this.newNote.isPined = '' //!add ref to value
    },
  },
  computed: {},
}
