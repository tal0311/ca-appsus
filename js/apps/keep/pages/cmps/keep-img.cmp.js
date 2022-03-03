export default {
  name: 'img-cmp',
  props: ['note'],
  emits: ['remove-note', 'duplicate-note', 'change-color', 'pin'],
  template: `

        <section :style="{backgroundColor:color}" v-bind="$attrs">
          <input type="checkbox" @click="togglePin" v-model="pinned" :checked="note.isPinned" />
           <h4>{{note.info.title}}</h4>
          <img :src="imgUrl"  />
            <p>{{note.info.content}}</p>
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
      color: '#ffffff',
      pinned: this.note.isPinned,
    }
  },
  methods: {
    togglePin() {
      console.log(this.note.id, this.note.isPinned)
      this.$emit('pin', this.note.id, this.pinned)
    },
    addColor() {
      this.$emit('change-color', this.color, this.note.id)
    },
    remove() {
      this.$emit('remove-note', this.note.id)
    },
    duplicate() {
      this.$emit('duplicate-note', this.note.id)
    },
  },
  computed: {
    imgUrl() {
      return this.note.info.content
    },
  },
}
