export default {
  props: ['info'],
  template: `
  <section>
    <h4>{{info.title}}</h4>
    <iframe src="info.url" frameborder="0"></iframe>
    <p>{{info.url}}</p>
    <div>

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
