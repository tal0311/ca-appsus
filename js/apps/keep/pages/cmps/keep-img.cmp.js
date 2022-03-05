export default {
  name: 'img-cmp',
  props: ['note'],
  emits: ['remove-note', 'duplicate-note', 'change-color', 'pin', 'selected'],
  template: `

        <section :style="{backgroundColor:color}"
         v-bind="$attrs"
         @click="select">

        <label htmlFor="pin">
                &#9733;
                <input type="checkbox" @click="togglePin" v-model="pinned" :checked="note.isPinned" id="pin"/>
        </label>

         
           <h4>{{note.info.title}}</h4>
          <img :src="imgUrl"  />
         
            
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
      pinned: this.note.isPinned,
    }
  },
  methods: {
    select() {
      console.log('ok')
      this.$emit('selected', this.note)
    },
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
