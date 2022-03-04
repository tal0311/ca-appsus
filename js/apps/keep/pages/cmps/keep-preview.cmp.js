import keepTxtCmp from './keep-txt.cmp.js'

export default {
  name: 'preview-note',
  props: ['note'],
  template: `
            <section :style="{backgroundColor: note.style.backgroundColor}"
            class="note-modal">
              <button @click="$emit('close-modal')">X</button>
              <h1>preview</h1> 
                 <component v-if="note" 
                   @remove-note="remove"
                   @duplicate-note="duplicate"
                   @change-color="addColor"
                   @pin="pinNote"
                   :is="note.type"
                   :note="note">
                  </component>
              </section>
     
           


        `,
  components: {
    keepTxtCmp,
  },
  created() {},
  data() {
    return {}
  },
  methods: {
    remove() {
      this.$emit('remove', this.note.id)
    },
    addColor(color) {
      this.$emit('color', color, this.note.id)
    },
    duplicate(id) {
      this.$emit('duplicate', id)
    },
  },
  computed: {},
}
