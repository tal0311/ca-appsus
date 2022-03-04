import { keepService } from '../../../services/keep-service.js'
import keepTodoCmp from './cmps/keep-todo.cmp.js'
import keepVideoCmp from './cmps/keep-video.cmp.js'
import keepTxtCmp from './cmps/keep-txt.cmp.js'
import keepImgCmp from './cmps/keep-img.cmp.js'
import keepAddNoteCmp from './keep-add-note.cmp.js'
import keepFilterCmp from './keep-filter.cmp.js'
import keepFilterResultsCmp from './cmps/keep-filter-results.cmp.js'
import keepPreviewCmp from './cmps/keep-preview.cmp.js'

export default {
  name: 'keep-index',
  emits: ['remove', 'duplicate', 'change-color', 'pin'],
  template: `
    <section class="keep-index app-main">
        <h1>keep app</h1>
        <keep-filter-cmp @filtered="setFilterBy"/>
        <section class="add-note ">
          <!-- add new note -->
        <keep-add-note-cmp @new-note="addNote"/>
    </section>

    <section class="pinned-notes-container flex" >
      <!-- pinned notes -->
      
       <component v-if="pinned" class="note" :is="cmp.type"
       :key="cmp.id" v-for="cmp in pinned"
       :note="cmp"
        @remove-note="removeNote" @duplicate-note="duplicateNote"
        @change-color="addColorToNote"
        @pin="pinNote"
        @selected="setNotePreview"
        ></component>
   </section>
      
      
        <keep-filter-results-cmp 
          v-if="filterValue"
          :notes="booksToShow"/>
 
    <section class="notes-container flex" >

        <component class="note" :is="cmp.type" 
        :key="cmp.id" v-for="cmp in notes"
        :note="cmp"
        @remove-note="removeNote" @duplicate-note="duplicateNote"
        @change-color="addColorToNote"
        @pin="pinNote"
        ></component>
        
    </section>

      <keep-preview-cmp 
      @remove="removeNote"
      @color="addColorToNote"
      @duplicate="duplicateNote"
      @close-modal="closePreview"
      v-if="noteToPreview"
      :note="noteToPreview"
      />
        

    
    </section>
    `,
  components: {
    keepTodoCmp,
    keepVideoCmp,
    keepTxtCmp,
    keepImgCmp,
    keepAddNoteCmp,
    keepFilterCmp,
    keepFilterResultsCmp,
    keepPreviewCmp,
  },
  created() {
    keepService.query().then((notes) => {
      this.notes = notes.filter((note) => !note.isPinned)
      this.pinned = notes.filter((note) => note.isPinned)
    })
  },
  data() {
    return {
      pinned: null,
      notes: null,
      filterValue: null,
      noteToPreview: null,
    }
  },

  methods: {
    closePreview() {
      this.noteToPreview = null
    },
    setNotePreview(note) {
      console.log('selected', note)
      this.noteToPreview = note
      console.log('this.noteToPreview:', this.noteToPreview)
    },
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
      if (note.type === 'keepTodoCmp') {
        let newNote = keepService.getEmptyTodo()
        console.log('newNote:', newNote)

        newNote.type = note.type
        newNote.info.label = note.TitleInput
        newNote.info.todos = note.contentInput.split(',').map((task) => {
          return { txt: task }
        })

        console.log(newNote)
        newNote.isPinned = note.isPinned
        keepService.save(newNote).then((note) => {
          note.isPinned
            ? (this.pinned = [...this.pinned, note])
            : (this.notes = [...this.notes, note])
          console.log('notes:', this.notes)
          console.log('pinned:', this.pinned)
        })
        return
      }
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
      console.log('id:', id)
      keepService.get(id).then((note) => {
        console.log('new note:', note)
        if (note.isPinned) {
          console.log('pinned remove')
          let idx = this.pinned.findIndex((note) => note.id === id)
          this.pinned.splice(idx, 1)
        } else {
          console.log('not pinned remove')
          let idx = this.notes.findIndex((note) => note.id === id)
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
    setFilterBy(filterBy) {
      console.log(filterBy)
      this.filterValue = filterBy
    },
  },
  computed: {
    booksToShow() {
      if (!this.filterValue) return this.notes
      const regex = new RegExp(this.filterValue.title, 'i')
      return this.notes.filter((note) => regex.test(note.info.title))
    },
  },
}
