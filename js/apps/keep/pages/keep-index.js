import { keepService } from '../../../services/keep-service.js'
import keepTodoCmp from './cmps/keep-todo.cmp.js'
import keepVideoCmp from './cmps/keep-video.cmp.js'
import keepTxtCmp from './cmps/keep-txt.cmp.js'
import keepImgCmp from './cmps/keep-img.cmp.js'
import keepAddNoteCmp from './keep-add-note.cmp.js'

export default {
  name: 'keep-index',
  emits: ['remove', 'duplicate', 'change-color'],
  template: `
    <section class="keep-index app-main">
    <h1>keep app</h1>
    
    <section class="add-note ">
      <!-- add new note -->
      <keep-add-note-cmp @new-note="addNote"/>
    </section>

    <section class="pinned-notes-container flex" >
      <!-- pinned notes -->
      
       <component class="note" :is="cmp.type"
        :info="cmp.info"
        :noteId="cmp.id"
        :noteStyle="cmp.style"
        @remove-note="removeNote" @duplicate-note="duplicateNote"
        @change-color="addColorToNote"
        :key="cmp.id" v-for="cmp in pinned"
        ></component>
       
      
    </section>
   
   
    <section class="notes-container flex" >

        <component class="note" :is="cmp.type" :info="cmp.info"
        :noteId="cmp.id"
       
        @remove-note="removeNote" @duplicate-note="duplicateNote"
        :key="cmp.id" v-for="cmp in notes"
        ></component>

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
    addColorToNote(color, id) {
      console.log(color, id)
      keepService.get(id).then((note) => {
        console.log(note.style.backgroundColor)
      })
    },
    addNote(note) {
      console.log(note)
      // todo: pass to service
      let newNote = keepService.getEmptyNote()
      newNote.type = note.type
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
    removeNote(id) {
      console.log('note:', id)
      keepService.get(id).then((note) => {
        console.log(note)
        if (note.isPinned) {
          let idx = this.pinned.findIndex((note) => note.id === id)
          this.pinned.splice(idx, 1)
        }
        let idx = this.pinned.findIndex((note) => note.id)
        this.notes.splice(idx, 1)
      })
      keepService.remove(id).then((res) => console.log(res))
    },
    duplicateNote(id) {
      console.log('duplicate', id)
      keepService.get(id).then((note) => {
        let duplicateNote = { ...note }
        duplicateNote.is = note.id + 'dup'
        keepService.save(duplicateNote).then((note) => {
          if (note.isPinned) {
            console.log('pinned')
            this.pinned = [...this.pinned, note]
          }
          this.notes = [...this.notes, note]
        })
      })
    },
  },
  computed: {},
}
