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
      <button value="img">image</button>
      <button>text</button>
      <button>video</button>
      <button>todo</button>
       <component class="note" :is="cmp.type" :info="cmp.info" @selVal="setAns" :key="cmp.id"></component>
      
    </section>

    <!-- list -->
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
      this.notes = notes
      console.log(this.notes)
    })
  },
  data() {
    return {
      notes: null,
      noteType: '',
    }
  },
  methods: {
    setAns() {
      console.log('set val')
    },
  },
  computed: {},
}
