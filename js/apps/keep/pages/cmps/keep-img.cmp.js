export default {
  name: 'keep-img-cmp',
  props: ['info'],
  template: `

  <section>
    <h4>{{info.title}}</h4>
    <img :src="imgUrl"  />
      <p>{{info.content}}</p>
  </section>
        `,
  components: {},
  created() {},
  data() {
    return {}
  },
  methods: {},
  computed: {
    imgUrl() {
      return this.info.content
    },
  },
}
