export default {
  name: 'actions',
  props: ['id'],
  template: `

              <div class="action-container">
                <input @change="addColor" type="color" name="color"
                 v-model="color"/>
                <button @click="remove">remove</button>
                <button @click="duplicate">duplicate</button>
                
             </div>


        `,
  components: {},
  created() {},
  data() {
    return {
      color: '',
    }
  },
  methods: {
    duplicate() {
      console.log('dup', this.id)
    },
    remove() {
      console.log('remove')
    },
    addColo() {
      console.log('color')
    },
  },
  computed: {},
}
