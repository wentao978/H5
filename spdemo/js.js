/**
 * Swiper 3.2.7
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * 
 * http://www.idangero.us/swiper/
 * 
 * Copyright 2015, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 * 
 * Licensed under MIT
 * 
 * Released on: December 7, 2015
 */! function () {
    "use strict";
 
    function e(e) {
        e.fn.swiper = function (a) {
            var r;
            return e(this).each(function () {
                var e = new t(this, a);
                r || (r = e)
            }), r
        }
    }
    var a, t = function (e, s) {
            function i() {
                return "horizontal" === T.params.direction
            }
            function n(e) {
                return Math.floor(e)
            }
            function o() {
                T.autoplayTimeoutId = setTimeout(function () {
                    T.params.loop ? (T.fixLoop(), T._slideNext()) : T.isEnd ? s.autoplayStopOnLast ? T.stopAutoplay() :
                        T._slideTo(0) : T._slideNext()
                }, T.params.autoplay)
            }
            function l(e, t) {
                var r = a(e.target);
                if (!r.is(t)) if ("string" == typeof t) r = r.parents(t);
                    else if (t.nodeType) {
                    var s;
                    return r.parents().each(function (e, a) {
                        a === t && (s = t)
                    }), s ? t : void 0
                }
                if (0 !== r.length) return r[0]
            }
            function d(e, a) {
                a = a || {};
                var t = window.MutationObserver || window.WebkitMutationObserver,
                    r = new t(function (e) {
                        e.forEach(function (e) {
                            T.onResize(!0), T.emit("onObserverUpdate", T, e)
                        })
                    });
                r.observe(e, {
                    attributes: "undefined" == typeof a.attributes ? !0 : a.attributes,
                    childList: "undefined" == typeof a.childList ? !0 : a.childList,
                    characterData: "undefined" == typeof a.characterData ? !0 : a.characterData
                }), T.observers.push(r)
            }
            function p(e) {
                e.originalEvent && (e = e.originalEvent);
                var a = e.keyCode || e.charCode;
                if (!T.params.allowSwipeToNext && (i() && 39 === a || !i() && 40 === a)) return !1;
                if (!T.params.allowSwipeToPrev && (i() && 37 === a || !i() && 38 === a)) return !1;
                if (!(e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || document.activeElement && document.activeElement
                    .nodeName && ("input" === document.activeElement.nodeName.toLowerCase() || "textarea" === document.activeElement
                    .nodeName.toLowerCase()))) {
                    if (37 === a || 39 === a || 38 === a || 40 === a) {
                        var t = !1;
                        if (T.container.parents(".swiper-slide").length > 0 && 0 === T.container.parents(
                            ".swiper-slide-active").length) return;
                        var r = {
                            left: window.pageXOffset,
                            top: window.pageYOffset
                        }, s = window.innerWidth,
                            n = window.innerHeight,
                            o = T.container.offset();
                        T.rtl && (o.left = o.left - T.container[0].scrollLeft);
                        for (var l = [[o.left, o.top], [o.left + T.width, o.top], [o.left, o.top + T.height], [o.left +
                                    T.width, o.top + T.height]], d = 0; d < l.length; d++) {
                            var p = l[d];
                            p[0] >= r.left && p[0] <= r.left + s && p[1] >= r.top && p[1] <= r.top + n && (t = !0)
                        }
                        if (!t) return
                    }
                    i() ? ((37 === a || 39 === a) && (e.preventDefault ? e.preventDefault() : e.returnValue = !1), (39 ===
                        a && !T.rtl || 37 === a && T.rtl) && T.slideNext(), (37 === a && !T.rtl || 39 === a && T.rtl) &&
                        T.slidePrev()) : ((38 === a || 40 === a) && (e.preventDefault ? e.preventDefault() : e.returnValue = !
                        1), 40 === a && T.slideNext(), 38 === a && T.slidePrev())
                }
            }
            function u(e) {
                e.originalEvent && (e = e.originalEvent);
                var a = T.mousewheel.event,
                    t = 0,
                    r = T.rtl ? -1 : 1;
                if (e.detail) t = -e.detail;
                else if ("mousewheel" === a) if (T.params.mousewheelForceToAxis) if (i()) {
                            if (!(Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY))) return;
                            t = e.wheelDeltaX * r
                        } else {
                            if (!(Math.abs(e.wheelDeltaY) > Math.abs(e.wheelDeltaX))) return;
                            t = e.wheelDeltaY
                        } else t = Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY) ? -e.wheelDeltaX * r : -e.wheelDeltaY;
                        else if ("DOMMouseScroll" === a) t = -e.detail;
                else if ("wheel" === a) if (T.params.mousewheelForceToAxis) if (i()) {
                            if (!(Math.abs(e.deltaX) > Math.abs(e.deltaY))) return;
                            t = -e.deltaX * r
                        } else {
                            if (!(Math.abs(e.deltaY) > Math.abs(e.deltaX))) return;
                            t = -e.deltaY
                        } else t = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? -e.deltaX * r : -e.deltaY;
                if (0 !== t) {
                    if (T.params.mousewheelInvert && (t = -t), T.params.freeMode) {
                        var s = T.getWrapperTranslate() + t * T.params.mousewheelSensitivity,
                            n = T.isBeginning,
                            o = T.isEnd;
                        if (s >= T.minTranslate() && (s = T.minTranslate()), s <= T.maxTranslate() && (s = T.maxTranslate()),
                            T.setWrapperTransition(0), T.setWrapperTranslate(s), T.updateProgress(), T.updateActiveIndex(), (!
                            n && T.isBeginning || !o && T.isEnd) && T.updateClasses(), T.params.freeModeSticky && (
                            clearTimeout(T.mousewheel.timeout), T.mousewheel.timeout = setTimeout(function () {
                            T.slideReset()
                        }, 300)), 0 === s || s === T.maxTranslate()) return
                    } else {
                        if ((new window.Date).getTime() - T.mousewheel.lastScrollTime > 60) if (0 > t) if (T.isEnd && !
                                    T.params.loop || T.animating) {
                                    if (T.params.mousewheelReleaseOnEdges) return !0
                                } else T.slideNext();
                                else if (T.isBeginning && !T.params.loop || T.animating) {
                            if (T.params.mousewheelReleaseOnEdges) return !0
                        } else T.slidePrev();
                        T.mousewheel.lastScrollTime = (new window.Date).getTime()
                    }
                    return T.params.autoplay && T.stopAutoplay(), e.preventDefault ? e.preventDefault() : e.returnValue = !
                        1, !1
                }
            }
            function c(e, t) {
                e = a(e);
                var r, s, n, o = T.rtl ? -1 : 1;
                r = e.attr("data-swiper-parallax") || "0", s = e.attr("data-swiper-parallax-x"), n = e.attr(
                    "data-swiper-parallax-y"), s || n ? (s = s || "0", n = n || "0") : i() ? (s = r, n = "0") : (n = r,
                    s = "0"), s = s.indexOf("%") >= 0 ? parseInt(s, 10) * t * o + "%" : s * t * o + "px", n = n.indexOf(
                    "%") >= 0 ? parseInt(n, 10) * t + "%" : n * t + "px", e.transform("translate3d(" + s + ", " + n +
                    ",0px)")
            }
            function m(e) {
                return 0 !== e.indexOf("on") && (e = e[0] !== e[0].toUpperCase() ? "on" + e[0].toUpperCase() + e.substring(
                    1) : "on" + e), e
            }
            if (!(this instanceof t)) return new t(e, s);
            var f = {
                direction: "horizontal",
                touchEventsTarget: "container",
                initialSlide: 0,
                speed: 300,
                autoplay: !1,
                autoplayDisableOnInteraction: !0,
                iOSEdgeSwipeDetection: !1,
                iOSEdgeSwipeThreshold: 20,
                freeMode: !1,
                freeModeMomentum: !0,
                freeModeMomentumRatio: 1,
                freeModeMomentumBounce: !0,
                freeModeMomentumBounceRatio: 1,
                freeModeSticky: !1,
                freeModeMinimumVelocity: .02,
                autoHeight: !1,
                setWrapperSize: !1,
                virtualTranslate: !1,
                effect: "slide",
                coverflow: {
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: !0
                },
                cube: {
                    slideShadows: !0,
                    shadow: !0,
                    shadowOffset: 20,
                    shadowScale: .94
                },
                fade: {
                    crossFade: !1
                },
                parallax: !1,
                scrollbar: null,
                scrollbarHide: !0,
                scrollbarDraggable: !1,
                scrollbarSnapOnRelease: !1,
                keyboardControl: !1,
                mousewheelControl: !1,
                mousewheelReleaseOnEdges: !1,
                mousewheelInvert: !1,
                mousewheelForceToAxis: !1,
                mousewheelSensitivity: 1,
                hashnav: !1,
                breakpoints: void 0,
                spaceBetween: 0,
                slidesPerView: 1,
                slidesPerColumn: 1,
                slidesPerColumnFill: "column",
                slidesPerGroup: 1,
                centeredSlides: !1,
                slidesOffsetBefore: 0,
                slidesOffsetAfter: 0,
                roundLengths: !1,
                touchRatio: 1,
                touchAngle: 45,
                simulateTouch: !0,
                shortSwipes: !0,
                longSwipes: !0,
                longSwipesRatio: .5,
                longSwipesMs: 300,
                followFinger: !0,
                onlyExternal: !1,
                threshold: 0,
                touchMoveStopPropagation: !0,
                pagination: null,
                paginationElement: "span",
                paginationClickable: !1,
                paginationHide: !1,
                paginationBulletRender: null,
                resistance: !0,
                resistanceRatio: .85,
                nextButton: null,
                prevButton: null,
                watchSlidesProgress: !1,
                watchSlidesVisibility: !1,
                grabCursor: !1,
                preventClicks: !0,
                preventClicksPropagation: !0,
                slideToClickedSlide: !1,
                lazyLoading: !1,
                lazyLoadingInPrevNext: !1,
                lazyLoadingOnTransitionStart: !1,
                preloadImages: !0,
                updateOnImagesReady: !0,
                loop: !1,
                loopAdditionalSlides: 0,
                loopedSlides: null,
                control: void 0,
                controlInverse: !1,
                controlBy: "slide",
                allowSwipeToPrev: !0,
                allowSwipeToNext: !0,
                swipeHandler: null,
                noSwiping: !0,
                noSwipingClass: "swiper-no-swiping",
                slideClass: "swiper-slide",
                slideActiveClass: "swiper-slide-active",
                slideVisibleClass: "swiper-slide-visible",
                slideDuplicateClass: "swiper-slide-duplicate",
                slideNextClass: "swiper-slide-next",
                slidePrevClass: "swiper-slide-prev",
                wrapperClass: "swiper-wrapper",
                bulletClass: "swiper-pagination-bullet",
                bulletActiveClass: "swiper-pagination-bullet-active",
                buttonDisabledClass: "swiper-button-disabled",
                paginationHiddenClass: "swiper-pagination-hidden",
                observer: !1,
                observeParents: !1,
                a11y: !1,
                prevSlideMessage: "Previous slide",
                nextSlideMessage: "Next slide",
                firstSlideMessage: "This is the first slide",
                lastSlideMessage: "This is the last slide",
                paginationBulletMessage: "Go to slide {{index}}",
                runCallbacksOnInit: !0
            }, h = s && s.virtualTranslate;
            s = s || {};
            var g = {};
            for (var v in s) if ("object" != typeof s[v] || (s[v].nodeType || s[v] === window || s[v] === document ||
                    "undefined" != typeof r && s[v] instanceof r || "undefined" != typeof jQuery && s[v] instanceof jQuery))
                    g[v] = s[v];
                else {
                    g[v] = {};
                    for (var w in s[v]) g[v][w] = s[v][w]
                }
            for (var y in f) if ("undefined" == typeof s[y]) s[y] = f[y];
                else if ("object" == typeof s[y]) for (var b in f[y]) "undefined" == typeof s[y][b] && (s[y][b] = f[y][
                            b]);
            var T = this;
            if (T.params = s, T.originalParams = g, T.classNames = [], "undefined" != typeof a && "undefined" != typeof r &&
                (a = r), ("undefined" != typeof a || (a = "undefined" == typeof r ? window.Dom7 || window.Zepto ||
                window.jQuery : r)) && (T.$ = a, T.currentBreakpoint = void 0, T.getActiveBreakpoint = function () {
                if (!T.params.breakpoints) return !1;
                var e, a = !1,
                    t = [];
                for (e in T.params.breakpoints) T.params.breakpoints.hasOwnProperty(e) && t.push(e);
                t.sort(function (e, a) {
                    return parseInt(e, 10) > parseInt(a, 10)
                });
                for (var r = 0; r < t.length; r++) e = t[r], e >= window.innerWidth && !a && (a = e);
                return a || "max"
            }, T.setBreakpoint = function () {
                var e = T.getActiveBreakpoint();
                if (e && T.currentBreakpoint !== e) {
                    var a = e in T.params.breakpoints ? T.params.breakpoints[e] : T.originalParams;
                    for (var t in a) T.params[t] = a[t];
                    T.currentBreakpoint = e
                }
            }, T.params.breakpoints && T.setBreakpoint(), T.container = a(e), 0 !== T.container.length)) {
                if (T.container.length > 1) return void T.container.each(function () {
                        new t(this, s)
                    });
                T.container[0].swiper = T, T.container.data("swiper", T), T.classNames.push("swiper-container-" + T.params
                    .direction), T.params.freeMode && T.classNames.push("swiper-container-free-mode"), T.support.flexbox ||
                    (T.classNames.push("swiper-container-no-flexbox"), T.params.slidesPerColumn = 1), T.params.autoHeight &&
                    T.classNames.push("swiper-container-autoheight"), (T.params.parallax || T.params.watchSlidesVisibility) &&
                    (T.params.watchSlidesProgress = !0), ["cube", "coverflow"].indexOf(T.params.effect) >= 0 && (T.support
                    .transforms3d ? (T.params.watchSlidesProgress = !0, T.classNames.push("swiper-container-3d")) : T.params
                    .effect = "slide"), "slide" !== T.params.effect && T.classNames.push("swiper-container-" + T.params
                    .effect), "cube" === T.params.effect && (T.params.resistanceRatio = 0, T.params.slidesPerView = 1,
                    T.params.slidesPerColumn = 1, T.params.slidesPerGroup = 1, T.params.centeredSlides = !1, T.params.spaceBetween =
                    0, T.params.virtualTranslate = !0, T.params.setWrapperSize = !1), "fade" === T.params.effect && (T.params
                    .slidesPerView = 1, T.params.slidesPerColumn = 1, T.params.slidesPerGroup = 1, T.params.watchSlidesProgress = !
                    0, T.params.spaceBetween = 0, "undefined" == typeof h && (T.params.virtualTranslate = !0)), T.params
                    .grabCursor && T.support.touch && (T.params.grabCursor = !1), T.wrapper = T.container.children("." +
                    T.params.wrapperClass), T.params.pagination && (T.paginationContainer = a(T.params.pagination), T.params
                    .paginationClickable && T.paginationContainer.addClass("swiper-pagination-clickable")), T.rtl = i() &&
                    ("rtl" === T.container[0].dir.toLowerCase() || "rtl" === T.container.css("direction")), T.rtl && T.classNames
                    .push("swiper-container-rtl"), T.rtl && (T.wrongRTL = "-webkit-box" === T.wrapper.css("display")),
                    T.params.slidesPerColumn > 1 && T.classNames.push("swiper-container-multirow"), T.device.android &&
                    T.classNames.push("swiper-container-android"), T.container.addClass(T.classNames.join(" ")), T.translate =
                    0, T.progress = 0, T.velocity = 0, T.lockSwipeToNext = function () {
                    T.params.allowSwipeToNext = !1
                }, T.lockSwipeToPrev = function () {
                    T.params.allowSwipeToPrev = !1
                }, T.lockSwipes = function () {
                    T.params.allowSwipeToNext = T.params.allowSwipeToPrev = !1
                }, T.unlockSwipeToNext = function () {
                    T.params.allowSwipeToNext = !0
                }, T.unlockSwipeToPrev = function () {
                    T.params.allowSwipeToPrev = !0
                }, T.unlockSwipes = function () {
                    T.params.allowSwipeToNext = T.params.allowSwipeToPrev = !0
                }, T.params.grabCursor && (T.container[0].style.cursor = "move", T.container[0].style.cursor =
                    "-webkit-grab", T.container[0].style.cursor = "-moz-grab", T.container[0].style.cursor = "grab"), T
                    .imagesToLoad = [], T.imagesLoaded = 0, T.loadImage = function (e, a, t, r, s) {
                    function i() {
                        s && s()
                    }
                    var n;
                    e.complete && r ? i() : a ? (n = new window.Image, n.onload = i, n.onerror = i, t && (n.srcset = t),
                        a && (n.src = a)) : i()
                }, T.preloadImages = function () {
                    function e() {
                        "undefined" != typeof T && null !== T && (void 0 !== T.imagesLoaded && T.imagesLoaded++, T.imagesLoaded ===
                            T.imagesToLoad.length && (T.params.updateOnImagesReady && T.update(), T.emit(
                            "onImagesReady", T)))
                    }
                    T.imagesToLoad = T.container.find("img");
                    for (var a = 0; a < T.imagesToLoad.length; a++) T.loadImage(T.imagesToLoad[a], T.imagesToLoad[a].currentSrc ||
                            T.imagesToLoad[a].getAttribute("src"), T.imagesToLoad[a].srcset || T.imagesToLoad[a].getAttribute(
                            "srcset"), !0, e)
                }, T.autoplayTimeoutId = void 0, T.autoplaying = !1, T.autoplayPaused = !1, T.startAutoplay = function () {
                    return "undefined" != typeof T.autoplayTimeoutId ? !1 : T.params.autoplay ? T.autoplaying ? !1 : (T
                        .autoplaying = !0, T.emit("onAutoplayStart", T), void o()) : !1
                }, T.stopAutoplay = function (e) {
                    T.autoplayTimeoutId && (T.autoplayTimeoutId && clearTimeout(T.autoplayTimeoutId), T.autoplaying = !
                        1, T.autoplayTimeoutId = void 0, T.emit("onAutoplayStop", T))
                }, T.pauseAutoplay = function (e) {
                    T.autoplayPaused || (T.autoplayTimeoutId && clearTimeout(T.autoplayTimeoutId), T.autoplayPaused = !
                        0, 0 === e ? (T.autoplayPaused = !1, o()) : T.wrapper.transitionEnd(function () {
                        T && (T.autoplayPaused = !1, T.autoplaying ? o() : T.stopAutoplay())
                    }))
                }, T.minTranslate = function () {
                    return -T.snapGrid[0]
                }, T.maxTranslate = function () {
                    return -T.snapGrid[T.snapGrid.length - 1]
                }, T.updateAutoHeight = function () {
                    var e = T.slides.eq(T.activeIndex)[0].offsetHeight;
                    e && T.wrapper.css("height", T.slides.eq(T.activeIndex)[0].offsetHeight + "px")
                }, T.updateContainerSize = function () {
                    var e, a;
                    e = "undefined" != typeof T.params.width ? T.params.width : T.container[0].clientWidth, a =
                        "undefined" != typeof T.params.height ? T.params.height : T.container[0].clientHeight, 0 === e &&
                        i() || 0 === a && !i() || (e = e - parseInt(T.container.css("padding-left"), 10) - parseInt(T.container
                        .css("padding-right"), 10), a = a - parseInt(T.container.css("padding-top"), 10) - parseInt(T.container
                        .css("padding-bottom"), 10), T.width = e, T.height = a, T.size = i() ? T.width : T.height)
                }, T.updateSlidesSize = function () {
                    T.slides = T.wrapper.children("." + T.params.slideClass), T.snapGrid = [], T.slidesGrid = [], T.slidesSizesGrid = [];
                    var e, a = T.params.spaceBetween,
                        t = -T.params.slidesOffsetBefore,
                        r = 0,
                        s = 0;
                    "string" == typeof a && a.indexOf("%") >= 0 && (a = parseFloat(a.replace("%", "")) / 100 * T.size),
                        T.virtualSize = -a, T.rtl ? T.slides.css({
                        marginLeft: "",
                        marginTop: ""
                    }) : T.slides.css({
                        marginRight: "",
                        marginBottom: ""
                    });
                    var o;
                    T.params.slidesPerColumn > 1 && (o = Math.floor(T.slides.length / T.params.slidesPerColumn) === T.slides
                        .length / T.params.slidesPerColumn ? T.slides.length : Math.ceil(T.slides.length / T.params.slidesPerColumn) *
                        T.params.slidesPerColumn, "auto" !== T.params.slidesPerView && "row" === T.params.slidesPerColumnFill &&
                        (o = Math.max(o, T.params.slidesPerView * T.params.slidesPerColumn)));
                    var l, d = T.params.slidesPerColumn,
                        p = o / d,
                        u = p - (T.params.slidesPerColumn * p - T.slides.length);
                    for (e = 0; e < T.slides.length; e++) {
                        l = 0;
                        var c = T.slides.eq(e);
                        if (T.params.slidesPerColumn > 1) {
                            var m, f, h;
                            "column" === T.params.slidesPerColumnFill ? (f = Math.floor(e / d), h = e - f * d, (f > u ||
                                f === u && h === d - 1) && ++h >= d && (h = 0, f++), m = f + h * o / d, c.css({
                                "-webkit-box-ordinal-group": m,
                                "-moz-box-ordinal-group": m,
                                "-ms-flex-order": m,
                                "-webkit-order": m,
                                order: m
                            })) : (h = Math.floor(e / p), f = e - h * p), c.css({
                                "margin-top": 0 !== h && T.params.spaceBetween && T.params.spaceBetween + "px"
                            }).attr("data-swiper-column", f).attr("data-swiper-row", h)
                        }
                        "none" !== c.css("display") && ("auto" === T.params.slidesPerView ? (l = i() ? c.outerWidth(!0) :
                            c.outerHeight(!0), T.params.roundLengths && (l = n(l))) : (l = (T.size - (T.params.slidesPerView -
                            1) * a) / T.params.slidesPerView, T.params.roundLengths && (l = n(l)), i() ? T.slides[e].style
                            .width = l + "px" : T.slides[e].style.height = l + "px"), T.slides[e].swiperSlideSize = l,
                            T.slidesSizesGrid.push(l), T.params.centeredSlides ? (t = t + l / 2 + r / 2 + a, 0 === e &&
                            (t = t - T.size / 2 - a), Math.abs(t) < .001 && (t = 0), s % T.params.slidesPerGroup === 0 &&
                            T.snapGrid.push(t), T.slidesGrid.push(t)) : (s % T.params.slidesPerGroup === 0 && T.snapGrid
                            .push(t), T.slidesGrid.push(t), t = t + l + a), T.virtualSize += l + a, r = l, s++)
                    }
                    T.virtualSize = Math.max(T.virtualSize, T.size) + T.params.slidesOffsetAfter;
                    var g;
                    if (T.rtl && T.wrongRTL && ("slide" === T.params.effect || "coverflow" === T.params.effect) && T.wrapper
                        .css({
                        width: T.virtualSize + T.params.spaceBetween + "px"
                    }), (!T.support.flexbox || T.params.setWrapperSize) && (i() ? T.wrapper.css({
                        width: T.virtualSize + T.params.spaceBetween + "px"
                    }) : T.wrapper.css({
                        height: T.virtualSize + T.params.spaceBetween + "px"
                    })), T.params.slidesPerColumn > 1 && (T.virtualSize = (l + T.params.spaceBetween) * o, T.virtualSize =
                        Math.ceil(T.virtualSize / T.params.slidesPerColumn) - T.params.spaceBetween, T.wrapper.css({
                        width: T.virtualSize + T.params.spaceBetween + "px"
                    }), T.params.centeredSlides)) {
                        for (g = [], e = 0; e < T.snapGrid.length; e++) T.snapGrid[e] < T.virtualSize + T.snapGrid[0] &&
                                g.push(T.snapGrid[e]);
                        T.snapGrid = g
                    }
                    if (!T.params.centeredSlides) {
                        for (g = [], e = 0; e < T.snapGrid.length; e++) T.snapGrid[e] <= T.virtualSize - T.size && g.push(
                                T.snapGrid[e]);
                        T.snapGrid = g, Math.floor(T.virtualSize - T.size) > Math.floor(T.snapGrid[T.snapGrid.length -
                            1]) && T.snapGrid.push(T.virtualSize - T.size)
                    }
                    0 === T.snapGrid.length && (T.snapGrid = [0]), 0 !== T.params.spaceBetween && (i() ? T.rtl ? T.slides
                        .css({
                        marginLeft: a + "px"
                    }) : T.slides.css({
                        marginRight: a + "px"
                    }) : T.slides.css({
                        marginBottom: a + "px"
                    })), T.params.watchSlidesProgress && T.updateSlidesOffset()
                }, T.updateSlidesOffset = function () {
                    for (var e = 0; e < T.slides.length; e++) T.slides[e].swiperSlideOffset = i() ? T.slides[e].offsetLeft :
                            T.slides[e].offsetTop
                }, T.updateSlidesProgress = function (e) {
                    if ("undefined" == typeof e && (e = T.translate || 0), 0 !== T.slides.length) {
                        "undefined" == typeof T.slides[0].swiperSlideOffset && T.updateSlidesOffset();
                        var a = -e;
                        T.rtl && (a = e), T.slides.removeClass(T.params.slideVisibleClass);
                        for (var t = 0; t < T.slides.length; t++) {
                            var r = T.slides[t],
                                s = (a - r.swiperSlideOffset) / (r.swiperSlideSize + T.params.spaceBetween);
                            if (T.params.watchSlidesVisibility) {
                                var i = -(a - r.swiperSlideOffset),
                                    n = i + T.slidesSizesGrid[t],
                                    o = i >= 0 && i < T.size || n > 0 && n <= T.size || 0 >= i && n >= T.size;
                                o && T.slides.eq(t).addClass(T.params.slideVisibleClass)
                            }
                            r.progress = T.rtl ? -s : s
                        }
                    }
                }, T.updateProgress = function (e) {
                    "undefined" == typeof e && (e = T.translate || 0);
                    var a = T.maxTranslate() - T.minTranslate(),
                        t = T.isBeginning,
                        r = T.isEnd;
                    0 === a ? (T.progress = 0, T.isBeginning = T.isEnd = !0) : (T.progress = (e - T.minTranslate()) / a,
                        T.isBeginning = T.progress <= 0, T.isEnd = T.progress >= 1), T.isBeginning && !t && T.emit(
                        "onReachBeginning", T), T.isEnd && !r && T.emit("onReachEnd", T), T.params.watchSlidesProgress &&
                        T.updateSlidesProgress(e), T.emit("onProgress", T, T.progress)
                }, T.updateActiveIndex = function () {
                    var e, a, t, r = T.rtl ? T.translate : -T.translate;
                    for (a = 0; a < T.slidesGrid.length; a++) "undefined" != typeof T.slidesGrid[a + 1] ? r >= T.slidesGrid[
                            a] && r < T.slidesGrid[a + 1] - (T.slidesGrid[a + 1] - T.slidesGrid[a]) / 2 ? e = a : r >=
                            T.slidesGrid[a] && r < T.slidesGrid[a + 1] && (e = a + 1) : r >= T.slidesGrid[a] && (e = a);
                    (0 > e || "undefined" == typeof e) && (e = 0), t = Math.floor(e / T.params.slidesPerGroup), t >= T.snapGrid
                        .length && (t = T.snapGrid.length - 1), e !== T.activeIndex && (T.snapIndex = t, T.previousIndex =
                        T.activeIndex, T.activeIndex = e, T.updateClasses())
                }, T.updateClasses = function () {
                    T.slides.removeClass(T.params.slideActiveClass + " " + T.params.slideNextClass + " " + T.params.slidePrevClass);
                    var e = T.slides.eq(T.activeIndex);
                    if (e.addClass(T.params.slideActiveClass), e.next("." + T.params.slideClass).addClass(T.params.slideNextClass),
                        e.prev("." + T.params.slideClass).addClass(T.params.slidePrevClass), T.bullets && T.bullets.length >
                        0) {
                        T.bullets.removeClass(T.params.bulletActiveClass);
                        var t;
                        T.params.loop ? (t = Math.ceil(T.activeIndex - T.loopedSlides) / T.params.slidesPerGroup, t > T
                            .slides.length - 1 - 2 * T.loopedSlides && (t -= T.slides.length - 2 * T.loopedSlides), t >
                            T.bullets.length - 1 && (t -= T.bullets.length)) : t = "undefined" != typeof T.snapIndex ?
                            T.snapIndex : T.activeIndex || 0, T.paginationContainer.length > 1 ? T.bullets.each(function () {
                            a(this).index() === t && a(this).addClass(T.params.bulletActiveClass)
                        }) : T.bullets.eq(t).addClass(T.params.bulletActiveClass)
                    }
                    T.params.loop || (T.params.prevButton && (T.isBeginning ? (a(T.params.prevButton).addClass(T.params
                        .buttonDisabledClass), T.params.a11y && T.a11y && T.a11y.disable(a(T.params.prevButton))) : (a(
                        T.params.prevButton).removeClass(T.params.buttonDisabledClass), T.params.a11y && T.a11y && T.a11y
                        .enable(a(T.params.prevButton)))), T.params.nextButton && (T.isEnd ? (a(T.params.nextButton).addClass(
                        T.params.buttonDisabledClass), T.params.a11y && T.a11y && T.a11y.disable(a(T.params.nextButton))) :
                        (a(T.params.nextButton).removeClass(T.params.buttonDisabledClass), T.params.a11y && T.a11y && T
                        .a11y.enable(a(T.params.nextButton)))))
                }, T.updatePagination = function () {
                    if (T.params.pagination && T.paginationContainer && T.paginationContainer.length > 0) {
                        for (var e = "", a = T.params.loop ? Math.ceil((T.slides.length - 2 * T.loopedSlides) / T.params
                                .slidesPerGroup) : T.snapGrid.length, t = 0; a > t; t++) e += T.params.paginationBulletRender ?
                                T.params.paginationBulletRender(t, T.params.bulletClass) : "<" + T.params.paginationElement +
                                ' class="' + T.params.bulletClass + '"></' + T.params.paginationElement + ">";
                        T.paginationContainer.html(e), T.bullets = T.paginationContainer.find("." + T.params.bulletClass),
                            T.params.paginationClickable && T.params.a11y && T.a11y && T.a11y.initPagination()
                    }
                }, T.update = function (e) {
                    function a() {
                        r = Math.min(Math.max(T.translate, T.maxTranslate()), T.minTranslate()), T.setWrapperTranslate(
                            r), T.updateActiveIndex(), T.updateClasses()
                    }
                    if (T.updateContainerSize(), T.updateSlidesSize(), T.updateProgress(), T.updatePagination(), T.updateClasses(),
                        T.params.scrollbar && T.scrollbar && T.scrollbar.set(), e) {
                        var t, r;
                        T.controller && T.controller.spline && (T.controller.spline = void 0), T.params.freeMode ? (a(),
                            T.params.autoHeight && T.updateAutoHeight()) : (t = ("auto" === T.params.slidesPerView || T
                            .params.slidesPerView > 1) && T.isEnd && !T.params.centeredSlides ? T.slideTo(T.slides.length -
                            1, 0, !1, !0) : T.slideTo(T.activeIndex, 0, !1, !0), t || a())
                    } else T.params.autoHeight && T.updateAutoHeight()
                }, T.onResize = function (e) {
                    T.params.breakpoints && T.setBreakpoint();
                    var a = T.params.allowSwipeToPrev,
                        t = T.params.allowSwipeToNext;
                    if (T.params.allowSwipeToPrev = T.params.allowSwipeToNext = !0, T.updateContainerSize(), T.updateSlidesSize(), (
                        "auto" === T.params.slidesPerView || T.params.freeMode || e) && T.updatePagination(), T.params.scrollbar &&
                        T.scrollbar && T.scrollbar.set(), T.controller && T.controller.spline && (T.controller.spline =
                        void 0), T.params.freeMode) {
                        var r = Math.min(Math.max(T.translate, T.maxTranslate()), T.minTranslate());
                        T.setWrapperTranslate(r), T.updateActiveIndex(), T.updateClasses(), T.params.autoHeight && T.updateAutoHeight()
                    } else T.updateClasses(), ("auto" === T.params.slidesPerView || T.params.slidesPerView > 1) && T.isEnd && !
                            T.params.centeredSlides ? T.slideTo(T.slides.length - 1, 0, !1, !0) : T.slideTo(T.activeIndex,
                            0, !1, !0);
                    T.params.allowSwipeToPrev = a, T.params.allowSwipeToNext = t
                };
                var x = ["mousedown", "mousemove", "mouseup"];
                window.navigator.pointerEnabled ? x = ["pointerdown", "pointermove", "pointerup"] : window.navigator.msPointerEnabled &&
                    (x = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]), T.touchEvents = {
                    start: T.support.touch || !T.params.simulateTouch ? "touchstart" : x[0],
                    move: T.support.touch || !T.params.simulateTouch ? "touchmove" : x[1],
                    end: T.support.touch || !T.params.simulateTouch ? "touchend" : x[2]
                }, (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && ("container" === T.params.touchEventsTarget ?
                    T.container : T.wrapper).addClass("swiper-wp8-" + T.params.direction), T.initEvents = function (e) {
                    var t = e ? "off" : "on",
                        r = e ? "removeEventListener" : "addEventListener",
                        i = "container" === T.params.touchEventsTarget ? T.container[0] : T.wrapper[0],
                        n = T.support.touch ? i : document,
                        o = T.params.nested ? !0 : !1;
                    T.browser.ie ? (i[r](T.touchEvents.start, T.onTouchStart, !1), n[r](T.touchEvents.move, T.onTouchMove,
                        o), n[r](T.touchEvents.end, T.onTouchEnd, !1)) : (T.support.touch && (i[r](T.touchEvents.start,
                        T.onTouchStart, !1), i[r](T.touchEvents.move, T.onTouchMove, o), i[r](T.touchEvents.end, T.onTouchEnd, !
                        1)), !s.simulateTouch || T.device.ios || T.device.android || (i[r]("mousedown", T.onTouchStart, !
                        1), document[r]("mousemove", T.onTouchMove, o), document[r]("mouseup", T.onTouchEnd, !1))),
                        window[r]("resize", T.onResize), T.params.nextButton && (a(T.params.nextButton)[t]("click", T.onClickNext),
                        T.params.a11y && T.a11y && a(T.params.nextButton)[t]("keydown", T.a11y.onEnterKey)), T.params.prevButton &&
                        (a(T.params.prevButton)[t]("click", T.onClickPrev), T.params.a11y && T.a11y && a(T.params.prevButton)[
                        t]("keydown", T.a11y.onEnterKey)), T.params.pagination && T.params.paginationClickable && (a(T.paginationContainer)[
                        t]("click", "." + T.params.bulletClass, T.onClickIndex), T.params.a11y && T.a11y && a(T.paginationContainer)[
                        t]("keydown", "." + T.params.bulletClass, T.a11y.onEnterKey)), (T.params.preventClicks || T.params
                        .preventClicksPropagation) && i[r]("click", T.preventClicks, !0)
                }, T.attachEvents = function (e) {
                    T.initEvents()
                }, T.detachEvents = function () {
                    T.initEvents(!0)
                }, T.allowClick = !0, T.preventClicks = function (e) {
                    T.allowClick || (T.params.preventClicks && e.preventDefault(), T.params.preventClicksPropagation &&
                        T.animating && (e.stopPropagation(), e.stopImmediatePropagation()))
                }, T.onClickNext = function (e) {
                    e.preventDefault(), (!T.isEnd || T.params.loop) && T.slideNext()
                }, T.onClickPrev = function (e) {
                    e.preventDefault(), (!T.isBeginning || T.params.loop) && T.slidePrev()
                }, T.onClickIndex = function (e) {
                    e.preventDefault();
                    var t = a(this).index() * T.params.slidesPerGroup;
                    T.params.loop && (t += T.loopedSlides), T.slideTo(t)
                }, T.updateClickedSlide = function (e) {
                    var t = l(e, "." + T.params.slideClass),
                        r = !1;
                    if (t) for (var s = 0; s < T.slides.length; s++) T.slides[s] === t && (r = !0);
                    if (!t || !r) return T.clickedSlide = void 0, void(T.clickedIndex = void 0);
                    if (T.clickedSlide = t, T.clickedIndex = a(t).index(), T.params.slideToClickedSlide && void 0 !== T
                        .clickedIndex && T.clickedIndex !== T.activeIndex) {
                        var i, n = T.clickedIndex;
                        if (T.params.loop) {
                            if (T.animating) return;
                            i = a(T.clickedSlide).attr("data-swiper-slide-index"), T.params.centeredSlides ? n < T.loopedSlides -
                                T.params.slidesPerView / 2 || n > T.slides.length - T.loopedSlides + T.params.slidesPerView /
                                2 ? (T.fixLoop(), n = T.wrapper.children("." + T.params.slideClass +
                                '[data-swiper-slide-index="' + i + '"]:not(.swiper-slide-duplicate)').eq(0).index(),
                                setTimeout(function () {
                                T.slideTo(n)
                            }, 0)) : T.slideTo(n) : n > T.slides.length - T.params.slidesPerView ? (T.fixLoop(), n = T.wrapper
                                .children("." + T.params.slideClass + '[data-swiper-slide-index="' + i +
                                '"]:not(.swiper-slide-duplicate)').eq(0).index(), setTimeout(function () {
                                T.slideTo(n)
                            }, 0)) : T.slideTo(n)
                        } else T.slideTo(n)
                    }
                };
                var S, C, M, E, P, k, z, I, L, D, B = "input, select, textarea, button",
                    G = Date.now(),
                    A = [];
                T.animating = !1, T.touches = {
                    startX: 0,
                    startY: 0,
                    currentX: 0,
                    currentY: 0,
                    diff: 0
                };
                var O, N;
                if (T.onTouchStart = function (e) {
                    if (e.originalEvent && (e = e.originalEvent), O = "touchstart" === e.type, O || !("which" in e) ||
                        3 !== e.which) {
                        if (T.params.noSwiping && l(e, "." + T.params.noSwipingClass)) return void(T.allowClick = !0);
                        if (!T.params.swipeHandler || l(e, T.params.swipeHandler)) {
                            var t = T.touches.currentX = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX,
                                r = T.touches.currentY = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY;
                            if (!(T.device.ios && T.params.iOSEdgeSwipeDetection && t <= T.params.iOSEdgeSwipeThreshold)) {
                                if (S = !0, C = !1, M = !0, P = void 0, N = void 0, T.touches.startX = t, T.touches.startY =
                                    r, E = Date.now(), T.allowClick = !0, T.updateContainerSize(), T.swipeDirection =
                                    void 0, T.params.threshold > 0 && (I = !1), "touchstart" !== e.type) {
                                    var s = !0;
                                    a(e.target).is(B) && (s = !1), document.activeElement && a(document.activeElement).is(
                                        B) && document.activeElement.blur(), s && e.preventDefault()
                                }
                                T.emit("onTouchStart", T, e)
                            }
                        }
                    }
                }, T.onTouchMove = function (e) {
                    if (e.originalEvent && (e = e.originalEvent), !(O && "mousemove" === e.type || e.preventedByNestedSwiper)) {
                        if (T.params.onlyExternal) return T.allowClick = !1, void(S && (T.touches.startX = T.touches.currentX =
                                "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, T.touches.startY = T.touches
                                .currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, E = Date.now()));
                        if (O && document.activeElement && e.target === document.activeElement && a(e.target).is(B))
                            return C = !0, void(T.allowClick = !1);
                        if (M && T.emit("onTouchMove", T, e), !(e.targetTouches && e.targetTouches.length > 1)) {
                            if (T.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, T.touches
                                .currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, "undefined" ==
                                typeof P) {
                                var t = 180 * Math.atan2(Math.abs(T.touches.currentY - T.touches.startY), Math.abs(T.touches
                                    .currentX - T.touches.startX)) / Math.PI;
                                P = i() ? t > T.params.touchAngle : 90 - t > T.params.touchAngle
                            }
                            if (P && T.emit("onTouchMoveOpposite", T, e), "undefined" == typeof N && T.browser.ieTouch &&
                                (T.touches.currentX !== T.touches.startX || T.touches.currentY !== T.touches.startY) &&
                                (N = !0), S) {
                                if (P) return void(S = !1);
                                if (N || !T.browser.ieTouch) {
                                    T.allowClick = !1, T.emit("onSliderMove", T, e), e.preventDefault(), T.params.touchMoveStopPropagation && !
                                        T.params.nested && e.stopPropagation(), C || (s.loop && T.fixLoop(), z = T.getWrapperTranslate(),
                                        T.setWrapperTransition(0), T.animating && T.wrapper.trigger(
                                        "webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"),
                                        T.params.autoplay && T.autoplaying && (T.params.autoplayDisableOnInteraction ?
                                        T.stopAutoplay() : T.pauseAutoplay()), D = !1, T.params.grabCursor && (T.container[
                                        0].style.cursor = "move", T.container[0].style.cursor = "-webkit-grabbing", T.container[
                                        0].style.cursor = "-moz-grabbin", T.container[0].style.cursor = "grabbing")), C = !
                                        0;
                                    var r = T.touches.diff = i() ? T.touches.currentX - T.touches.startX : T.touches.currentY -
                                        T.touches.startY;
                                    r *= T.params.touchRatio, T.rtl && (r = -r), T.swipeDirection = r > 0 ? "prev" :
                                        "next", k = r + z;
                                    var n = !0;
                                    if (r > 0 && k > T.minTranslate() ? (n = !1, T.params.resistance && (k = T.minTranslate() -
                                        1 + Math.pow(-T.minTranslate() + z + r, T.params.resistanceRatio))) : 0 > r &&
                                        k < T.maxTranslate() && (n = !1, T.params.resistance && (k = T.maxTranslate() +
                                        1 - Math.pow(T.maxTranslate() - z - r, T.params.resistanceRatio))), n && (e.preventedByNestedSwiper = !
                                        0), !T.params.allowSwipeToNext && "next" === T.swipeDirection && z > k && (k =
                                        z), !T.params.allowSwipeToPrev && "prev" === T.swipeDirection && k > z && (k =
                                        z), T.params.followFinger) {
                                        if (T.params.threshold > 0) {
                                            if (!(Math.abs(r) > T.params.threshold || I)) return void(k = z);
                                            if (!I) return I = !0, T.touches.startX = T.touches.currentX, T.touches.startY =
                                                    T.touches.currentY, k = z, void(T.touches.diff = i() ? T.touches.currentX -
                                                    T.touches.startX : T.touches.currentY - T.touches.startY)
                                        }(T.params.freeMode || T.params.watchSlidesProgress) && T.updateActiveIndex(),
                                            T.params.freeMode && (0 === A.length && A.push({
                                            position: T.touches[i() ? "startX" : "startY"],
                                            time: E
                                        }), A.push({
                                            position: T.touches[i() ? "currentX" : "currentY"],
                                            time: (new window.Date).getTime()
                                        })), T.updateProgress(k), T.setWrapperTranslate(k)
                                    }
                                }
                            }
                        }
                    }
                }, T.onTouchEnd = function (e) {
                    if (e.originalEvent && (e = e.originalEvent), M && T.emit("onTouchEnd", T, e), M = !1, S) {
                        T.params.grabCursor && C && S && (T.container[0].style.cursor = "move", T.container[0].style.cursor =
                            "-webkit-grab", T.container[0].style.cursor = "-moz-grab", T.container[0].style.cursor =
                            "grab");
                        var t = Date.now(),
                            r = t - E;
                        if (T.allowClick && (T.updateClickedSlide(e), T.emit("onTap", T, e), 300 > r && t - G > 300 &&
                            (L && clearTimeout(L), L = setTimeout(function () {
                            T && (T.params.paginationHide && T.paginationContainer.length > 0 && !a(e.target).hasClass(
                                T.params.bulletClass) && T.paginationContainer.toggleClass(T.params.paginationHiddenClass),
                                T.emit("onClick", T, e))
                        }, 300)), 300 > r && 300 > t - G && (L && clearTimeout(L), T.emit("onDoubleTap", T, e))), G =
                            Date.now(), setTimeout(function () {
                            T && (T.allowClick = !0)
                        }, 0), !S || !C || !T.swipeDirection || 0 === T.touches.diff || k === z) return void(S = C = !1);
                        S = C = !1;
                        var s;
                        if (s = T.params.followFinger ? T.rtl ? T.translate : -T.translate : -k, T.params.freeMode) {
                            if (s < -T.minTranslate()) return void T.slideTo(T.activeIndex);
                            if (s > -T.maxTranslate()) return void(T.slides.length < T.snapGrid.length ? T.slideTo(T.snapGrid
                                    .length - 1) : T.slideTo(T.slides.length - 1));
                            if (T.params.freeModeMomentum) {
                                if (A.length > 1) {
                                    var i = A.pop(),
                                        n = A.pop(),
                                        o = i.position - n.position,
                                        l = i.time - n.time;
                                    T.velocity = o / l, T.velocity = T.velocity / 2, Math.abs(T.velocity) < T.params.freeModeMinimumVelocity &&
                                        (T.velocity = 0), (l > 150 || (new window.Date).getTime() - i.time > 300) && (T
                                        .velocity = 0)
                                } else T.velocity = 0;
                                A.length = 0;
                                var d = 1e3 * T.params.freeModeMomentumRatio,
                                    p = T.velocity * d,
                                    u = T.translate + p;
                                T.rtl && (u = -u);
                                var c, m = !1,
                                    f = 20 * Math.abs(T.velocity) * T.params.freeModeMomentumBounceRatio;
                                if (u < T.maxTranslate()) T.params.freeModeMomentumBounce ? (u + T.maxTranslate() < -f &&
                                        (u = T.maxTranslate() - f), c = T.maxTranslate(), m = !0, D = !0) : u = T.maxTranslate();
                                else if (u > T.minTranslate()) T.params.freeModeMomentumBounce ? (u - T.minTranslate() >
                                        f && (u = T.minTranslate() + f), c = T.minTranslate(), m = !0, D = !0) : u = T.minTranslate();
                                else if (T.params.freeModeSticky) {
                                    var h, g = 0;
                                    for (g = 0; g < T.snapGrid.length; g += 1) if (T.snapGrid[g] > -u) {
                                            h = g;
                                            break
                                        }
                                    u = Math.abs(T.snapGrid[h] - u) < Math.abs(T.snapGrid[h - 1] - u) || "next" === T.swipeDirection ?
                                        T.snapGrid[h] : T.snapGrid[h - 1], T.rtl || (u = -u)
                                }
                                if (0 !== T.velocity) d = T.rtl ? Math.abs((-u - T.translate) / T.velocity) : Math.abs((
                                        u - T.translate) / T.velocity);
                                else if (T.params.freeModeSticky) return void T.slideReset();
                                T.params.freeModeMomentumBounce && m ? (T.updateProgress(c), T.setWrapperTransition(d),
                                    T.setWrapperTranslate(u), T.onTransitionStart(), T.animating = !0, T.wrapper.transitionEnd(function () {
                                    T && D && (T.emit("onMomentumBounce", T), T.setWrapperTransition(T.params.speed), T
                                        .setWrapperTranslate(c), T.wrapper.transitionEnd(function () {
                                        T && T.onTransitionEnd()
                                    }))
                                })) : T.velocity ? (T.updateProgress(u), T.setWrapperTransition(d), T.setWrapperTranslate(
                                    u), T.onTransitionStart(), T.animating || (T.animating = !0, T.wrapper.transitionEnd(function () {
                                    T && T.onTransitionEnd()
                                }))) : T.updateProgress(u), T.updateActiveIndex()
                            }
                            return void((!T.params.freeModeMomentum || r >= T.params.longSwipesMs) && (T.updateProgress(),
                                T.updateActiveIndex()))
                        }
                        var v, w = 0,
                            y = T.slidesSizesGrid[0];
                        for (v = 0; v < T.slidesGrid.length; v += T.params.slidesPerGroup) "undefined" != typeof T.slidesGrid[
                                v + T.params.slidesPerGroup] ? s >= T.slidesGrid[v] && s < T.slidesGrid[v + T.params.slidesPerGroup] &&
                                (w = v, y = T.slidesGrid[v + T.params.slidesPerGroup] - T.slidesGrid[v]) : s >= T.slidesGrid[
                                v] && (w = v, y = T.slidesGrid[T.slidesGrid.length - 1] - T.slidesGrid[T.slidesGrid.length -
                                2]);
                        var b = (s - T.slidesGrid[w]) / y;
                        if (r > T.params.longSwipesMs) {
                            if (!T.params.longSwipes) return void T.slideTo(T.activeIndex);
                            "next" === T.swipeDirection && (b >= T.params.longSwipesRatio ? T.slideTo(w + T.params.slidesPerGroup) :
                                T.slideTo(w)), "prev" === T.swipeDirection && (b > 1 - T.params.longSwipesRatio ? T.slideTo(
                                w + T.params.slidesPerGroup) : T.slideTo(w))
                        } else {
                            if (!T.params.shortSwipes) return void T.slideTo(T.activeIndex);
                            "next" === T.swipeDirection && T.slideTo(w + T.params.slidesPerGroup), "prev" === T.swipeDirection &&
                                T.slideTo(w)
                        }
                    }
                }, T._slideTo = function (e, a) {
                    return T.slideTo(e, a, !0, !0)
                }, T.slideTo = function (e, a, t, r) {
                    "undefined" == typeof t && (t = !0), "undefined" == typeof e && (e = 0), 0 > e && (e = 0), T.snapIndex =
                        Math.floor(e / T.params.slidesPerGroup), T.snapIndex >= T.snapGrid.length && (T.snapIndex = T.snapGrid
                        .length - 1);
                    var s = -T.snapGrid[T.snapIndex];
                    T.params.autoplay && T.autoplaying && (r || !T.params.autoplayDisableOnInteraction ? T.pauseAutoplay(
                        a) : T.stopAutoplay()), T.updateProgress(s);
                    for (var i = 0; i < T.slidesGrid.length; i++) - Math.floor(100 * s) >= Math.floor(100 * T.slidesGrid[
                        i]) && (e = i);
                    return !T.params.allowSwipeToNext && s < T.translate && s < T.minTranslate() ? !1 : !T.params.allowSwipeToPrev &&
                        s > T.translate && s > T.maxTranslate() && (T.activeIndex || 0) !== e ? !1 : ("undefined" ==
                        typeof a && (a = T.params.speed), T.previousIndex = T.activeIndex || 0, T.activeIndex = e, T.rtl && -
                        s === T.translate || !T.rtl && s === T.translate ? (T.params.autoHeight && T.updateAutoHeight(),
                        T.updateClasses(), "slide" !== T.params.effect && T.setWrapperTranslate(s), !1) : (T.updateClasses(),
                        T.onTransitionStart(t), 0 === a ? (T.setWrapperTranslate(s), T.setWrapperTransition(0), T.onTransitionEnd(
                        t)) : (T.setWrapperTranslate(s), T.setWrapperTransition(a), T.animating || (T.animating = !0, T
                        .wrapper.transitionEnd(function () {
                        T && T.onTransitionEnd(t)
                    }))), !0))
                }, T.onTransitionStart = function (e) {
                    "undefined" == typeof e && (e = !0), T.params.autoHeight && T.updateAutoHeight(), T.lazy && T.lazy.onTransitionStart(),
                        e && (T.emit("onTransitionStart", T), T.activeIndex !== T.previousIndex && (T.emit(
                        "onSlideChangeStart", T), T.activeIndex > T.previousIndex ? T.emit("onSlideNextStart", T) : T.emit(
                        "onSlidePrevStart", T)))
                }, T.onTransitionEnd = function (e) {
                    T.animating = !1, T.setWrapperTransition(0), "undefined" == typeof e && (e = !0), T.lazy && T.lazy.onTransitionEnd(),
                        e && (T.emit("onTransitionEnd", T), T.activeIndex !== T.previousIndex && (T.emit(
                        "onSlideChangeEnd", T), T.activeIndex > T.previousIndex ? T.emit("onSlideNextEnd", T) : T.emit(
                        "onSlidePrevEnd", T))), T.params.hashnav && T.hashnav && T.hashnav.setHash()
                }, T.slideNext = function (e, a, t) {
                    if (T.params.loop) {
                        if (T.animating) return !1;
                        T.fixLoop();
                        T.container[0].clientLeft;
                        return T.slideTo(T.activeIndex + T.params.slidesPerGroup, a, e, t)
                    }
                    return T.slideTo(T.activeIndex + T.params.slidesPerGroup, a, e, t)
                }, T._slideNext = function (e) {
                    return T.slideNext(!0, e, !0)
                }, T.slidePrev = function (e, a, t) {
                    if (T.params.loop) {
                        if (T.animating) return !1;
                        T.fixLoop();
                        T.container[0].clientLeft;
                        return T.slideTo(T.activeIndex - 1, a, e, t)
                    }
                    return T.slideTo(T.activeIndex - 1, a, e, t)
                }, T._slidePrev = function (e) {
                    return T.slidePrev(!0, e, !0)
                }, T.slideReset = function (e, a, t) {
                    return T.slideTo(T.activeIndex, a, e)
                }, T.setWrapperTransition = function (e, a) {
                    T.wrapper.transition(e), "slide" !== T.params.effect && T.effects[T.params.effect] && T.effects[T.params
                        .effect].setTransition(e), T.params.parallax && T.parallax && T.parallax.setTransition(e), T.params
                        .scrollbar && T.scrollbar && T.scrollbar.setTransition(e), T.params.control && T.controller &&
                        T.controller.setTransition(e, a), T.emit("onSetTransition", T, e)
                }, T.setWrapperTranslate = function (e, a, t) {
                    var r = 0,
                        s = 0,
                        o = 0;
                    i() ? r = T.rtl ? -e : e : s = e, T.params.roundLengths && (r = n(r), s = n(s)), T.params.virtualTranslate ||
                        (T.support.transforms3d ? T.wrapper.transform("translate3d(" + r + "px, " + s + "px, " + o +
                        "px)") : T.wrapper.transform("translate(" + r + "px, " + s + "px)")), T.translate = i() ? r : s;
                    var l, d = T.maxTranslate() - T.minTranslate();
                    l = 0 === d ? 0 : (e - T.minTranslate()) / d, l !== T.progress && T.updateProgress(e), a && T.updateActiveIndex(),
                        "slide" !== T.params.effect && T.effects[T.params.effect] && T.effects[T.params.effect].setTranslate(
                        T.translate), T.params.parallax && T.parallax && T.parallax.setTranslate(T.translate), T.params
                        .scrollbar && T.scrollbar && T.scrollbar.setTranslate(T.translate), T.params.control && T.controller &&
                        T.controller.setTranslate(T.translate, t), T.emit("onSetTranslate", T, T.translate)
                }, T.getTranslate = function (e, a) {
                    var t, r, s, i;
                    return "undefined" == typeof a && (a = "x"), T.params.virtualTranslate ? T.rtl ? -T.translate : T.translate :
                        (s = window.getComputedStyle(e, null), window.WebKitCSSMatrix ? (r = s.transform || s.webkitTransform,
                        r.split(",").length > 6 && (r = r.split(", ").map(function (e) {
                        return e.replace(",", ".")
                    }).join(", ")), i = new window.WebKitCSSMatrix("none" === r ? "" : r)) : (i = s.MozTransform || s.OTransform ||
                        s.MsTransform || s.msTransform || s.transform || s.getPropertyValue("transform").replace(
                        "translate(", "matrix(1, 0, 0, 1,"), t = i.toString().split(",")), "x" === a && (r = window.WebKitCSSMatrix ?
                        i.m41 : 16 === t.length ? parseFloat(t[12]) : parseFloat(t[4])), "y" === a && (r = window.WebKitCSSMatrix ?
                        i.m42 : 16 === t.length ? parseFloat(t[13]) : parseFloat(t[5])), T.rtl && r && (r = -r), r || 0)
                }, T.getWrapperTranslate = function (e) {
                    return "undefined" == typeof e && (e = i() ? "x" : "y"), T.getTranslate(T.wrapper[0], e)
                }, T.observers = [], T.initObservers = function () {
                    if (T.params.observeParents) for (var e = T.container.parents(), a = 0; a < e.length; a++) d(e[a]);
                    d(T.container[0], {
                        childList: !1
                    }), d(T.wrapper[0], {
                        attributes: !1
                    })
                }, T.disconnectObservers = function () {
                    for (var e = 0; e < T.observers.length; e++) T.observers[e].disconnect();
                    T.observers = []
                }, T.createLoop = function () {
                    T.wrapper.children("." + T.params.slideClass + "." + T.params.slideDuplicateClass).remove();
                    var e = T.wrapper.children("." + T.params.slideClass);
                    "auto" !== T.params.slidesPerView || T.params.loopedSlides || (T.params.loopedSlides = e.length), T
                        .loopedSlides = parseInt(T.params.loopedSlides || T.params.slidesPerView, 10), T.loopedSlides =
                        T.loopedSlides + T.params.loopAdditionalSlides, T.loopedSlides > e.length && (T.loopedSlides =
                        e.length);
                    var t, r = [],
                        s = [];
                    for (e.each(function (t, i) {
                        var n = a(this);
                        t < T.loopedSlides && s.push(i), t < e.length && t >= e.length - T.loopedSlides && r.push(i), n
                            .attr("data-swiper-slide-index", t)
                    }), t = 0; t < s.length; t++) T.wrapper.append(a(s[t].cloneNode(!0)).addClass(T.params.slideDuplicateClass));
                    for (t = r.length - 1; t >= 0; t--) T.wrapper.prepend(a(r[t].cloneNode(!0)).addClass(T.params.slideDuplicateClass))
                }, T.destroyLoop = function () {
                    T.wrapper.children("." + T.params.slideClass + "." + T.params.slideDuplicateClass).remove(), T.slides
                        .removeAttr("data-swiper-slide-index")
                }, T.fixLoop = function () {
                    var e;
                    T.activeIndex < T.loopedSlides ? (e = T.slides.length - 3 * T.loopedSlides + T.activeIndex, e += T.loopedSlides,
                        T.slideTo(e, 0, !1, !0)) : ("auto" === T.params.slidesPerView && T.activeIndex >= 2 * T.loopedSlides ||
                        T.activeIndex > T.slides.length - 2 * T.params.slidesPerView) && (e = -T.slides.length + T.activeIndex +
                        T.loopedSlides, e += T.loopedSlides, T.slideTo(e, 0, !1, !0))
                }, T.appendSlide = function (e) {
                    if (T.params.loop && T.destroyLoop(), "object" == typeof e && e.length) for (var a = 0; a < e.length; a++)
                            e[a] && T.wrapper.append(e[a]);
                    else T.wrapper.append(e);
                    T.params.loop && T.createLoop(), T.params.observer && T.support.observer || T.update(!0)
                }, T.prependSlide = function (e) {
                    T.params.loop && T.destroyLoop();
                    var a = T.activeIndex + 1;
                    if ("object" == typeof e && e.length) {
                        for (var t = 0; t < e.length; t++) e[t] && T.wrapper.prepend(e[t]);
                        a = T.activeIndex + e.length
                    } else T.wrapper.prepend(e);
                    T.params.loop && T.createLoop(), T.params.observer && T.support.observer || T.update(!0), T.slideTo(
                        a, 0, !1)
                }, T.removeSlide = function (e) {
                    T.params.loop && (T.destroyLoop(), T.slides = T.wrapper.children("." + T.params.slideClass));
                    var a, t = T.activeIndex;
                    if ("object" == typeof e && e.length) {
                        for (var r = 0; r < e.length; r++) a = e[r], T.slides[a] && T.slides.eq(a).remove(), t > a && t--;
                        t = Math.max(t, 0)
                    } else a = e, T.slides[a] && T.slides.eq(a).remove(), t > a && t--, t = Math.max(t, 0);
                    T.params.loop && T.createLoop(), T.params.observer && T.support.observer || T.update(!0), T.params.loop ?
                        T.slideTo(t + T.loopedSlides, 0, !1) : T.slideTo(t, 0, !1)
                }, T.removeAllSlides = function () {
                    for (var e = [], a = 0; a < T.slides.length; a++) e.push(a);
                    T.removeSlide(e)
                }, T.effects = {
                    fade: {
                        setTranslate: function () {
                            for (var e = 0; e < T.slides.length; e++) {
                                var a = T.slides.eq(e),
                                    t = a[0].swiperSlideOffset,
                                    r = -t;
                                T.params.virtualTranslate || (r -= T.translate);
                                var s = 0;
                                i() || (s = r, r = 0);
                                var n = T.params.fade.crossFade ? Math.max(1 - Math.abs(a[0].progress), 0) : 1 + Math.min(
                                    Math.max(a[0].progress, -1), 0);
                                a.css({
                                    opacity: n
                                }).transform("translate3d(" + r + "px, " + s + "px, 0px)")
                            }
                        },
                        setTransition: function (e) {
                            if (T.slides.transition(e), T.params.virtualTranslate && 0 !== e) {
                                var a = !1;
                                T.slides.transitionEnd(function () {
                                    if (!a && T) {
                                        a = !0, T.animating = !1;
                                        for (var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd",
                                                "MSTransitionEnd", "msTransitionEnd"], t = 0; t < e.length; t++) T.wrapper
                                                .trigger(e[t])
                                    }
                                })
                            }
                        }
                    },
                    cube: {
                        setTranslate: function () {
                            var e, t = 0;
                            T.params.cube.shadow && (i() ? (e = T.wrapper.find(".swiper-cube-shadow"), 0 === e.length &&
                                (e = a('<div class="swiper-cube-shadow"></div>'), T.wrapper.append(e)), e.css({
                                height: T.width + "px"
                            })) : (e = T.container.find(".swiper-cube-shadow"), 0 === e.length && (e = a(
                                '<div class="swiper-cube-shadow"></div>'), T.container.append(e))));
                            for (var r = 0; r < T.slides.length; r++) {
                                var s = T.slides.eq(r),
                                    n = 90 * r,
                                    o = Math.floor(n / 360);
                                T.rtl && (n = -n, o = Math.floor(-n / 360));
                                var l = Math.max(Math.min(s[0].progress, 1), -1),
                                    d = 0,
                                    p = 0,
                                    u = 0;
                                r % 4 === 0 ? (d = 4 * -o * T.size, u = 0) : (r - 1) % 4 === 0 ? (d = 0, u = 4 * -o * T
                                    .size) : (r - 2) % 4 === 0 ? (d = T.size + 4 * o * T.size, u = T.size) : (r - 3) %
                                    4 === 0 && (d = -T.size, u = 3 * T.size + 4 * T.size * o), T.rtl && (d = -d), i() ||
                                    (p = d, d = 0);
                                var c = "rotateX(" + (i() ? 0 : -n) + "deg) rotateY(" + (i() ? n : 0) +
                                    "deg) translate3d(" + d + "px, " + p + "px, " + u + "px)";
                                if (1 >= l && l > -1 && (t = 90 * r + 90 * l, T.rtl && (t = 90 * -r - 90 * l)), s.transform(
                                    c), T.params.cube.slideShadows) {
                                    var m = i() ? s.find(".swiper-slide-shadow-left") : s.find(
                                        ".swiper-slide-shadow-top"),
                                        f = i() ? s.find(".swiper-slide-shadow-right") : s.find(
                                            ".swiper-slide-shadow-bottom");
                                    0 === m.length && (m = a('<div class="swiper-slide-shadow-' + (i() ? "left" : "top") +
                                        '"></div>'), s.append(m)), 0 === f.length && (f = a(
                                        '<div class="swiper-slide-shadow-' + (i() ? "right" : "bottom") + '"></div>'),
                                        s.append(f));
                                    s[0].progress;
                                    m.length && (m[0].style.opacity = -s[0].progress), f.length && (f[0].style.opacity =
                                        s[0].progress)
                                }
                            }
                            if (T.wrapper.css({
                                "-webkit-transform-origin": "50% 50% -" + T.size / 2 + "px",
                                "-moz-transform-origin": "50% 50% -" + T.size / 2 + "px",
                                "-ms-transform-origin": "50% 50% -" + T.size / 2 + "px",
                                "transform-origin": "50% 50% -" + T.size / 2 + "px"
                            }), T.params.cube.shadow) if (i()) e.transform("translate3d(0px, " + (T.width / 2 + T.params
                                        .cube.shadowOffset) + "px, " + -T.width / 2 +
                                        "px) rotateX(90deg) rotateZ(0deg) scale(" + T.params.cube.shadowScale + ")");
                                else {
                                    var h = Math.abs(t) - 90 * Math.floor(Math.abs(t) / 90),
                                        g = 1.5 - (Math.sin(2 * h * Math.PI / 360) / 2 + Math.cos(2 * h * Math.PI / 360) /
                                            2),
                                        v = T.params.cube.shadowScale,
                                        w = T.params.cube.shadowScale / g,
                                        y = T.params.cube.shadowOffset;
                                    e.transform("scale3d(" + v + ", 1, " + w + ") translate3d(0px, " + (T.height / 2 +
                                        y) + "px, " + -T.height / 2 / w + "px) rotateX(-90deg)")
                                }
                            var b = T.isSafari || T.isUiWebView ? -T.size / 2 : 0;
                            T.wrapper.transform("translate3d(0px,0," + b + "px) rotateX(" + (i() ? 0 : t) +
                                "deg) rotateY(" + (i() ? -t : 0) + "deg)")
                        },
                        setTransition: function (e) {
                            T.slides.transition(e).find(
                                ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left")
                                .transition(e), T.params.cube.shadow && !i() && T.container.find(".swiper-cube-shadow")
                                .transition(e)
                        }
                    },
                    coverflow: {
                        setTranslate: function () {
                            for (var e = T.translate, t = i() ? -e + T.width / 2 : -e + T.height / 2, r = i() ? T.params
                                    .coverflow.rotate : -T.params.coverflow.rotate, s = T.params.coverflow.depth, n = 0,
                                    o = T.slides.length; o > n; n++) {
                                var l = T.slides.eq(n),
                                    d = T.slidesSizesGrid[n],
                                    p = l[0].swiperSlideOffset,
                                    u = (t - p - d / 2) / d * T.params.coverflow.modifier,
                                    c = i() ? r * u : 0,
                                    m = i() ? 0 : r * u,
                                    f = -s * Math.abs(u),
                                    h = i() ? 0 : T.params.coverflow.stretch * u,
                                    g = i() ? T.params.coverflow.stretch * u : 0;
                                Math.abs(g) < .001 && (g = 0), Math.abs(h) < .001 && (h = 0), Math.abs(f) < .001 && (f =
                                    0), Math.abs(c) < .001 && (c = 0), Math.abs(m) < .001 && (m = 0);
                                var v = "translate3d(" + g + "px," + h + "px," + f + "px)  rotateX(" + m +
                                    "deg) rotateY(" + c + "deg)";
                                if (l.transform(v), l[0].style.zIndex = -Math.abs(Math.round(u)) + 1, T.params.coverflow
                                    .slideShadows) {
                                    var w = i() ? l.find(".swiper-slide-shadow-left") : l.find(
                                        ".swiper-slide-shadow-top"),
                                        y = i() ? l.find(".swiper-slide-shadow-right") : l.find(
                                            ".swiper-slide-shadow-bottom");
                                    0 === w.length && (w = a('<div class="swiper-slide-shadow-' + (i() ? "left" : "top") +
                                        '"></div>'), l.append(w)), 0 === y.length && (y = a(
                                        '<div class="swiper-slide-shadow-' + (i() ? "right" : "bottom") + '"></div>'),
                                        l.append(y)), w.length && (w[0].style.opacity = u > 0 ? u : 0), y.length && (y[
                                        0].style.opacity = -u > 0 ? -u : 0)
                                }
                            }
                            if (T.browser.ie) {
                                var b = T.wrapper[0].style;
                                b.perspectiveOrigin = t + "px 50%"
                            }
                        },
                        setTransition: function (e) {
                            T.slides.transition(e).find(
                                ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left")
                                .transition(e)
                        }
                    }
                }, T.lazy = {
                    initialImageLoaded: !1,
                    loadImageInSlide: function (e, t) {
                        if ("undefined" != typeof e && ("undefined" == typeof t && (t = !0), 0 !== T.slides.length)) {
                            var r = T.slides.eq(e),
                                s = r.find(".swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)");
                            !r.hasClass("swiper-lazy") || r.hasClass("swiper-lazy-loaded") || r.hasClass(
                                "swiper-lazy-loading") || (s = s.add(r[0])), 0 !== s.length && s.each(function () {
                                var e = a(this);
                                e.addClass("swiper-lazy-loading");
                                var s = e.attr("data-background"),
                                    i = e.attr("data-src"),
                                    n = e.attr("data-srcset");
                                T.loadImage(e[0], i || s, n, !1, function () {
                                    if (s ? (e.css("background-image", "url(" + s + ")"), e.removeAttr(
                                        "data-background")) : (n && (e.attr("srcset", n), e.removeAttr("data-srcset")),
                                        i && (e.attr("src", i), e.removeAttr("data-src"))), e.addClass(
                                        "swiper-lazy-loaded").removeClass("swiper-lazy-loading"), r.find(
                                        ".swiper-lazy-preloader, .preloader").remove(), T.params.loop && t) {
                                        var a = r.attr("data-swiper-slide-index");
                                        if (r.hasClass(T.params.slideDuplicateClass)) {
                                            var o = T.wrapper.children('[data-swiper-slide-index="' + a + '"]:not(.' +
                                                T.params.slideDuplicateClass + ")");
                                            T.lazy.loadImageInSlide(o.index(), !1)
                                        } else {
                                            var l = T.wrapper.children("." + T.params.slideDuplicateClass +
                                                '[data-swiper-slide-index="' + a + '"]');
                                            T.lazy.loadImageInSlide(l.index(), !1)
                                        }
                                    }
                                    T.emit("onLazyImageReady", T, r[0], e[0])
                                }), T.emit("onLazyImageLoad", T, r[0], e[0])
                            })
                        }
                    },
                    load: function () {
                        var e;
                        if (T.params.watchSlidesVisibility) T.wrapper.children("." + T.params.slideVisibleClass).each(function () {
                                T.lazy.loadImageInSlide(a(this).index())
                            });
                        else if (T.params.slidesPerView > 1) for (e = T.activeIndex; e < T.activeIndex + T.params.slidesPerView; e++)
                                T.slides[e] && T.lazy.loadImageInSlide(e);
                        else T.lazy.loadImageInSlide(T.activeIndex); if (T.params.lazyLoadingInPrevNext) if (T.params.slidesPerView >
                                1) {
                                for (e = T.activeIndex + T.params.slidesPerView; e < T.activeIndex + T.params.slidesPerView +
                                    T.params.slidesPerView; e++) T.slides[e] && T.lazy.loadImageInSlide(e);
                                for (e = T.activeIndex - T.params.slidesPerView; e < T.activeIndex; e++) T.slides[e] &&
                                        T.lazy.loadImageInSlide(e)
                            } else {
                                var t = T.wrapper.children("." + T.params.slideNextClass);
                                t.length > 0 && T.lazy.loadImageInSlide(t.index());
                                var r = T.wrapper.children("." + T.params.slidePrevClass);
                                r.length > 0 && T.lazy.loadImageInSlide(r.index())
                            }
                    },
                    onTransitionStart: function () {
                        T.params.lazyLoading && (T.params.lazyLoadingOnTransitionStart || !T.params.lazyLoadingOnTransitionStart && !
                            T.lazy.initialImageLoaded) && T.lazy.load()
                    },
                    onTransitionEnd: function () {
                        T.params.lazyLoading && !T.params.lazyLoadingOnTransitionStart && T.lazy.load()
                    }
                }, T.scrollbar = {
                    isTouched: !1,
                    setDragPosition: function (e) {
                        var a = T.scrollbar,
                            t = i() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX ||
                                e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY :
                                e.pageY || e.clientY,
                            r = t - a.track.offset()[i() ? "left" : "top"] - a.dragSize / 2,
                            s = -T.minTranslate() * a.moveDivider,
                            n = -T.maxTranslate() * a.moveDivider;
                        s > r ? r = s : r > n && (r = n), r = -r / a.moveDivider, T.updateProgress(r), T.setWrapperTranslate(
                            r, !0)
                    },
                    dragStart: function (e) {
                        var a = T.scrollbar;
                        a.isTouched = !0, e.preventDefault(), e.stopPropagation(), a.setDragPosition(e), clearTimeout(a
                            .dragTimeout), a.track.transition(0), T.params.scrollbarHide && a.track.css("opacity", 1),
                            T.wrapper.transition(100), a.drag.transition(100), T.emit("onScrollbarDragStart", T)
                    },
                    dragMove: function (e) {
                        var a = T.scrollbar;
                        a.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, a.setDragPosition(e),
                            T.wrapper.transition(0), a.track.transition(0), a.drag.transition(0), T.emit(
                            "onScrollbarDragMove", T))
                    },
                    dragEnd: function (e) {
                        var a = T.scrollbar;
                        a.isTouched && (a.isTouched = !1, T.params.scrollbarHide && (clearTimeout(a.dragTimeout), a.dragTimeout =
                            setTimeout(function () {
                            a.track.css("opacity", 0), a.track.transition(400)
                        }, 1e3)), T.emit("onScrollbarDragEnd", T), T.params.scrollbarSnapOnRelease && T.slideReset())
                    },
                    enableDraggable: function () {
                        var e = T.scrollbar,
                            t = T.support.touch ? e.track : document;
                        a(e.track).on(T.touchEvents.start, e.dragStart), a(t).on(T.touchEvents.move, e.dragMove), a(t).on(
                            T.touchEvents.end, e.dragEnd)
                    },
                    disableDraggable: function () {
                        var e = T.scrollbar,
                            t = T.support.touch ? e.track : document;
                        a(e.track).off(T.touchEvents.start, e.dragStart), a(t).off(T.touchEvents.move, e.dragMove), a(t)
                            .off(T.touchEvents.end, e.dragEnd)
                    },
                    set: function () {
                        if (T.params.scrollbar) {
                            var e = T.scrollbar;
                            e.track = a(T.params.scrollbar), e.drag = e.track.find(".swiper-scrollbar-drag"), 0 === e.drag
                                .length && (e.drag = a('<div class="swiper-scrollbar-drag"></div>'), e.track.append(e.drag)),
                                e.drag[0].style.width = "", e.drag[0].style.height = "", e.trackSize = i() ? e.track[0]
                                .offsetWidth : e.track[0].offsetHeight, e.divider = T.size / T.virtualSize, e.moveDivider =
                                e.divider * (e.trackSize / T.size), e.dragSize = e.trackSize * e.divider, i() ? e.drag[
                                0].style.width = e.dragSize + "px" : e.drag[0].style.height = e.dragSize + "px", e.divider >=
                                1 ? e.track[0].style.display = "none" : e.track[0].style.display = "", T.params.scrollbarHide &&
                                (e.track[0].style.opacity = 0)
                        }
                    },
                    setTranslate: function () {
                        if (T.params.scrollbar) {
                            var e, a = T.scrollbar,
                                t = (T.translate || 0, a.dragSize);
                            e = (a.trackSize - a.dragSize) * T.progress, T.rtl && i() ? (e = -e, e > 0 ? (t = a.dragSize -
                                e, e = 0) : -e + a.dragSize > a.trackSize && (t = a.trackSize + e)) : 0 > e ? (t = a.dragSize +
                                e, e = 0) : e + a.dragSize > a.trackSize && (t = a.trackSize - e), i() ? (T.support.transforms3d ?
                                a.drag.transform("translate3d(" + e + "px, 0, 0)") : a.drag.transform("translateX(" + e +
                                "px)"), a.drag[0].style.width = t + "px") : (T.support.transforms3d ? a.drag.transform(
                                "translate3d(0px, " + e + "px, 0)") : a.drag.transform("translateY(" + e + "px)"), a.drag[
                                0].style.height = t + "px"), T.params.scrollbarHide && (clearTimeout(a.timeout), a.track[
                                0].style.opacity = 1, a.timeout = setTimeout(function () {
                                a.track[0].style.opacity = 0, a.track.transition(400)
                            }, 1e3))
                        }
                    },
                    setTransition: function (e) {
                        T.params.scrollbar && T.scrollbar.drag.transition(e)
                    }
                }, T.controller = {
                    LinearSpline: function (e, a) {
                        this.x = e, this.y = a, this.lastIndex = e.length - 1;
                        var t, r;
                        this.x.length;
                        this.interpolate = function (e) {
                            return e ? (r = s(this.x, e), t = r - 1, (e - this.x[t]) * (this.y[r] - this.y[t]) / (this.x[
                                r] - this.x[t]) + this.y[t]) : 0
                        };
                        var s = function () {
                            var e, a, t;
                            return function (r, s) {
                                for (a = -1, e = r.length; e - a > 1;) r[t = e + a >> 1] <= s ? a = t : e = t;
                                return e
                            }
                        }()
                    },
                    getInterpolateFunction: function (e) {
                        T.controller.spline || (T.controller.spline = T.params.loop ? new T.controller.LinearSpline(T.slidesGrid,
                            e.slidesGrid) : new T.controller.LinearSpline(T.snapGrid, e.snapGrid))
                    },
                    setTranslate: function (e, a) {
                        function r(a) {
                            e = a.rtl && "horizontal" === a.params.direction ? -T.translate : T.translate, "slide" ===
                                T.params.controlBy && (T.controller.getInterpolateFunction(a), i = -T.controller.spline
                                .interpolate(-e)), i && "container" !== T.params.controlBy || (s = (a.maxTranslate() -
                                a.minTranslate()) / (T.maxTranslate() - T.minTranslate()), i = (e - T.minTranslate()) *
                                s + a.minTranslate()), T.params.controlInverse && (i = a.maxTranslate() - i), a.updateProgress(
                                i), a.setWrapperTranslate(i, !1, T), a.updateActiveIndex()
                        }
                        var s, i, n = T.params.control;
                        if (T.isArray(n)) for (var o = 0; o < n.length; o++) n[o] !== a && n[o] instanceof t && r(n[o]);
                        else n instanceof t && a !== n && r(n)
                    },
                    setTransition: function (e, a) {
                        function r(a) {
                            a.setWrapperTransition(e, T), 0 !== e && (a.onTransitionStart(), a.wrapper.transitionEnd(function () {
                                i && (a.params.loop && "slide" === T.params.controlBy && a.fixLoop(), a.onTransitionEnd())
                            }))
                        }
                        var s, i = T.params.control;
                        if (T.isArray(i)) for (s = 0; s < i.length; s++) i[s] !== a && i[s] instanceof t && r(i[s]);
                        else i instanceof t && a !== i && r(i)
                    }
                }, T.hashnav = {
                    init: function () {
                        if (T.params.hashnav) {
                            T.hashnav.initialized = !0;
                            var e = document.location.hash.replace("#", "");
                            if (e) for (var a = 0, t = 0, r = T.slides.length; r > t; t++) {
                                    var s = T.slides.eq(t),
                                        i = s.attr("data-hash");
                                    if (i === e && !s.hasClass(T.params.slideDuplicateClass)) {
                                        var n = s.index();
                                        T.slideTo(n, a, T.params.runCallbacksOnInit, !0)
                                    }
                            }
                        }
                    },
                    setHash: function () {
                        T.hashnav.initialized && T.params.hashnav && (document.location.hash = T.slides.eq(T.activeIndex)
                            .attr("data-hash") || "")
                    }
                }, T.disableKeyboardControl = function () {
                    T.params.keyboardControl = !1, a(document).off("keydown", p)
                }, T.enableKeyboardControl = function () {
                    T.params.keyboardControl = !0, a(document).on("keydown", p)
                }, T.mousewheel = {
                    event: !1,
                    lastScrollTime: (new window.Date).getTime()
                }, T.params.mousewheelControl) {
                    try {
                        new window.WheelEvent("wheel"), T.mousewheel.event = "wheel"
                    } catch (R) {}
                    T.mousewheel.event || void 0 === document.onmousewheel || (T.mousewheel.event = "mousewheel"), T.mousewheel
                        .event || (T.mousewheel.event = "DOMMouseScroll")
                }
                T.disableMousewheelControl = function () {
                    return T.mousewheel.event ? (T.container.off(T.mousewheel.event, u), !0) : !1
                }, T.enableMousewheelControl = function () {
                    return T.mousewheel.event ? (T.container.on(T.mousewheel.event, u), !0) : !1
                }, T.parallax = {
                    setTranslate: function () {
                        T.container.children(
                            "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
                            c(this, T.progress)
                        }), T.slides.each(function () {
                            var e = a(this);
                            e.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
                                var a = Math.min(Math.max(e[0].progress, -1), 1);
                                c(this, a)
                            })
                        })
                    },
                    setTransition: function (e) {
                        "undefined" == typeof e && (e = T.params.speed), T.container.find(
                            "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
                            var t = a(this),
                                r = parseInt(t.attr("data-swiper-parallax-duration"), 10) || e;
                            0 === e && (r = 0), t.transition(r)
                        })
                    }
                }, T._plugins = [];
                for (var W in T.plugins) {
                    var V = T.plugins[W](T, T.params[W]);
                    V && T._plugins.push(V)
                }
                return T.callPlugins = function (e) {
                    for (var a = 0; a < T._plugins.length; a++) e in T._plugins[a] && T._plugins[a][e](arguments[1],
                            arguments[2], arguments[3], arguments[4], arguments[5])
                }, T.emitterEventListeners = {}, T.emit = function (e) {
                    T.params[e] && T.params[e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                    var a;
                    if (T.emitterEventListeners[e]) for (a = 0; a < T.emitterEventListeners[e].length; a++) T.emitterEventListeners[
                                e][a](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                    T.callPlugins && T.callPlugins(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[
                        5])
                }, T.on = function (e, a) {
                    return e = m(e), T.emitterEventListeners[e] || (T.emitterEventListeners[e] = []), T.emitterEventListeners[
                        e].push(a), T
                }, T.off = function (e, a) {
                    var t;
                    if (e = m(e), "undefined" == typeof a) return T.emitterEventListeners[e] = [], T;
                    if (T.emitterEventListeners[e] && 0 !== T.emitterEventListeners[e].length) {
                        for (t = 0; t < T.emitterEventListeners[e].length; t++) T.emitterEventListeners[e][t] === a &&
                                T.emitterEventListeners[e].splice(t, 1);
                        return T
                    }
                }, T.once = function (e, a) {
                    e = m(e);
                    var t = function () {
                        a(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]), T.off(e, t)
                    };
                    return T.on(e, t), T
                }, T.a11y = {
                    makeFocusable: function (e) {
                        return e.attr("tabIndex", "0"), e
                    },
                    addRole: function (e, a) {
                        return e.attr("role", a), e
                    },
                    addLabel: function (e, a) {
                        return e.attr("aria-label", a), e
                    },
                    disable: function (e) {
                        return e.attr("aria-disabled", !0), e
                    },
                    enable: function (e) {
                        return e.attr("aria-disabled", !1), e
                    },
                    onEnterKey: function (e) {
                        13 === e.keyCode && (a(e.target).is(T.params.nextButton) ? (T.onClickNext(e), T.isEnd ? T.a11y.notify(
                            T.params.lastSlideMessage) : T.a11y.notify(T.params.nextSlideMessage)) : a(e.target).is(T.params
                            .prevButton) && (T.onClickPrev(e), T.isBeginning ? T.a11y.notify(T.params.firstSlideMessage) :
                            T.a11y.notify(T.params.prevSlideMessage)), a(e.target).is("." + T.params.bulletClass) && a(
                            e.target)[0].click())
                    },
                    liveRegion: a('<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>'),
                    notify: function (e) {
                        var a = T.a11y.liveRegion;
                        0 !== a.length && (a.html(""), a.html(e))
                    },
                    init: function () {
                        if (T.params.nextButton) {
                            var e = a(T.params.nextButton);
                            T.a11y.makeFocusable(e), T.a11y.addRole(e, "button"), T.a11y.addLabel(e, T.params.nextSlideMessage)
                        }
                        if (T.params.prevButton) {
                            var t = a(T.params.prevButton);
                            T.a11y.makeFocusable(t), T.a11y.addRole(t, "button"), T.a11y.addLabel(t, T.params.prevSlideMessage)
                        }
                        a(T.container).append(T.a11y.liveRegion)
                    },
                    initPagination: function () {
                        T.params.pagination && T.params.paginationClickable && T.bullets && T.bullets.length && T.bullets
                            .each(function () {
                            var e = a(this);
                            T.a11y.makeFocusable(e), T.a11y.addRole(e, "button"), T.a11y.addLabel(e, T.params.paginationBulletMessage
                                .replace(/{{index}}/, e.index() + 1))
                        })
                    },
                    destroy: function () {
                        T.a11y.liveRegion && T.a11y.liveRegion.length > 0 && T.a11y.liveRegion.remove()
                    }
                }, T.init = function () {
                    T.params.loop && T.createLoop(), T.updateContainerSize(), T.updateSlidesSize(), T.updatePagination(),
                        T.params.scrollbar && T.scrollbar && (T.scrollbar.set(), T.params.scrollbarDraggable && T.scrollbar
                        .enableDraggable()), "slide" !== T.params.effect && T.effects[T.params.effect] && (T.params.loop ||
                        T.updateProgress(), T.effects[T.params.effect].setTranslate()), T.params.loop ? T.slideTo(T.params
                        .initialSlide + T.loopedSlides, 0, T.params.runCallbacksOnInit) : (T.slideTo(T.params.initialSlide,
                        0, T.params.runCallbacksOnInit), 0 === T.params.initialSlide && (T.parallax && T.params.parallax &&
                        T.parallax.setTranslate(), T.lazy && T.params.lazyLoading && (T.lazy.load(), T.lazy.initialImageLoaded = !
                        0))), T.attachEvents(), T.params.observer && T.support.observer && T.initObservers(), T.params.preloadImages && !
                        T.params.lazyLoading && T.preloadImages(), T.params.autoplay && T.startAutoplay(), T.params.keyboardControl &&
                        T.enableKeyboardControl && T.enableKeyboardControl(), T.params.mousewheelControl && T.enableMousewheelControl &&
                        T.enableMousewheelControl(), T.params.hashnav && T.hashnav && T.hashnav.init(), T.params.a11y &&
                        T.a11y && T.a11y.init(), T.emit("onInit", T)
                }, T.cleanupStyles = function () {
                    T.container.removeClass(T.classNames.join(" ")).removeAttr("style"), T.wrapper.removeAttr("style"),
                        T.slides && T.slides.length && T.slides.removeClass([T.params.slideVisibleClass, T.params.slideActiveClass,
                            T.params.slideNextClass, T.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr(
                        "data-swiper-column").removeAttr("data-swiper-row"), T.paginationContainer && T.paginationContainer
                        .length && T.paginationContainer.removeClass(T.params.paginationHiddenClass), T.bullets && T.bullets
                        .length && T.bullets.removeClass(T.params.bulletActiveClass), T.params.prevButton && a(T.params
                        .prevButton).removeClass(T.params.buttonDisabledClass), T.params.nextButton && a(T.params.nextButton)
                        .removeClass(T.params.buttonDisabledClass), T.params.scrollbar && T.scrollbar && (T.scrollbar.track &&
                        T.scrollbar.track.length && T.scrollbar.track.removeAttr("style"), T.scrollbar.drag && T.scrollbar
                        .drag.length && T.scrollbar.drag.removeAttr("style"))
                }, T.destroy = function (e, a) {
                    T.detachEvents(), T.stopAutoplay(), T.params.scrollbar && T.scrollbar && T.params.scrollbarDraggable &&
                        T.scrollbar.disableDraggable(), T.params.loop && T.destroyLoop(), a && T.cleanupStyles(), T.disconnectObservers(),
                        T.params.keyboardControl && T.disableKeyboardControl && T.disableKeyboardControl(), T.params.mousewheelControl &&
                        T.disableMousewheelControl && T.disableMousewheelControl(), T.params.a11y && T.a11y && T.a11y.destroy(),
                        T.emit("onDestroy"), e !== !1 && (T = null)
                }, T.init(), T
            }
        };
    t.prototype = {
        isSafari: function () {
            var e = navigator.userAgent.toLowerCase();
            return e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0
        }(),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),
        isArray: function (e) {
            return "[object Array]" === Object.prototype.toString.apply(e)
        },
        browser: {
            ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
            ieTouch: window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1 || window.navigator.pointerEnabled && window
                .navigator.maxTouchPoints > 1
        },
        device: function () {
            var e = navigator.userAgent,
                a = e.match(/(Android);?[\s\/]+([\d.]+)?/),
                t = e.match(/(iPad).*OS\s([\d_]+)/),
                r = e.match(/(iPod)(.*OS\s([\d_]+))?/),
                s = !t && e.match(/(iPhone\sOS)\s([\d_]+)/);
            return {
                ios: t || s || r,
                android: a
            }
        }(),
        support: {
            touch: window.Modernizr && Modernizr.touch === !0 || function () {
                return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
            }(),
            transforms3d: window.Modernizr && Modernizr.csstransforms3d === !0 || function () {
                var e = document.createElement("div").style;
                return "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e ||
                    "perspective" in e
            }(),
            flexbox: function () {
                for (var e = document.createElement("div").style, a =
                        "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient"
                        .split(" "), t = 0; t < a.length; t++) if (a[t] in e) return !0
            }(),
            observer: function () {
                return "MutationObserver" in window || "WebkitMutationObserver" in window
            }()
        },
        plugins: {}
    };
    for (var r = (function () {
        var e = function (e) {
            var a = this,
                t = 0;
            for (t = 0; t < e.length; t++) a[t] = e[t];
            return a.length = e.length, this
        }, a = function (a, t) {
                var r = [],
                    s = 0;
                if (a && !t && a instanceof e) return a;
                if (a) if ("string" == typeof a) {
                        var i, n, o = a.trim();
                        if (o.indexOf("<") >= 0 && o.indexOf(">") >= 0) {
                            var l = "div";
                            for (0 === o.indexOf("<li") && (l = "ul"), 0 === o.indexOf("<tr") && (l = "tbody"), (0 ===
                                o.indexOf("<td") || 0 === o.indexOf("<th")) && (l = "tr"), 0 === o.indexOf("<tbody") &&
                                (l = "table"), 0 === o.indexOf("<option") && (l = "select"), n = document.createElement(
                                l), n.innerHTML = a, s = 0; s < n.childNodes.length; s++) r.push(n.childNodes[s])
                        } else for (i = t || "#" !== a[0] || a.match(/[ .<>:~]/) ? (t || document).querySelectorAll(a) : [
                                    document.getElementById(a.split("#")[1])], s = 0; s < i.length; s++) i[s] && r.push(
                                    i[s])
                    } else if (a.nodeType || a === window || a === document) r.push(a);
                else if (a.length > 0 && a[0].nodeType) for (s = 0; s < a.length; s++) r.push(a[s]);
                return new e(r)
            };
        return e.prototype = {
            addClass: function (e) {
                if ("undefined" == typeof e) return this;
                for (var a = e.split(" "), t = 0; t < a.length; t++) for (var r = 0; r < this.length; r++) this[r].classList
                            .add(a[t]);
                return this
            },
            removeClass: function (e) {
                for (var a = e.split(" "), t = 0; t < a.length; t++) for (var r = 0; r < this.length; r++) this[r].classList
                            .remove(a[t]);
                return this
            },
            hasClass: function (e) {
                return this[0] ? this[0].classList.contains(e) : !1
            },
            toggleClass: function (e) {
                for (var a = e.split(" "), t = 0; t < a.length; t++) for (var r = 0; r < this.length; r++) this[r].classList
                            .toggle(a[t]);
                return this
            },
            attr: function (e, a) {
                if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;
                for (var t = 0; t < this.length; t++) if (2 === arguments.length) this[t].setAttribute(e, a);
                    else for (var r in e) this[t][r] = e[r], this[t].setAttribute(r, e[r]);
                return this
            },
            removeAttr: function (e) {
                for (var a = 0; a < this.length; a++) this[a].removeAttribute(e);
                return this
            },
            data: function (e, a) {
                if ("undefined" != typeof a) {
                    for (var t = 0; t < this.length; t++) {
                        var r = this[t];
                        r.dom7ElementDataStorage || (r.dom7ElementDataStorage = {}), r.dom7ElementDataStorage[e] = a
                    }
                    return this
                }
                if (this[0]) {
                    var s = this[0].getAttribute("data-" + e);
                    return s ? s : this[0].dom7ElementDataStorage && e in this[0].dom7ElementDataStorage ? this[0].dom7ElementDataStorage[
                        e] : void 0
                }
            },
            transform: function (e) {
                for (var a = 0; a < this.length; a++) {
                    var t = this[a].style;
                    t.webkitTransform = t.MsTransform = t.msTransform = t.MozTransform = t.OTransform = t.transform = e
                }
                return this
            },
            transition: function (e) {
                "string" != typeof e && (e += "ms");
                for (var a = 0; a < this.length; a++) {
                    var t = this[a].style;
                    t.webkitTransitionDuration = t.MsTransitionDuration = t.msTransitionDuration = t.MozTransitionDuration =
                        t.OTransitionDuration = t.transitionDuration = e
                }
                return this
            },
            on: function (e, t, r, s) {
                function i(e) {
                    var s = e.target;
                    if (a(s).is(t)) r.call(s, e);
                    else for (var i = a(s).parents(), n = 0; n < i.length; n++) a(i[n]).is(t) && r.call(i[n], e)
                }
                var n, o, l = e.split(" ");
                for (n = 0; n < this.length; n++) if ("function" == typeof t || t === !1) for ("function" == typeof t &&
                            (r = arguments[1], s = arguments[2] || !1), o = 0; o < l.length; o++) this[n].addEventListener(
                                l[o], r, s);
                    else for (o = 0; o < l.length; o++) this[n].dom7LiveListeners || (this[n].dom7LiveListeners = []),
                                this[n].dom7LiveListeners.push({
                                listener: r,
                                liveListener: i
                            }), this[n].addEventListener(l[o], i, s);
                return this
            },
            off: function (e, a, t, r) {
                for (var s = e.split(" "), i = 0; i < s.length; i++) for (var n = 0; n < this.length; n++) if (
                            "function" == typeof a || a === !1) "function" == typeof a && (t = arguments[1],
                                r = arguments[2] || !1), this[n].removeEventListener(s[i], t, r);
                        else if (this[n].dom7LiveListeners) for (var o = 0; o < this[n].dom7LiveListeners.length; o++)
                        this[n].dom7LiveListeners[o].listener === t && this[n].removeEventListener(s[i], this[n].dom7LiveListeners[
                            o].liveListener, r);
                return this
            },
            once: function (e, a, t, r) {
                function s(n) {
                    t(n), i.off(e, a, s, r)
                }
                var i = this;
                "function" == typeof a && (a = !1, t = arguments[1], r = arguments[2]), i.on(e, a, s, r)
            },
            trigger: function (e, a) {
                for (var t = 0; t < this.length; t++) {
                    var r;
                    try {
                        r = new window.CustomEvent(e, {
                            detail: a,
                            bubbles: !0,
                            cancelable: !0
                        })
                    } catch (s) {
                        r = document.createEvent("Event"), r.initEvent(e, !0, !0), r.detail = a
                    }
                    this[t].dispatchEvent(r)
                }
                return this
            },
            transitionEnd: function (e) {
                function a(i) {
                    if (i.target === this) for (e.call(this, i), t = 0; t < r.length; t++) s.off(r[t], a)
                }
                var t, r = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd",
                            "msTransitionEnd"],
                    s = this;
                if (e) for (t = 0; t < r.length; t++) s.on(r[t], a);
                return this
            },
            width: function () {
                return this[0] === window ? window.innerWidth : this.length > 0 ? parseFloat(this.css("width")) : null
            },
            outerWidth: function (e) {
                return this.length > 0 ? e ? this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(
                    this.css("margin-left")) : this[0].offsetWidth : null
            },

            height: function () {
                return this[0] === window ? window.innerHeight : this.length > 0 ? parseFloat(this.css("height")) :
                    null
            },
            outerHeight: function (e) {
                return this.length > 0 ? e ? this[0].offsetHeight + parseFloat(this.css("margin-top")) + parseFloat(
                    this.css("margin-bottom")) : this[0].offsetHeight : null
            },
            offset: function () {
                if (this.length > 0) {
                    var e = this[0],
                        a = e.getBoundingClientRect(),
                        t = document.body,
                        r = e.clientTop || t.clientTop || 0,
                        s = e.clientLeft || t.clientLeft || 0,
                        i = window.pageYOffset || e.scrollTop,
                        n = window.pageXOffset || e.scrollLeft;
                    return {
                        top: a.top + i - r,
                        left: a.left + n - s
                    }
                }
                return null
            },
            css: function (e, a) {
                var t;
                if (1 === arguments.length) {
                    if ("string" != typeof e) {
                        for (t = 0; t < this.length; t++) for (var r in e) this[t].style[r] = e[r];
                        return this
                    }
                    if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(e)
                }
                if (2 === arguments.length && "string" == typeof e) {
                    for (t = 0; t < this.length; t++) this[t].style[e] = a;
                    return this
                }
                return this
            },
            each: function (e) {
                for (var a = 0; a < this.length; a++) e.call(this[a], a, this[a]);
                return this
            },
            html: function (e) {
                if ("undefined" == typeof e) return this[0] ? this[0].innerHTML : void 0;
                for (var a = 0; a < this.length; a++) this[a].innerHTML = e;
                return this
            },
            is: function (t) {
                if (!this[0]) return !1;
                var r, s;
                if ("string" == typeof t) {
                    var i = this[0];
                    if (i === document) return t === document;
                    if (i === window) return t === window;
                    if (i.matches) return i.matches(t);
                    if (i.webkitMatchesSelector) return i.webkitMatchesSelector(t);
                    if (i.mozMatchesSelector) return i.mozMatchesSelector(t);
                    if (i.msMatchesSelector) return i.msMatchesSelector(t);
                    for (r = a(t), s = 0; s < r.length; s++) if (r[s] === this[0]) return !0;
                    return !1
                }
                if (t === document) return this[0] === document;
                if (t === window) return this[0] === window;
                if (t.nodeType || t instanceof e) {
                    for (r = t.nodeType ? [t] : t, s = 0; s < r.length; s++) if (r[s] === this[0]) return !0;
                    return !1
                }
                return !1
            },
            index: function () {
                if (this[0]) {
                    for (var e = this[0], a = 0; null !== (e = e.previousSibling);) 1 === e.nodeType && a++;
                    return a
                }
            },
            eq: function (a) {
                if ("undefined" == typeof a) return this;
                var t, r = this.length;
                return a > r - 1 ? new e([]) : 0 > a ? (t = r + a, new e(0 > t ? [] : [this[t]])) : new e([this[a]])
            },
            append: function (a) {
                var t, r;
                for (t = 0; t < this.length; t++) if ("string" == typeof a) {
                        var s = document.createElement("div");
                        for (s.innerHTML = a; s.firstChild;) this[t].appendChild(s.firstChild)
                    } else if (a instanceof e) for (r = 0; r < a.length; r++) this[t].appendChild(a[r]);
                else this[t].appendChild(a);
                return this
            },
            prepend: function (a) {
                var t, r;
                for (t = 0; t < this.length; t++) if ("string" == typeof a) {
                        var s = document.createElement("div");
                        for (s.innerHTML = a, r = s.childNodes.length - 1; r >= 0; r--) this[t].insertBefore(s.childNodes[
                                r], this[t].childNodes[0])
                    } else if (a instanceof e) for (r = 0; r < a.length; r++) this[t].insertBefore(a[r], this[t].childNodes[
                            0]);
                else this[t].insertBefore(a, this[t].childNodes[0]);
                return this
            },
            insertBefore: function (e) {
                for (var t = a(e), r = 0; r < this.length; r++) if (1 === t.length) t[0].parentNode.insertBefore(this[r],
                            t[0]);
                    else if (t.length > 1) for (var s = 0; s < t.length; s++) t[s].parentNode.insertBefore(this[r].cloneNode(!
                            0), t[s])
            },
            insertAfter: function (e) {
                for (var t = a(e), r = 0; r < this.length; r++) if (1 === t.length) t[0].parentNode.insertBefore(this[r],
                            t[0].nextSibling);
                    else if (t.length > 1) for (var s = 0; s < t.length; s++) t[s].parentNode.insertBefore(this[r].cloneNode(!
                            0), t[s].nextSibling)
            },
            next: function (t) {
                return new e(this.length > 0 ? t ? this[0].nextElementSibling && a(this[0].nextElementSibling).is(t) ? [
                        this[0].nextElementSibling] : [] : this[0].nextElementSibling ? [this[0].nextElementSibling] : [] : [])
            },
            nextAll: function (t) {
                var r = [],
                    s = this[0];
                if (!s) return new e([]);
                for (; s.nextElementSibling;) {
                    var i = s.nextElementSibling;
                    t ? a(i).is(t) && r.push(i) : r.push(i), s = i
                }
                return new e(r)
            },
            prev: function (t) {
                return new e(this.length > 0 ? t ? this[0].previousElementSibling && a(this[0].previousElementSibling).is(
                    t) ? [this[0].previousElementSibling] : [] : this[0].previousElementSibling ? [this[0].previousElementSibling] : [] : [])
            },
            prevAll: function (t) {
                var r = [],
                    s = this[0];
                if (!s) return new e([]);
                for (; s.previousElementSibling;) {
                    var i = s.previousElementSibling;
                    t ? a(i).is(t) && r.push(i) : r.push(i), s = i
                }
                return new e(r)
            },
            parent: function (e) {
                for (var t = [], r = 0; r < this.length; r++) e ? a(this[r].parentNode).is(e) && t.push(this[r].parentNode) :
                        t.push(this[r].parentNode);
                return a(a.unique(t))
            },
            parents: function (e) {
                for (var t = [], r = 0; r < this.length; r++) for (var s = this[r].parentNode; s;) e ? a(s).is(e) && t.push(
                            s) : t.push(s), s = s.parentNode;
                return a(a.unique(t))
            },
            find: function (a) {
                for (var t = [], r = 0; r < this.length; r++) for (var s = this[r].querySelectorAll(a), i = 0; i < s.length; i++)
                        t.push(s[i]);
                return new e(t)
            },
            children: function (t) {
                for (var r = [], s = 0; s < this.length; s++) for (var i = this[s].childNodes, n = 0; n < i.length; n++)
                        t ? 1 === i[n].nodeType && a(i[n]).is(t) && r.push(i[n]) : 1 === i[n].nodeType && r.push(i[n]);
                return new e(a.unique(r))
            },
            remove: function () {
                for (var e = 0; e < this.length; e++) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
                return this
            },
            add: function () {
                var e, t, r = this;
                for (e = 0; e < arguments.length; e++) {
                    var s = a(arguments[e]);
                    for (t = 0; t < s.length; t++) r[r.length] = s[t], r.length++
                }
                return r
            }
        }, a.fn = e.prototype, a.unique = function (e) {
            for (var a = [], t = 0; t < e.length; t++) - 1 === a.indexOf(e[t]) && a.push(e[t]);
            return a
        }, a
    }()), s = ["jQuery", "Zepto", "Dom7"], i = 0; i < s.length; i++) window[s[i]] && e(window[s[i]]);
    var n;
    n = "undefined" == typeof r ? window.Dom7 || window.Zepto || window.jQuery : r, n && ("transitionEnd" in n.fn || (n
        .fn.transitionEnd = function (e) {
        function a(i) {
            if (i.target === this) for (e.call(this, i), t = 0; t < r.length; t++) s.off(r[t], a)
        }
        var t, r = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
            s = this;
        if (e) for (t = 0; t < r.length; t++) s.on(r[t], a);
        return this
    }), "transform" in n.fn || (n.fn.transform = function (e) {
        for (var a = 0; a < this.length; a++) {
            var t = this[a].style;
            t.webkitTransform = t.MsTransform = t.msTransform = t.MozTransform = t.OTransform = t.transform = e
        }
        return this
    }), "transition" in n.fn || (n.fn.transition = function (e) {
        "string" != typeof e && (e += "ms");
        for (var a = 0; a < this.length; a++) {
            var t = this[a].style;
            t.webkitTransitionDuration = t.MsTransitionDuration = t.msTransitionDuration = t.MozTransitionDuration = t.OTransitionDuration =
                t.transitionDuration = e
        }
        return this
    })), window.Swiper = t
}(), "undefined" != typeof module ? module.exports = window.Swiper : "function" == typeof define && define.amd &&
    define([], function () {
    "use strict";
    return window.Swiper
});
//# sourceMappingURL=maps/swiper.min.js.map