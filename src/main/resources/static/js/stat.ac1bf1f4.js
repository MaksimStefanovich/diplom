(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["stat"], {
    6143: function (t, s, a) {
        "use strict";
        a.r(s);
        var i = function () {
                var t = this, s = t.$createElement, a = t._self._c || s;
                return a("main", {staticClass: "Stat Wrapper"}, [t.isAuth && t.canUserSeeAllStat ? a("BaseNavbar", {
                    attrs: {
                        className: "Stat-Nav",
                        navItems: t.navItems
                    }, on: {"set-nav-value": t.selectActiveNavProp}
                }) : t._e(), !t.isAuth && t.canUserSeeAllStat ? a("div", {staticClass: "Stat-Title"}, [t._v(" Статистика по всему блогу ")]) : t._e(), t.isAuth && !t.canUserSeeAllStat ? a("div", {staticClass: "Stat-Title"}, [t._v(" Мои публикации ")]) : t._e(), t.isAuth || t.canUserSeeAllStat ? a("div", {staticClass: "Stat-Content"}, [a("div", {staticClass: "Stat-Row"}, [a("div", {staticClass: "Stat-Prop"}, [t._v(" Постов: ")]), a("div", {staticClass: "Stat-Value"}, [t._v(" " + t._s(t.postsCount) + " ")])]), a("div", {staticClass: "Stat-Row"}, [a("div", {staticClass: "Stat-Prop"}, [t._v(" Лайков: ")]), a("div", {staticClass: "Stat-Value"}, [t._v(" " + t._s(t.likesCount) + " ")])]), a("div", {staticClass: "Stat-Row"}, [a("div", {staticClass: "Stat-Prop"}, [t._v(" Дизлайков: ")]), a("div", {staticClass: "Stat-Value"}, [t._v(" " + t._s(t.dislikesCount) + " ")])]), a("div", {staticClass: "Stat-Row"}, [a("div", {staticClass: "Stat-Prop"}, [t._v(" Просмотров ")]), a("div", {staticClass: "Stat-Value"}, [t._v(" " + t._s(t.viewsCount) + " ")])]), a("div", {staticClass: "Stat-Row"}, [a("div", {staticClass: "Stat-Prop"}, [t._v(" Первая публикация: ")]), a("div", {staticClass: "Stat-Value"}, [t._v(" " + t._s(t._f("formatRelTime")(t.firstPublication)) + " ")])])]) : t._e(), t.isAuth || t.settings.STATISTICS_IS_PUBLIC ? t._e() : a("div", {staticClass: "ServerInfo Stat-Info"}, [t._v(" Извините, публичная статистика этого сайта недоступна. ")])], 1)
            }, e = [], n = (a("99af"), a("d3b7"), a("5530")), o = a("bc3a"), l = a.n(o), c = a("8c89"), u = a("2f62"),
            r = function () {
                return a.e("baseNavbar").then(a.bind(null, "c8ce"))
            }, v = {
                name: "Stat",
                components: {BaseNavbar: r},
                data: function () {
                    return {
                        navItems: [{name: "По всему блогу", value: "all"}, {name: "Моя", value: "my"}],
                        activeNavProp: 0,
                        isLoading: !0,
                        isErrored: !1,
                        postsCount: 0,
                        likesCount: 0,
                        dislikesCount: 0,
                        viewsCount: 0,
                        firstPublication: null,
                        errors: []
                    }
                },
                computed: Object(n["a"])({}, Object(u["mapGetters"])(["isAuth", "settings", "blogInfo", "user"]), {
                    canUserSeeAllStat: function () {
                        return this.user.moderation || this.settings.STATISTICS_IS_PUBLIC
                    }
                }),
                watch: {
                    activeNavProp: function () {
                        this.getStats()
                    }
                },
                methods: {
                    selectActiveNavProp: function (t) {
                        this.activeNavProp = t
                    }, getStats: function () {
                        var t, s = this;
                        if (this.isAuth && this.canUserSeeAllStat) t = this.navItems[this.activeNavProp].value; else if (this.isAuth) t = "my"; else {
                            if (!this.canUserSeeAllStat) return;
                            t = "all"
                        }
                        l.a.get("".concat(c["a"], "/api/statistics/").concat(t)).then((function (t) {
                            401 === t.status ? s.settings.STATISTICS_IS_PUBLIC = !0 : (s.postsCount = t.data.postsCount, s.likesCount = t.data.likesCount, s.dislikesCount = t.data.dislikesCount, s.viewsCount = t.data.viewsCount, s.firstPublication = t.data.firstPublication)
                        })).catch((function (t) {
                            s.errors.push(t), s.isErrored = !0
                        })).finally((function () {
                            return s.isLoading = !1
                        }))
                    }
                },
                mounted: function () {
                    this.getStats()
                },
                metaInfo: function () {
                    return {title: this.blogInfo ? "Статистика | ".concat(this.blogInfo.title, " - ").concat(this.blogInfo.subtitle) : "Статистика"}
                }
            }, S = v, d = (a("edc8"), a("2877")), C = Object(d["a"])(S, i, e, !1, null, null, null);
        s["default"] = C.exports
    }, "614c": function (t, s, a) {
    }, edc8: function (t, s, a) {
        "use strict";
        var i = a("614c"), e = a.n(i);
        e.a
    }
}]);
//# sourceMappingURL=stat.ac1bf1f4.js.map