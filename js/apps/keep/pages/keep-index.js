import { keepService } from '../../../services/keep-service.js'
import keepTodoCmp from './cmps/keep-todo.cmp.js'
import keepVideoCmp from './cmps/keep-video.cmp.js'
import keepTxtCmp from './cmps/keep-txt.cmp.js'
import keepImgCmp from './cmps/keep-img.cmp.js'
import keepAddNoteCmp from './keep-add-note.cmp.js'

export default {
  name: 'keep-index',
  template: `
    <section class="keep-index app-main">
    <h1>keep app</h1>
    
    <section>
      <!-- add new note -->
      <keep-add-note-cmp @new-note="addNote"/>
    </section>

    <section class="pinned-notes-container" v-for="cmp in pinned">
      <!-- pinned notes -->
      
       <component class="note" :is="cmp.type" :info="cmp.info" @selVal="setAns" :key="cmp.id"></component>
      
    </section>
   
   
    <section class="notes-container" v-for="cmp in notes">

        <component class="note" :is="cmp.type" :info="cmp.info" @selVal="setAns" :key="cmp.id"></component>

    </section>
   


    </section>
    `,
  components: {
    keepTodoCmp,
    keepVideoCmp,
    keepTxtCmp,
    keepImgCmp,
    keepAddNoteCmp,
  },
  created() {
    keepService.query().then((notes) => {
      this.pinned = notes.filter((note) => note.isPinned)
      this.notes = notes
      console.log('notes:', this.notes)
      console.log('pinned:', this.pinned)
    })
  },
  data() {
    return {
      pinned: null,
      notes: null,
    }
  },

  methods: {
    addNote(note) {
      console.log(note)
      // todo: pass to service
      let newNote = keepService.getEmptyNote()
      newNote.type = 'keepTxtCmp'
      newNote.info.title = note.TitleInput
      newNote.info.content = note.contentInput
      newNote.isPinned = note.isPinned

      console.log('newNote:', newNote)
      keepService.save(newNote).then((note) => {
        note.isPinned
          ? (this.pinned = [...this.pinned, note])
          : (this.notes = [...this.notes, note])
        console.log('notes:', this.notes)
        console.log('pinned:', this.pinned)
      })
    },
    setAns() {
      console.log('set val')
    },

    setNoteVal() {
      console.log(this.noteType)
    },
  },
  computed: {},
}
