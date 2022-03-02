export default {
  props: ['info'],
  template: `
  <section>
    <h4>{{info.title}}</h4>
    <iframe :src="info.content" frameborder="0"></iframe>
    <p>{{info.content}}</p>
    
               
    
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
