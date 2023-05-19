!(function () {
  "use strict";
  var e = {},
    t = {};
  function n(r) {
    var c = t[r];
    if (void 0 !== c) return c.exports;
    var o = (t[r] = { exports: {} }),
      f = !0;
    try {
      e[r](o, o.exports, n), (f = !1);
    } finally {
      f && delete t[r];
    }
    return o.exports;
  }
  (n.m = e),
    (function () {
      var e = [];
      n.O = function (t, r, c, o) {
        if (!r) {
          var f = 1 / 0;
          for (d = 0; d < e.length; d++) {
            (r = e[d][0]), (c = e[d][1]), (o = e[d][2]);
            for (var a = !0, u = 0; u < r.length; u++)
              (!1 & o || f >= o) &&
              Object.keys(n.O).every(function (e) {
                return n.O[e](r[u]);
              })
                ? r.splice(u--, 1)
                : ((a = !1), o < f && (f = o));
            if (a) {
              e.splice(d--, 1);
              var i = c();
              void 0 !== i && (t = i);
            }
          }
          return t;
        }
        o = o || 0;
        for (var d = e.length; d > 0 && e[d - 1][2] > o; d--) e[d] = e[d - 1];
        e[d] = [r, c, o];
      };
    })(),
    (n.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return n.d(t, { a: t }), t;
    }),
    (function () {
      var e,
        t = Object.getPrototypeOf
          ? function (e) {
              return Object.getPrototypeOf(e);
            }
          : function (e) {
              return e.__proto__;
            };
      n.t = function (r, c) {
        if ((1 & c && (r = this(r)), 8 & c)) return r;
        if ("object" === typeof r && r) {
          if (4 & c && r.__esModule) return r;
          if (16 & c && "function" === typeof r.then) return r;
        }
        var o = Object.create(null);
        n.r(o);
        var f = {};
        e = e || [null, t({}), t([]), t(t)];
        for (
          var a = 2 & c && r;
          "object" == typeof a && !~e.indexOf(a);
          a = t(a)
        )
          Object.getOwnPropertyNames(a).forEach(function (e) {
            f[e] = function () {
              return r[e];
            };
          });
        return (
          (f.default = function () {
            return r;
          }),
          n.d(o, f),
          o
        );
      };
    })(),
    (n.d = function (e, t) {
      for (var r in t)
        n.o(t, r) &&
          !n.o(e, r) &&
          Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
    }),
    (n.f = {}),
    (n.e = function (e) {
      return Promise.all(
        Object.keys(n.f).reduce(function (t, r) {
          return n.f[r](e, t), t;
        }, [])
      );
    }),
    (n.u = function (e) {
      return (
        "static/chunks/" +
        e +
        "." +
        {
          12: "3fe4254cbb368888",
          35: "f1415bf628836f7d",
          62: "317af438d8199b62",
          82: "ca295a327080c8a2",
          106: "64079d7b154b8779",
          174: "41c463aa5c864aab",
          206: "63e91c6f7ae4f952",
          241: "7ca9d07291349fe0",
          249: "4fa72dcf3471c2b1",
          275: "36a51f55392a8b92",
          281: "ef334ab58548e0cc",
          300: "30a1e195d0c5031b",
          358: "764f185667a177c5",
          370: "b50d272d1bb0d6ea",
          374: "1dee20a893612543",
          391: "3769afcf91869215",
          412: "c7d66859ebd964fb",
          432: "9e205d337eb614fc",
          441: "938ea266227d3f73",
          472: "38f406a81083d9de",
          525: "5624bfef8fb5b81d",
          595: "5e8c8b7d75b6345c",
          605: "2e76472e54adb546",
          637: "07fe0c09a119d9e0",
          661: "974aaec92b9a6445",
          693: "5f10af7ad54fc5d3",
          705: "4d64de519c3fbfbe",
          713: "6a64cdcaff32c13f",
          741: "cb110aecc221b86c",
          791: "851da18e074831ee",
          792: "8ec5e2050636704a",
          850: "2e2b37b02c506205",
          942: "02145957601c2d93",
          973: "5dd59a2b13dd5509",
          989: "8d82a7785f31ca9f",
        }[e] +
        ".js"
      );
    }),
    (n.miniCssF = function (e) {
      return "static/css/9858009d16bc8317.css";
    }),
    (n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (function () {
      var e = {},
        t = "_N_E:";
      n.l = function (r, c, o, f) {
        if (e[r]) e[r].push(c);
        else {
          var a, u;
          if (void 0 !== o)
            for (
              var i = document.getElementsByTagName("script"), d = 0;
              d < i.length;
              d++
            ) {
              var b = i[d];
              if (
                b.getAttribute("src") == r ||
                b.getAttribute("data-webpack") == t + o
              ) {
                a = b;
                break;
              }
            }
          a ||
            ((u = !0),
            ((a = document.createElement("script")).charset = "utf-8"),
            (a.timeout = 120),
            n.nc && a.setAttribute("nonce", n.nc),
            a.setAttribute("data-webpack", t + o),
            (a.src = n.tu(r))),
            (e[r] = [c]);
          var l = function (t, n) {
              (a.onerror = a.onload = null), clearTimeout(s);
              var c = e[r];
              if (
                (delete e[r],
                a.parentNode && a.parentNode.removeChild(a),
                c &&
                  c.forEach(function (e) {
                    return e(n);
                  }),
                t)
              )
                return t(n);
            },
            s = setTimeout(
              l.bind(null, void 0, { type: "timeout", target: a }),
              12e4
            );
          (a.onerror = l.bind(null, a.onerror)),
            (a.onload = l.bind(null, a.onload)),
            u && document.head.appendChild(a);
        }
      };
    })(),
    (n.r = function (e) {
      "undefined" !== typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (function () {
      var e;
      n.tt = function () {
        return (
          void 0 === e &&
            ((e = {
              createScriptURL: function (e) {
                return e;
              },
            }),
            "undefined" !== typeof trustedTypes &&
              trustedTypes.createPolicy &&
              (e = trustedTypes.createPolicy("nextjs#bundler", e))),
          e
        );
      };
    })(),
    (n.tu = function (e) {
      return n.tt().createScriptURL(e);
    }),
    (n.p = "/react-icons-ng/_next/"),
    (function () {
      var e = { 272: 0 };
      (n.f.j = function (t, r) {
        var c = n.o(e, t) ? e[t] : void 0;
        if (0 !== c)
          if (c) r.push(c[2]);
          else if (272 != t) {
            var o = new Promise(function (n, r) {
              c = e[t] = [n, r];
            });
            r.push((c[2] = o));
            var f = n.p + n.u(t),
              a = new Error();
            n.l(
              f,
              function (r) {
                if (n.o(e, t) && (0 !== (c = e[t]) && (e[t] = void 0), c)) {
                  var o = r && ("load" === r.type ? "missing" : r.type),
                    f = r && r.target && r.target.src;
                  (a.message =
                    "Loading chunk " + t + " failed.\n(" + o + ": " + f + ")"),
                    (a.name = "ChunkLoadError"),
                    (a.type = o),
                    (a.request = f),
                    c[1](a);
                }
              },
              "chunk-" + t,
              t
            );
          } else e[t] = 0;
      }),
        (n.O.j = function (t) {
          return 0 === e[t];
        });
      var t = function (t, r) {
          var c,
            o,
            f = r[0],
            a = r[1],
            u = r[2],
            i = 0;
          if (
            f.some(function (t) {
              return 0 !== e[t];
            })
          ) {
            for (c in a) n.o(a, c) && (n.m[c] = a[c]);
            if (u) var d = u(n);
          }
          for (t && t(r); i < f.length; i++)
            (o = f[i]), n.o(e, o) && e[o] && e[o][0](), (e[o] = 0);
          return n.O(d);
        },
        r = (self.webpackChunk_N_E = self.webpackChunk_N_E || []);
      r.forEach(t.bind(null, 0)), (r.push = t.bind(null, r.push.bind(r)));
    })();
})();
