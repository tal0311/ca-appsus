export default {
  name: 'actions',
  props: [],
  template: `

              <div class="action-container">
                <input @change="addColor" type="color" name="color"
                 v-model="color"/>
                <button @click="remove">remove</button>
                <button @click="duplicate">duplicate</button>
                <input type="text" />
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
      console.log('dup')
      this.$emit('remove-note')
    },
    remove() {
      console.log('remove')
    },
    addColor() {
      console.log(this.color)
    },
  },
  computed: {},
}
