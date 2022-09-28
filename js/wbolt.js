window.WB = {
    smWidth: 960,
    getQueryString: function (t) {
        var o = new RegExp("(^|&)" + t + "=([^&]*)(&|$)", "i"), e = window.location.search.substr(1).match(o);
        return null !== e ? unescape(e[2]) : null
    },
    inViewport: function (t, o) {
        var e, i, a, n, s;
        return i = $(window), e = t.getBoundingClientRect(), s = o || 1, a = i.width(), n = i.height() * s, e.bottom >= 0 && e.right >= 0 && e.top <= n && e.left <= a
    },
    Browser: {
        isMobile: /mobile/i.test(navigator.userAgent),
        isAndriod: /android/i.test(navigator.userAgent),
        isiOS: /iPhone|iPad|iPod/i.test(navigator.userAgent),
        isWeiXin: /MicroMessenger/i.test(navigator.userAgent)
    },
    lazyLoad: function (t) {
        (t || $("[data-src]")).each(function () {
            var t, o = $(this), e = o.data("src"), i = o.data("srcset"), a = window._def_pic_url || null;
            o.is(":visible") && (WB.inViewport(this, 1.5) || o.hasClass("lin")) && (o.is("img") ? o.attr({
                src: e,
                srcset: i
            }) : (t = new Image, $(t).load(function () {
                o.css({"background-image": "url(" + e + ")", "background-size": "100% auto"})
            }), t.src = e), o.removeAttr("data-src"), o.removeAttr("data-srcset"), o.error(function () {
                o.attr("src", a), o.removeAttr("srcset")
            }))
        })
    },
    localStorage: {
        set: function (t, o) {
            window.localStorage && localStorage.setItem(t, o)
        }, get: function (t) {
            return localStorage.getItem(t)
        }
    },
    loadMore: function (t) {
        var o = (t = t || {}).pagination || $(".pagination"), e = t.loadMoreBox || $(".load-more-box"),
            i = t.loadMoreBtn || e.find(".btn"), a = t.listBox || $(".articles-list"), n = t.xtpl, s = t.tpl,
            r = t.data || void 0, d = e.attr("data-total"), c = 1;
        i.on("click", function () {
            c++, WB.render({
                xtpl: n, page: c, tpl: s, data: r, afterFn: function (t) {
                    if (a.append(t).append(o).append(e), WB.lazyLoad(), d <= c) return e.hide(), !1
                }
            })
        })
    },
    scrollFixed: function (t, o) {
        if (!t.length) return !1;
        var e, o = o || {}, i = t.offset().top, a = t.width(), n = o.spTop || 0, s = o.spBottom || 100,
            r = o.ntoEle || ".footer";
        t.attr("data-original-y", i);
        var d;
        $(window).on("scroll", function () {
            if (d = $(window).width(), !(WB.isMobile || d < 768)) {
                var o = $(this).scrollTop();
                if (o > i) return t.css({
                    position: "fixed",
                    width: a
                }), e = $(r).offset().top - t.height() - s, o >= e ? t.css("top", e - o) : t.css("top", n), !1;
                WB.resetScrollFixed(t)
            }
        })
    },
    resetScrollFixed: function (t) {
        t.css({position: "", width: "", top: ""})
    },
    isSmWin: function (t) {
        var o = t || this.smWidth;
        return $(window).width() < o ? 1 : 0
    },
    tabs: function (t, o) {
        var o = o || {}, e = t || $("#J_tabBox"), i = o.tabNav || e.find(".tab-nav-item,.tab-nav li"),
            a = o.tabCont || e.find(".tab-cont"), n = o.currClass || "current",
            s = o.tabEvent || WB.Browser.isMobile ? "click" : "mouseover", r = o.callBackFn, d = 0;
        i.on(s, function () {
            d = $(this).index(), i.removeClass(n).eq(d).addClass(n), a.removeClass(n).eq(d).addClass(n), r && r()
        })
    },
    popover: function (t, o, e) {
        (t || $("[data-ppo-name]")).on("click", function () {
            var t = $(this).attr("data-ppo-name"), e = $(this).attr("data-ppo-mask") || !1, i = $(t),
                a = Math.round(i.width()), n = Math.round(i.height());
            i.css({width: a % 2 ? a + 1 : a, height: n % 2 ? n + 1 : n}).show(0, function () {
                $(this).addClass("wb-fadein"), o && o()
            }), e && WB.showMask()
        }), $(".com-popover").on("click", ".wb-ppo-close", function () {
            var t = $(this).parents(".com-popover");
            WB.popoverClose(t), e && e()
        })
    },
    popoverClose: function (t) {
        t.removeClass("wb-fadein").addClass("wb-fadeout"), setTimeout(function () {
            t.hide().removeClass("wb-fadeout")
        }, 300), $(".wb-mask").length && WB.hideMask()
    },
    showMask: function (t) {
        $(".wb-mask").length || $("body").append('<div class="wb-mask"></div>'), setTimeout(function () {
            $(".wb-mask").addClass("mask-active")
        }, 10), t && t($(".wb-mask"))
    },
    hideMask: function (t) {
        if (!$(".wb-mask").length) return !1;
        $(".wb-mask").removeClass("mask-active"), setTimeout(function () {
            $(".wb-mask").remove()
        }, 300), t && t()
    }
};