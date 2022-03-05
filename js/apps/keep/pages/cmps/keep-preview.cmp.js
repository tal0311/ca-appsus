import keepTxtCmp from './keep-txt.cmp.js'
import keepImgCmp from './keep-img.cmp.js'
import keepVideoCmp from './keep-video.cmp.js'

export default {
  name: 'preview-note',
  props: ['note'],
  emits: ['save-update'],
  template: `
            <section class="prev-container" :style="{backgroundColor: note.style.backgroundColor}"
            class="note-modal">
              <button class="close-modal" @click="$emit('close-modal')">X</button>
             <!-- <pre>{{note}}</pre> -->
                   <component v-if="note" 
                   @remove-note="remove"
                   @duplicate-note="duplicate"
                   @change-color="addColor"
                   @pin="pinNote"
                   :is="note.type"
                   :note="note"
                   @save-edits="onSaveEdits">
                  </component>
              </section>
     
           


        `,
  components: {
    keepTxtCmp,
    keepImgCmp,
    keepVideoCmp,
  },
  created() {},
  data() {
    return {}
  },
  methods: {
    onSaveEdits(edits, id) {
      this.$emit('save-update', edits, id)
    },
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
