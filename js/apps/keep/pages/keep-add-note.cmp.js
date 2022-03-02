import keepActionCmp from './cmps/keep-action.cmp.js'

export default {
  name: 'keep-add-note-comp',
  props: [],
  template: `
         <section class="add-note-container flex">

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
         
          <keep-action-cmp/>

        </section>

        `,
  components: {
    keepActionCmp,
  },
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
