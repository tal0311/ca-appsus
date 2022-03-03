export default {
  name: 'txt-cmp',
  props: ['info', 'noteId', 'noteStyle'],
  emits: ['remove-note', 'duplicate-note', 'change-color'],

  template: `
       
          <section :style="{backgroundColor:color}" v-bind="$attrs">
            <h4 >{{info.title}}</h4>
              <textarea :style="{backgroundColor:color}" cols="30" rows="10"
              >{{info.content}}</textarea>
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
      color: this.noteStyle.backgroundColor,
    }
  },
  methods: {
    addColor() {
      this.$emit('change-color', this.color, this.noteId)
      console.log(this.color)
    },
    remove() {
      console.log('remove', this.noteId)
      this.$emit('remove-note', this.noteId)
    },
    duplicate() {
      console.log('dup', this.noteId)
      this.$emit('duplicate-note', this.noteId)
    },
    setStyle(style) {
      console.log(style)
    },
  },
  computed: {},
}
