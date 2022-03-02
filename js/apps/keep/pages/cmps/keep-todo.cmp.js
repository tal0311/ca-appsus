export default {
  props: ['info'],
  template: `
       <section>
         <h4>note title</h4>
            <div>
            <label htmlFor="1">
              <p>task 1</p>
              <input type="checkbox" name="" id="1" />
            </label>
            <label htmlFor="2">
              <p>task 2</p>
              <input type="checkbox" name="" id="2" />
            </label>
            <label htmlFor="3">
              <p>task 3</p>
              <input type="checkbox" name="" id="3" />
            </label>
             
             </div>
       </section>

        `,
  components: {},
  created() {},
  data() {
    return {}
  },
  methods: {},
  computed: {},
}
