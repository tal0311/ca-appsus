import keepTodoCmp from './cmps/keep-todo.cmp.js'
import keepVideoCmp from './cmps/keep-video.cmp.js'
import keepTxtCmp from './cmps/keep-txt.cmp.js'
import keepImgCmp from './cmps/keep-img.cmp.js'

export default {
  name: 'keep-index',
  template: `
    <section class="keep-index app-main">
    <h1>keep app</h1>
    
    <!-- list -->
    <div v-for="cmp in notes">

        <component  :is="cmp.type" :info="cmp.info" @selVal="setAns" :key="cmp.id"></component>

    </div>
   


    </section>
    `,
  components: {
    keepTodoCmp,
    keepVideoCmp,
    keepTxtCmp,
    keepImgCmp,
  },
  data() {
    return {
      notes: [
        {
          id: 'n101',
          type: 'keepTodoCmp',
          isPinned: true,
          info: {
            txt: 'Fullstack Me Baby!',
          },
        },
        {
          id: 'n101',
          type: 'keepTxtCmp',
          isPinned: true,
          info: {
            txt: 'Fullstack Me Baby!',
          },
        },
        {
          id: 'n102',
          type: 'keepVideoCmp',
          info: {
            url: 'http://some-img/me',
            title: 'Bobi and Me',
          },
          style: {
            backgroundColor: '#00d',
          },
        },
        {
          id: 'n103',
          type: 'keepImgCmp',
          info: {
            label: 'Get my stuff together',
            todos: [
              { txt: 'Driving liscence', doneAt: null },
              { txt: 'Coding power', doneAt: 187111111 },
            ],
          },
        },
        {
          id: 'n103',
          type: 'keepImgCmp',
          info: {
            label: 'Get my stuff together',
            todos: [
              { txt: 'Driving liscence', doneAt: null },
              { txt: 'Coding power', doneAt: 187111111 },
            ],
          },
        },
      ],
    }
  },
  methods: {
    setAns() {
      console.log('set val')
    },
  },
  computed: {},
  created() {
    console.log(this.notes[0].type)
    console.log('created')
  },
}
