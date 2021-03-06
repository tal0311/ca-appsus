!(function (e, t) {
  if ('object' == typeof exports && 'object' == typeof module)
    module.exports = t()
  else if ('function' == typeof define && define.amd) define([], t)
  else {
    var r = t()
    for (var o in r) ('object' == typeof exports ? exports : e)[o] = r[o]
  }
})(window, function () {
  return (function (e) {
    var t = {}
    function r(o) {
      if (t[o]) return t[o].exports
      var n = (t[o] = { i: o, l: !1, exports: {} })
      return e[o].call(n.exports, n, n.exports, r), (n.l = !0), n.exports
    }
    return (
      (r.m = e),
      (r.c = t),
      (r.d = function (e, t, o) {
        r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: o })
      }),
      (r.r = function (e) {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(e, '__esModule', { value: !0 })
      }),
      (r.t = function (e, t) {
        if ((1 & t && (e = r(e)), 8 & t)) return e
        if (4 & t && 'object' == typeof e && e && e.__esModule) return e
        var o = Object.create(null)
        if (
          (r.r(o),
          Object.defineProperty(o, 'default', { enumerable: !0, value: e }),
          2 & t && 'string' != typeof e)
        )
          for (var n in e)
            r.d(
              o,
              n,
              function (t) {
                return e[t]
              }.bind(null, n)
            )
        return o
      }),
      (r.n = function (e) {
        var t =
          e && e.__esModule
            ? function () {
                return e.default
              }
            : function () {
                return e
              }
        return r.d(t, 'a', t), t
      }),
      (r.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
      }),
      (r.p = ''),
      r((r.s = 0))
    )
  })([
    function (e, t, r) {
      'use strict'
      r.r(t)
      var o = (function (e, t, r, o, n, i, s, a) {
          var l,
            u = 'function' == typeof e ? e.options : e
          if (
            (t && ((u.render = t), (u.staticRenderFns = r), (u._compiled = !0)),
            o && (u.functional = !0),
            i && (u._scopeId = 'data-v-' + i),
            s
              ? ((l = function (e) {
                  ;(e =
                    e ||
                    (this.$vnode && this.$vnode.ssrContext) ||
                    (this.parent &&
                      this.parent.$vnode &&
                      this.parent.$vnode.ssrContext)) ||
                    'undefined' == typeof __VUE_SSR_CONTEXT__ ||
                    (e = __VUE_SSR_CONTEXT__),
                    n && n.call(this, e),
                    e &&
                      e._registeredComponents &&
                      e._registeredComponents.add(s)
                }),
                (u._ssrRegister = l))
              : n &&
                (l = a
                  ? function () {
                      n.call(this, this.$root.$options.shadowRoot)
                    }
                  : n),
            l)
          )
            if (u.functional) {
              u._injectStyles = l
              var c = u.render
              u.render = function (e, t) {
                return l.call(t), c(e, t)
              }
            } else {
              var d = u.beforeCreate
              u.beforeCreate = d ? [].concat(d, l) : [l]
            }
          return { exports: e, options: u }
        })(
          {
            props: {
              css: { type: String, default: 'embed-responsive-16by9' },
              src: { type: String },
              params: { type: Object },
            },
            data: function () {
              return {
                valid: !1,
                url: '',
                videos: [
                  {
                    reg: /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/i,
                    url: 'https://www.youtube.com/embed/$5',
                    params: {
                      'picture-in-picture': 1,
                      accelerometer: 1,
                      gyroscope: 1,
                    },
                  },
                  {
                    reg: /^.*vimeo.com\/(\d+)($|\/|\b)/i,
                    url: 'https://player.vimeo.com/video/$1',
                    params: { title: 0, byline: 0, portrait: 0 },
                  },
                  {
                    reg: /^.*(?:\/video|dai.ly)\/([A-Za-z0-9]+)([^#\&\?]*).*/i,
                    url: 'https://www.dailymotion.com/embed/video/$1',
                    params: { autoplay: 0 },
                  },
                  {
                    reg: /^.*coub.com\/(?:embed|view)\/([A-Za-z0-9]+)([^#\&\?]*).*/i,
                    url: 'https://coub.com/embed/$1',
                    params: { autoplay: 0 },
                  },
                ],
              }
            },
            watch: {
              src: function (e) {
                this.parse()
              },
            },
            methods: {
              parse: function () {
                if (this.src)
                  for (var e = 0; e < this.videos.length; e++) {
                    var t = this.videos[e]
                    if (t.reg.exec(this.src)) {
                      var r = Object.assign({}, t.params, this.params),
                        o = Object.keys(r)
                          .map(function (e) {
                            return e + '=' + r[e]
                          })
                          .join('&'),
                        n = t.url.indexOf('?') >= 0 ? '&' : '?'
                      return (
                        (this.url = this.src.replace(t.reg, t.url) + n + o),
                        void (this.valid = !0)
                      )
                    }
                  }
                this.valid = !1
              },
            },
            mounted: function () {
              this.parse()
            },
          },
          function () {
            var e = this.$createElement,
              t = this._self._c || e
            return this.valid
              ? t(
                  'div',
                  { staticClass: 'embed-responsive', class: [this.css] },
                  [
                    t('iframe', {
                      staticClass: 'embed-responsive-item',
                      attrs: {
                        loading: 'lazy',
                        sandbox:
                          'allow-forms allow-scripts allow-pointer-lock allow-same-origin allow-top-navigation allow-presentation',
                        allowfullscreen: '',
                        src: this.url,
                      },
                    }),
                  ]
                )
              : this._e()
          },
          [],
          !1,
          null,
          null,
          null
        ).exports,
        n = {
          install: function (e) {
            e.__embed_installed ||
              ((e.__embed_installed = !0), e.component('video-embed', o))
          },
        }
      'undefined' != typeof window && window.Vue && Vue.use(n)
      t.default = n
    },
  ])
})
