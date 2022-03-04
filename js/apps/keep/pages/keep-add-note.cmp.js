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

           <textarea :placeholder="contentPlaceHolder"
           v-model="newNote.contentInput" ></textarea>
          
 
           <input  title="Pin note" type="checkbox"
           name="isPinned" value="true" v-model="newNote.isPinned"/>
             
              
          <button @click="saveNote">add note</button>
          <div className="type-container">
            <label htmlFor="img">
              img
              <input type="radio" name="type" value="keepImgCmp" v-model="newNote.type" />
            </label>
            <label htmlFor="img">
                 video
              <input type="radio" name="type" value="keepVideoCmp" v-model="newNote.type" />
            </label>
            <label htmlFor="img">
                 todo
              <input type="radio" name="type" value="keepTodoCmp" v-model="newNote.type" />
            </label>
            <label htmlFor="img">
                 text
              <input type="radio" name="type" value="keepTxtCmp" v-model="newNote.type" />
            </label>
          </div>
         
          
         
          <!--change to color only -->
         

        </section>

        `,
  components: {
    keepActionCmp,
  },
  created() {},
  data() {
    return {
      newNote: {
        type: 'keepTxtCmp',
        TitleInput: '',
        contentInput: '',
        isPinned: '',
      },
    }
  },
  methods: {
    saveNote() {
      if (this.newNote.type === 'keepVideoCmp') {
        console.log('type video')
        const regRx = new RegExp(/watch/)
        this.newNote.contentInput = this.newNote.contentInput.replace(
          regRx,
          'embed'
        )
        
      }
      console.log(this.newNote.type)
      this.$emit('new-note', this.newNote)
      this.newNote.TitleInput = ''
      this.newNote.contentInput = ''
      this.newNote.isPined = ''
      this.newNote.type = ''
    },
  },
  computed: {
    contentPlaceHolder() {
      if (this.newNote.type === 'keepTxtCmp') return 'add your text here'
      if (
        this.newNote.type === 'keepImgCmp' ||
        this.newNote.type === 'keepVideoCmp'
      )
        return 'add your url here'
      if (this.newNote.type === 'keepTodoCmp') return 'add csv'
    },
  },
}
