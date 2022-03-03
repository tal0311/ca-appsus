import keepActionCmp from './keep-action.cmp.js'

export default {
  name: 'txt-cmp',
  props: ['info', 'noteId'],

  template: `
       <pre>{{noteId}}</pre>
          <section>
            <h4>{{info.title}}</h4>
              <textarea cols="30" rows="10"
              >{{info.content}}</textarea>
           <keep-action-cmp  
          :id="noteId" @duplicate-note="log" />
          </section>

        `,
  components: {
    keepActionCmp,
  },
  created() {},
  data() {
    return {}
  },
  methods: {
    log(id) {
      console.log(id)
      this.$emit('remove', id)
    },
  },
  computed: {},
}
