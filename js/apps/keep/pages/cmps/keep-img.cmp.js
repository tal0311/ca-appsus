export default {
  name: 'keep-img-cmp',
  props: ['info', 'noteId'],
  template: `

        <section v-bind="$attrs">
          <h4>{{info.title}}</h4>
          <img :src="imgUrl"  />
            <p>{{info.content}}</p>
           <div class="action-container">
                <input @change="addColor" type="color" name="color"
                 v-model="color"/>
                <button @click="remove">remove</button>
                <button @click="duplicate">duplicate</button>
            </div>  
           
          </section>
        `,
  components: {},
  created() {},
  data() {
    return {
      color: '',
    }
  },
  methods: {
    addColor() {
      this.color
    },
    remove() {
      console.log('remove', this.noteId)
      this.$emit('remove-note', this.noteId)
    },
    duplicate() {
      console.log('dup', this.noteId)
      this.$emit('duplicate-note', this.noteId)
    },
  },
  computed: {
    imgUrl() {
      return this.info.content
    },
  },
}
