import keepTodoCmp from './keep-todo.cmp.js'
import keepVideoCmp from './keep-video.cmp.js'
import keepTxtCmp from './keep-txt.cmp.js'
import keepImgCmp from './keep-img.cmp.js'

export default {
  name: 'filter-results',
  props: ['notes'],
  template: `
           

      
      <hr />     
     <section v-if="notes.length>0" class="filtered-notes-container" >
       <h1>Search results</h1>

        <component class="note"
        v-for="cmp in notes"
        :is="cmp.type" 
        :key="cmp.id" 
        :note="cmp"
        
        ></component>


        <!-- @remove-note="removeNote" @duplicate-note="duplicateNote"
        @change-color="addColorToNote"
        @pin="pinNote" -->
        
    </section>

    <section v-else>
     <h1>no results for this search</h1>
    </section>

    <hr />
        
    
        `,
  components: {
    keepTodoCmp,
    keepVideoCmp,
    keepTxtCmp,
    keepImgCmp,
  },
  created() {},
  data() {
    return {}
  },
  methods: {},
  computed: {},
}
