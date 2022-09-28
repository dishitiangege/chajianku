var WB = window.WB || {};
WB.Base = {
    init: function () {
        this.backTop($("#J_backTop")), this.navTop(), $("#searchform").length && this.search($("#searchform")), $("#searchform-b").length && this.search($("#searchform-b")), $("[data-src]").length && WB.lazyLoad($("[data-src]")), $("#J_tabBox").length && WB.tabs(), $("[data-ppo-name]").length && WB.popover(), WB.Browser.isMobile ? (this.mbLoadMore(), this.mobile.mobileNav()) : this.updateContHeight(), WB.tabs($("#J_tabBoxSideBar")), $("#J_switchListModeBtns").length && $("#J_postList").length && WB.Base.listModeSwitch()
    }, mobile: {
        mobileNav: function () {
            var o;
            $("#J_btnNavMb,#J_btnSearchMb").on("click", function () {
                o = $(window).scrollTop(), $("body").addClass("display-nav-m"), WB.showMask(function (a) {
                    a.on("click", function () {
                        WB.hideMask(), $("body").removeClass("display-nav-m"), $("body,html").scrollTop(o)
                    })
                })
            }), $("#J_closeNav").on("click", function () {
                WB.hideMask(), $("body").removeClass("display-nav-m"), $("body,html").scrollTop(o)
            }), $("#J_topNavMb .nav-arrow").on("click", function () {
                $(this).toggleClass("active-submenu")
            })
        }, mainMenuActive: function () {
            $("body").toggleClass("display-nav-m")
        }
    }, scrollFixed: function () {
        var o = WB.isSmWin();
        if (!WB.Browser.isMobile && !o) {
            WB.scrollFixed($(".aside-social"));
            var a = $(".sidebar").height(), t = $(".main").height(), n = $("#J_rightWillFixedPart");
            $(".sidebar").length && a < t && n.height() < $(window).height() && WB.scrollFixed(n)
        }
    }, backTop: function (o) {
        o && o.on("click", function () {
            $("html,body").scrollTop(0)
        })
    }, search: function (o) {
        var a = o || $("#searchform"), t = a.find(".btn-search"), n = a.find(".form-control");
        n.on("focus", function () {
            a.addClass("active")
        }), n.on("blur", function () {
            "" == a.val() && a.removeClass("active")
        }), t.on("click", function () {
            "" != n.val() ? a.submit() : (n.focus(), n.attr("placeholder", "请输入关键字"))
        })
    }, mbLoadMore: function () {
        var o = $("#J_postList"), a = !1, t = 1, n = $(".pagination"), i = n.eq(0).find(".next"),
            e = i.length ? i.attr("href") : null;
        $("#J_loadMoreBtn").on("click", function () {
            if (!e) return !1;
            a = !0, $(".loading-bar").show(), $.get(e, function (l) {
                var s;
                t++, s = $(l).find("#J_postList .post"), o.append(s), n.html($(l).find(".pagination").html()), WB.lazyLoad($("[data-src]")), i = $(l).find(".pagination .next"), e = i.length ? i.attr("href") : null, a = !1, $(".loading-bar").hide(), e || $("#J_loadMoreBtn").hide()
            })
        })
    }, updateContHeight: function () {
        var o = $(".main"), a = o.height(), t = $(".sidebar").height();
        a < t && o.css({"min-height": t})
    }, listModeSwitch: function (o, a) {
        var t = o || $("[data-mode]"), n = a || $("#J_postList"),
            i = parseInt(WB.localStorage.get("wb-list-mode")) || 1, e = i && i > 1 ? "" : "";
        n.addClass(e), t.removeClass("current"), t.eq(i - 1).addClass("current"), t.on("click", function () {
            n.removeClass(e), i = parseInt($(this).data("mode")), e = i > 1 ? "" : "", WB.localStorage.set("wb-list-mode", i), n.addClass(e), t.removeClass("current"), $(this).addClass("current")
        })
    }, listAutoLoad: function () {
        var o, a, t, n = $("#J_postList"), i = !1, e = window.autoLoadMaxPage ? window.autoLoadMaxPage : 20, l = 1,
            s = $(window).height(), d = $(".pagination"), r = d.eq(0).find(".next"),
            c = r.length ? r.attr("href") : null;
        $(window).on("scroll", function (h) {
            o = $(window).scrollTop(), t = $(".main").height(), a = o + s, r.length && l < e && !i && a > t && (i = !0, $(".loading-bar").show(), d.hide(), $.get(c, function (o) {
                var a;
                l++, a = $(o).find("#J_postList .post"), n.append(a), d.html($(o).find(".pagination").html()), r = $(o).find(".pagination .next"), c = r.length ? r.attr("href") : null, i = !1, $(".loading-bar").hide(), WB.Browser.isMobile || d.show()
            }))
        })
    }, downloadPanel: function (o) {
        var a = $(o), t = a.data("dl-url"), n = a.data("clipboard-text");
        n && new Clipboard("[data-clipboard-text]"), WB.Base.popoverDownloadPanel(a, t, n)
    }, popoverDownloadPanel: function (o, a, t, n) {
        var i = n || $("#J_ppoDownload");
        i.find(".dl-psw").text(t), i.find(".wb-btn").attr("href", a), WB.popover(o)
    }, navTop: function (o, a) {
        var t, n, i = o || $("#J_topNav"), e = a || 6, l = "";
        if ((t = i.children("li").length) <= e) return !1;
        n = i.children("li");
        for (var s = e; s < t; s++) l += "<li>" + n.eq(s).html() + "</li>";
        i.append('<li class="more-items"><a><em></em><em></em><em></em></a><div class="sub-menu lv-0" id="J_moreItemsWp"></div></li>'), $("#J_moreItemsWp").append(l)
    }
}, $(function () {
    WB.Base.init(), WB.Base.downloadPanel("[data-dl-url]"), void 0 != window.autoLoadMaxPage && !WB.Browser.isMobile && WB.Base.listAutoLoad(), $(window).on("scroll", function (o) {
        var a = $(window).scrollTop();
        WB.lazyLoad($("[data-src]")), a > 100 ? $("#J_backTop").fadeIn() : $("#J_backTop").fadeOut(), $("#J_downloadBar") && $("#J_downloadBar")[(a > 200 ? "add" : "remove") + "Class"]("sb-active")
    })
}), document.addEventListener("touchstart", function () {
}, !1);