export default {
    name: 'mail-filter',
    template: `
    <section class="mail-filter">
       <input 
        type="text" 
        placeHolder= "Search in mail" 
        v-model="filterBy"  
        @input="onFilter" 
        class="mail-filter"/>         
    </section>
          `,

    data() {
        return {
            filterBy: '',
        };
    },
    methods: {
        onFilter() {
            // console.log(this.filterBy);
            return this.$emit('filtered', this.filterBy);
        },
    },
    computed: {},
};
