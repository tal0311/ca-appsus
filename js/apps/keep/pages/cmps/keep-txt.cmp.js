export default {
  props: ['info'],
  template: `
       
          <section>
            <h4>{{info.title}}</h4>
              <textarea cols="30" rows="10"
              >{{info.txt}}</textarea>
          </section>

        `,
  components: {},
  created() {},
  data() {
    return {
      val: '',
    }
  },
  methods: {},
  computed: {},
}
