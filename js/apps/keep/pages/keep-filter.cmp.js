export default {
  name: 'notesFilter',
  template: `
  <section class="filter">
     <input type="text" placeHolder= "search notes" v-model="filterBy.title" @change="onFilter" />
     
     <button>Go!</button>

     <!-- add new book comp -->
     
  </section>
        `,

  data() {
    return {
      filterBy: {
        title: '',
      },
    }
  },
  methods: {
    onFilter() {
     
      return this.$emit('filtered', this.filterBy)
    },
  },
  computed: {},
}
