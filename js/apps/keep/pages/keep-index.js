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
      <hr />
      
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
        @selected="setNotePreview"
        ></component>
        
    </section >

      <keep-preview-cmp 
      class="prev-section"
      v-if="noteToPreview"
      @remove="removeNote"
      @color="addColorToNote"
      @duplicate="duplicateNote"
      @close-modal="closePreview"
      @save-update="updateNote"
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
    findNoteIdx(note) {
      if (note.isPinned) {
        let idx = this.pinned.findIndex((note) => note.id)
        return { idx, isPinned: true }
      } else {
        let idx = this.nots.findIndex((note) => note.id)
        return { idx, isPinned: false }
      }
    },
    updateNote(edits, id) {
      console.log('update Note Index')
      console.log(edits, id)
      keepService.get(id).then((note) => {
        console.log('note from service:', note)
        edits.title ? (note.info.title = edits.title) : ''
        edits.content ? (note.info.content = edits.content) : ''

        if (note.isPinned) {
          this.removeNote(note.id)
          this.pinned = [...this.pinned, note]
        } else {
          this.removeNote(note.id)
          this.notes = [...this.notes, note]
        }

        keepService.save(note)
      })
    },
    closePreview() {
      this.noteToPreview = null
    },
    setNotePreview(note) {
      this.noteToPreview = note
      console.log(this.noteToPreview)
    },
    pinNote(id, isPinned) {
      keepService.get(id).then((note) => {
        note.isPinned = !note.isPinned
        if (note.isPinned) {
          let idx = this.notes.findIndex((note) => note.id === id)
          let toPin = this.notes.splice(idx, 1)[0]
          toPin.isPinned = !toPin.isPinned
          this.pinned.push(toPin)
        } else {
          let idx = this.pinned.findIndex((note) => note.id === id)
          let unpin = this.pinned.splice(idx, 1)[0]
          unpin.isPinned = !unpin.isPinned
          this.notes = [...this.notes, unpin]
        }
        keepService.save(note)
      })
    },
    addColorToNote(color, id) {
      keepService.get(id).then((note) => {
        note.style = { ...note.style, backgroundColor: color }
        keepService.save(note)
      })
    },
    addNote(note) {
      if (note.type === 'keepTodoCmp') {
        let newNote = keepService.getEmptyTodo()
        newNote.type = note.type
        newNote.info.label = note.TitleInput
        newNote.info.todos = note.contentInput.split(',').map((task) => {
          return { txt: task }
        })
        newNote.isPinned = note.isPinned
        keepService.save(newNote).then((note) => {
          note.isPinned
            ? (this.pinned = [...this.pinned, note])
            : (this.notes = [...this.notes, note])
        })
        return
      }
      let newNote = keepService.getEmptyNote()
      newNote.type = note.type
      newNote.info.title = note.TitleInput
      newNote.info.content = note.contentInput
      newNote.isPinned = note.isPinned

      keepService.save(newNote).then((note) => {
        note.isPinned
          ? (this.pinned = [...this.pinned, note])
          : (this.notes = [...this.notes, note])
      })
    },
    removeNote(id) {
      keepService.get(id).then((note) => {
        if (note.isPinned) {
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
