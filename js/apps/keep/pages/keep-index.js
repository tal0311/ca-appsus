import { keepService } from '../../../services/keep-service.js'
import keepTodoCmp from './cmps/keep-todo.cmp.js'
import keepVideoCmp from './cmps/keep-video.cmp.js'
import keepTxtCmp from './cmps/keep-txt.cmp.js'
import keepImgCmp from './cmps/keep-img.cmp.js'
import keepAddNoteCmp from './keep-add-note.cmp.js'

export default {
  name: 'keep-index',
  emits: ['remove', 'duplicate', 'change-color', 'pin'],
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
       :key="cmp.id" v-for="cmp in pinned"
       :note="cmp"
        @remove-note="removeNote" @duplicate-note="duplicateNote"
        @change-color="addColorToNote"
        @pin="pinNote"
        ></component>
       
      
      
    </section>
   
   
    <section class="notes-container flex" >

        <component class="note" :is="cmp.type" 
        :key="cmp.id" v-for="cmp in notes"
        :note="cmp"
        @remove-note="removeNote" @duplicate-note="duplicateNote"
        @change-color="addColorToNote"
        @pin="pinNote"
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
      this.notes = notes.filter((note) => !note.isPinned)
      this.pinned = notes.filter((note) => note.isPinned)
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
    pinNote(id, isPinned) {
      console.log(id, isPinned)

      keepService.get(id).then((note) => {
        note.isPinned = !note.isPinned
        console.log(note.isPinned)
        if (note.isPinned) {
          let idx = this.notes.findIndex((note) => note.id === id)
          let toPin = this.notes.splice(idx, 1)[0]
          toPin.isPinned = !toPin.isPinned
          this.pinned.push(toPin)
          console.log(this.pinned)
        } else {
          console.log('to unpin')
          let idx = this.pinned.findIndex((note) => note.id === id)
          console.log(idx)
          let unpin = this.pinned.splice(idx, 1)[0]
          unpin.isPinned = !unpin.isPinned
          this.notes = [...this.notes, unpin]
        }
        keepService.save(note)
      })
    },
    addColorToNote(color, id) {
      console.log(color, id)
      keepService.get(id).then((note) => {
        console.log(note)
        note.style = { ...note.style, backgroundColor: color }
        keepService.save(note)
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
          console.log('pinned remove')
          let idx = this.pinned.findIndex((note) => note.id === id)
          this.pinned.splice(idx, 1)
        } else {
          console.log('not pinned remove')
          let idx = this.pinned.findIndex((note) => note.id)
          this.notes.splice(idx, 1)
        }
      })
      keepService.remove(id)
    },
    duplicateNote(id) {
      console.log('duplicate', id)
      keepService.get(id).then((note) => {
        let clone = { ...note }
        clone.id = ''
        keepService.save(clone).then((note) => {
          if (note.isPinned) {
            console.log('pinned')
            this.pinned = [...this.pinned, note]
          } else {
            console.log('not pined')
            this.notes = [...this.notes, note]
          }
        })
      })
    },
  },
  computed: {},
}
