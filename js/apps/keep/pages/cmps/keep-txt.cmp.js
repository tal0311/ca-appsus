export default {
  name: 'txt-cmp',
  props: ['note'],
  emits: ['remove-note', 'duplicate-note', 'change-color', 'un-pin'],

  template: `
  
       
          <section :style="{backgroundColor:color}" v-bind="$attrs">

              <label htmlFor="pin">
                &#9733;
                <input type="checkbox" @click="togglePin" v-model="pinned" :checked="note.isPinned" id="pin"/>
              </label>

            
            <h4 >{{note.info.title}}</h4>
              <textarea :style="{backgroundColor:color}" cols="30" rows="10"
              >{{note.info.content}}</textarea>
            <div class="action-container">
                <input @change="addColor" type="color" name="color"
                 v-model="color"/>
                <button @click="remove">&#10754;</button>
                <button @click="duplicate">&#x29C9;</button>

                
              </div>
          </section>

        `,
  components: {},
  created() {},
  data() {
    return {
      color: this.note.style.backgroundColor,
      pinned: '',
    }
  },
  methods: {
    togglePin() {
      console.log(this.note.id)
      this.$emit('pin', this.note.id)
    },
    addColor() {
      this.$emit('change-color', this.color, this.note.id)
      console.log(this.color)
    },
    remove() {
      console.log('remove', this.note.id)
      this.$emit('remove-note', this.note.id)
    },
    duplicate() {
      console.log('dup', this.note.id)
      this.$emit('duplicate-note', this.note.id)
    },
    setStyle(style) {
      console.log(style)
    },
  },
  computed: {},
}
