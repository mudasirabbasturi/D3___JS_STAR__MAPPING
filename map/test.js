// Copyright 2015-2020 Olaf Frohn https://github.com/ofrohn, see LICENSE
! function() {
    function t(t, e) {
        function a(a, r) {
            var s = t([a *= 180 / Math.PI, r *= 180 / Math.PI]),
                o = e([a, r]);
            return [(1 - n) * s[0] + n * o[0], (n - 1) * s[1] - n * o[1]]
        }
        var n, r = d3.geo.projection(a).scale(1),
            s = r.center,
            o = r.translate;
        return r.alpha = function(a) {
            if (!arguments.length) return n;
            n = +a;
            var i = t.center(),
                l = e.center(),
                c = t.translate(),
                d = e.translate();
            return s([(1 - n) * i[0] + n * l[0], (1 - n) * i[1] + n * l[1]]), o([(1 - n) * c[0] + n * d[0], (1 - n) * c[1] + n * d[1]]), r
        }, delete r.translate, delete r.center, r.alpha(0)
    }

    function e(t, e) {
        return a(t.map(function(t) {
            return t * yt
        }), e).map(function(t) {
            return t / yt
        })
    }

    function a(t, e) {
        var a, n, r, s, o, i, l, c, d, p;
        return e ? (i = t[0], i < 0 && (i += ft), l = t[1], i -= e[0], s = e[1], o = e[2], a = Math.sin(l) * Math.sin(s) - Math.cos(l) * Math.cos(s) * Math.cos(i), Math.abs(a) < 1e-5 && (a = -Math.cos(l + s) + Math.cos(l) * Math.cos(s) * (1 - Math.cos(i))), n = -Math.cos(l) * Math.sin(i), c = 0 !== a || 0 !== n ? Math.atan2(n, a) : i - Math.PI, d = o + c, d > Math.PI && (d -= ft), i % Math.PI == 0 ? (p = l + Math.cos(i) * s, p > mt && (p = Math.PI - p), p < -mt && (p = -Math.PI - p)) : (r = Math.sin(l) * Math.cos(s) + Math.cos(l) * Math.sin(s) * Math.cos(i), Math.abs(r) > .99 ? (p = Math.abs(Math.acos(Math.sqrt(a * a + n * n))), r < 0 && (p *= -1)) : p = Math.asin(r)), [d, p]) : t
    }

    function n(t) {
        if (null === t || t.length <= 0) return [0, 0, 0];
        var e = ut.equatorial;
        return t[2] || (t[2] = 0), [e[0] - t[0], e[1] - t[1], e[2] + t[2]]
    }

    function r(t, e) {
        var a = t.getUTCFullYear(),
            n = t.getUTCMonth() + 1,
            r = t.getUTCDate(),
            s = t.getUTCHours(),
            o = t.getUTCMinutes(),
            i = t.getUTCSeconds();
        1 != n && 2 != n || (a -= 1, n += 12);
        var l = Math.floor(a / 100),
            c = 2 - l + Math.floor(l / 4),
            d = Math.floor(365.25 * a),
            p = Math.floor(30.6001 * (n + 1)),
            u = c + d + p - 730550.5 + r + (s + o / 60 + i / 3600) / 24,
            h = u / 36525,
            f = 280.46061837 + 360.98564736629 * u + 387933e-9 * h * h - h * h * h / 3871e4 + e;
        if (f > 0)
            for (; f > 360;) f -= 360;
        else
            for (; f < 0;) f += 360;
        return f
    }

    function s(t, a) {
        return e(t, gt[a])
    }

    function o(t, e) {
        if ("equatorial" === e) return t;
        for (var a = gt[e], n = t.features, r = 0; r < n.length; r++) n[r].geometry.coordinates = p(n[r], a);
        return t
    }

    function i(t) {
        var e = [];
        for (var a in t)
            if (k(t, a) && -1 !== $.planets.which.indexOf(a)) {
                var n = _t().id(a);
                k(t[a], "parent") && n.parentBody(t[a].parent), n.elements(t[a].elements[0]).params(t[a]), "ter" === a ? tt.origin = n : e.push(n)
            } return e
    }

    function l(t, e) {
        if (e = e || tt.date(), tt.origin) {
            var a, n = tt.origin(e).spherical();
            return tt.container.selectAll(".planet").each(function(r) {
                t === r.id() && (a = r(e).equatorial(n))
            }), a
        }
    }

    function c(t) {
        for (var e = {}, a = t.features, n = 0; n < a.length; n++) e[a[n].id] = {
            center: a[n].properties.display.slice(0, 2),
            scale: a[n].properties.display[2]
        };
        return e
    }

    function d(t) {
        var e = {
                type: "FeatureCollection",
                features: [{
                    type: "Feature",
                    geometry: {
                        type: "MultiPolygon",
                        coordinates: []
                    }
                }]
            },
            a = t.features[0].geometry.coordinates[0];
        e.features[0].geometry.coordinates[0] = [];
        for (var n = 0; n < a.length; n++) e.features[0].geometry.coordinates[0][n] = a[n].slice().reverse();
        return e
    }

    function p(t, a) {
        var n = [];
        switch (t.geometry.type) {
            case "Point":
                n = e(t.geometry.coordinates, a);
                break;
            case "LineString":
                n.push(m(t.geometry.coordinates, a));
                break;
            case "MultiLineString":
                n = y(t.geometry.coordinates, a);
                break;
            case "Polygon":
                n.push(m(t.geometry.coordinates[0], a));
                break;
            case "MultiPolygon":
                n.push(y(t.geometry.coordinates[0], a))
        }
        return n
    }

    function u(t, e) {
        var a = [];
        if (!e) return [];
        z(e) || (e = [e]);
        for (var n = 0; n < e.length; n++) switch (e[n]) {
            case "center":
                a = "lat" === t ? a.concat(f(t, $.center[0], "N")) : a.concat(f(t, $.center[1], "S"));
                break;
            case "outline":
                "lon" === t ? (a = a.concat(f(t, $.center[1] - 89.99, "S")), a = a.concat(f(t, $.center[1] + 89.99, "N"))) : (a = a.concat(f(t, $.center[0] - 179.99, "E")), a = a.concat(f(t, $.center[0] + 179.99, "W")));
                break;
            default:
                if (x(e[n])) {
                    a = "lat" === t ? a.concat(f(t, e[n], "N")) : a.concat(f(t, e[n], "S"));
                    break
                }
        }
        return h(a)
    }

    function h(t) {
        for (var e = [], a = 0; a < t.length; a++) {
            var n = {
                type: "Feature",
                id: a,
                properties: {},
                geometry: {
                    type: "Point"
                }
            };
            n.properties.value = t[a].value, n.properties.orientation = t[a].orientation, n.geometry.coordinates = t[a].coordinates, e.push(n)
        }
        return e
    }

    function f(t, e, a) {
        var n, r, s, o, i, l = t,
            c = [],
            d = e;
        "equatorial" === $.transform && "lon" === l && (l = "ra"), "ra" === l ? (n = 0, r = 23, s = 1) : "lon" === l ? (n = 0, r = 350, s = 10) : (n = -80, r = 80, s = 10);
        for (var p = n; p <= r; p += s) {
            var u = a;
            "lat" === l ? (i = [d, p], o = p.toString() + "°", u += p < 0 ? "S" : "N") : "ra" === l ? (i = [15 * p, d], o = p.toString() + "ʰ") : (i = [p, d], o = p.toString() + "°"), c.push({
                coordinates: i,
                value: o,
                orientation: u
            })
        }
        return c
    }

    function m(t, a) {
        for (var n = [], r = 0; r < t.length; r++) n.push(e(t[r], a));
        return n
    }

    function y(t, e) {
        for (var a = [], n = 0; n < t.length; n++) a.push(m(t[n], e));
        return a
    }

    function g(t) {
        return z(t) ? t.length >= 3 ? t : 1 === t.length ? [t[0], t[0], t[0]] : 2 === t.length ? [t[0], t[1], t[1]] : void 0 : [t, t, t]
    }

    function v(t) {
        return document.querySelector(J + " #" + t)
    }

    function M(t) {
        return t + "px"
    }

    function b(t, e) {
        return Math.round(Math.pow(10, e) * t) / Math.pow(10, e)
    }

    function w(t) {
        return t < 10 ? "0" + t : t
    }

    function k(t, e) {
        return null !== t && hasOwnProperty.call(t, e)
    }

    function x(t) {
        return null !== t && !isNaN(parseFloat(t)) && isFinite(t)
    }

    function z(t) {
        return null !== t && "[object Array]" === Object.prototype.toString.call(t)
    }

    function S(t) {
        var e = typeof t;
        return "function" === e || "object" === e && !!t
    }

    function T(t) {
        return t && t instanceof Date && !isNaN(t)
    }

    function j(t) {
        var e = 0,
            a = 0;
        if (t.offsetParent)
            do {
                e += t.offsetLeft, a += t.offsetTop
            } while (null !== (t = t.offsetParent));
        return [e, a]
    }

    function P(t, e) {
        for (; t.parentNode;) {
            if (t.id === e) return !0;
            t = t.parentNode
        }
        return !1
    }

    function A(t, e, a) {
        var n = e.valueOf() - t.valueOf();
        switch (a || "d") {
            case "y":
            case "yr":
                n /= 31556926080;
                break;
            case "m":
            case "mo":
                n /= 26298e5;
                break;
            case "d":
            case "dy":
                n /= 864e5;
                break;
            case "h":
            case "hr":
                n /= 36e5;
                break;
            case "n":
            case "mn":
                n /= 6e4;
                break;
            case "s":
            case "sec":
                n /= 1e3
        }
        return Math.floor(n)
    }

    function I(t) {
        if (t) {
            var e = t.split(".");
            if (!(e.length < 1) && (e = e[0].split("-"), e[0] = e[0].replace(/\D/g, ""), e[0])) return e[1] = e[1] ? e[1].replace(/\D/g, "") : "1", e[2] = e[2] ? e[2].replace(/\D/g, "") : "1", new Date(Date.UTC(e[0], e[1] - 1, e[2]))
        }
    }

    function q(t, e, a) {
        return t = (t * yt + ft) % ft, e = (e * yt + ft) % ft, Math.abs(t - e) > Math.PI && (t > e ? t -= ft : e > t && (e -= ft)), d3.interpolateNumber(t / yt, e / yt)
    }

    function L(t) {
        function a() {
            var t = this,
                e = t.value;
            !1 !== _(t) && (m.width = e, tt.resize({
                width: e
            }))
        }

        function n() {
            var t = this,
                e = t.value,
                a = N(e, m.transform);
            null !== a && (m.center[0] = a), m.transform = e, wt.set(m), tt.reload(m)
        }

        function r() {
            var t = this;
            t && (m.projection = t.value, wt.set(m), tt.reproject(m))
        }

        function s() {
            !1 !== _(this) && !1 !== o() && tt.rotate(m)
        }

        function o() {
            var t = W("centerx"),
                e = W("centery"),
                a = W("centerz");
            if (t && e) {
                if ("equatorial" !== m.transform) m.center[0] = parseFloat(t.value);
                else {
                    var n = parseFloat(t.value);
                    m.center[0] = n > 12 ? 15 * n - 360 : 15 * n
                }
                m.center[1] = parseFloat(e.value);
                var r = parseFloat(a.value);
                return m.center[2] = isNaN(r) ? 0 : r, "" !== t.value && "" !== e.value
            }
        }

        function i(t) {
            var e = d3.time.format("%Y%m%dT%H%M%S%Z"),
                a = "d3-celestial",
                n = tt.date();
            return n && (a += e(n)), a + t
        }

        function l() {
            var t = this.value;
            t && c(t)
        }

        function c(t) {
            var a, n = [],
                r = bt;
            if ("---" === t) return tt.constellation = null, a = tt.zoomBy(), 1 !== a && n.push({
                param: "zoom",
                value: 1 / a,
                duration: 0
            }), void tt.animate(n, !1);
            if (S(tt.constellations) && k(tt.constellations, t)) {
                var s = tt.constellations[t],
                    o = e(s.center, gt[r.transform]);
                r.center = o, C(r.center, r.transform), a = tt.zoomBy(), 1 !== a && n.push({
                    param: "zoom",
                    value: 1 / a,
                    duration: 0
                }), n.push({
                    param: "center",
                    value: o,
                    duration: 0
                });
                var i = 1 + 360 / s.scale;
                n.push({
                    param: "zoom",
                    value: i,
                    duration: 0
                }), tt.constellation = t, tt.animate(n, !1)
            }
        }

        function d() {
            var t, e = this;
            switch (Object.assign(m, wt.set()), e.type) {
                case "checkbox":
                    t = e.checked, D(e);
                    break;
                case "number":
                    if (!1 === _(e)) return;
                    t = parseFloat(e.value);
                    break;
                case "color":
                    if (!1 === E(e)) return;
                    t = e.value;
                    break;
                case "text":
                    if (-1 === e.id.search(/fill$/)) return;
                    if (!1 === E(e)) return;
                    t = e.value;
                    break;
                case "select-one":
                    t = e.value
            }
            null !== t && (p(e.id, t), "dsos-style-fill" === e.id ? (p("dsos-style-stroke", t), p("dsos-nameStyle-fill", t)) : "constellations-namesType" === e.id ? U() : "lang" === e.id ? u(t) : "advanced" === e.id && B(t), o(), Object.assign(bt, m), tt.apply(m))
        }

        function p(t, e) {
            var a = t.split("-");
            switch (a.length) {
                case 1:
                    m[a[0]] = e;
                    break;
                case 2:
                    m[a[0]][a[1]] = e;
                    break;
                case 3:
                    m[a[0]][a[1]][a[2]] = e;
                    break;
                default:
                    return
            }
        }

        function u(t) {
            Object.assign(m, bt), m.lang = t;
            for (var e = ["constellations", "planets"], a = 0; a < e.length; a++) k(zt[e[a]][m.culture].names, t) ? m[e[a]].namesType = t : k(zt[e[a]][m.culture].names, "desig") ? m[e[a]].namesType = "desig" : m[e[a]].namesType = "name";
            return k(zt.dsonames[m.culture].names, t) ? m.dsos.namesType = t : m.dsos.namesType = "desig", k(zt.starnames[m.culture].propername, t) ? m.stars.propernameType = t : m.stars.propernameType = "desig", Object.assign(bt, m), h(), U(), m
        }

        function h() {
            d3.selectAll(J + " ~ #celestial-form input, " + J + " ~  #celestial-form select").each(function(t, e) {
                if (void 0 !== this) {
                    var a = this.id;
                    if ("lat" === a || "lon" === a) z(m.geopos) && (this.value = "lat" === a ? m.geopos[0] : m.geopos[1]);
                    else if (-1 !== a.search(/center/)) {
                        if (z(m.center)) switch (a) {
                            case "centerx":
                                this.value = m.center[0];
                                break;
                            case "centery":
                                this.value = m.center[1];
                                break;
                            case "centerz":
                                this.value = m.center[2] || 0
                        }
                    } else {
                        if ("datetime" === a || "hr" === a || "min" === a || "sec" === a || "tz" === a) return;
                        if ("button" !== this.type) {
                            var n = f(a);
                            switch (this.type) {
                                case "checkbox":
                                    this.checked = n, D(a);
                                    break;
                                case "number":
                                    if (!1 === _(this)) break;
                                    this.value = parseFloat(f(a));
                                    break;
                                case "color":
                                    if (!1 === E(this)) break;
                                    this.value = n;
                                    break;
                                case "text":
                                    if (-1 === a.search(/fill$/)) break;
                                    if (!1 === E(this)) break;
                                    this.value = n;
                                    break;
                                case "select-one":
                                    this.value = n
                            }
                        }
                    }
                }
            })
        }

        function f(t) {
            var e = t.split("-");
            switch (e.length) {
                case 1:
                    return m[e[0]];
                case 2:
                    return m[e[0]][e[1]];
                case 3:
                    return m[e[0]][e[1]][e[2]];
                default:
                    return
            }
        }
        var m = wt.set(t),
            y = tt.projections(),
            g = tt.eulerAngles(),
            v = d3.select(J + " ~ #celestial-form");
        v.size() < 1 && (v = d3.select(J).select(function() {
            return this.parentNode
        }).append("div").attr("id", "celestial-form"));
        var M = v.append("div").attr("class", "ctrl"),
            b = M.append("form").attr("id", "params").attr("name", "params").attr("method", "get").attr("action", "#"),
            w = b.append("div").attr("class", "col").attr("id", "general");
        w.append("label").attr("title", "Map width in pixel, 0 indicates full width").attr("for", "width").html("Width "), w.append("input").attr("type", "number").attr("maxlength", "4").attr("max", "20000").attr("min", "0").attr("title", "Map width").attr("id", "width").attr("value", m.width).on("change", a), w.append("span").html("px"), w.append("label").attr("title", "Map projection, (hemi) indicates hemispherical projection").attr("for", "projection").html("Projection");
        var x = w.append("select").attr("id", "projection").on("change", r),
            T = 0,
            j = Object.keys(y).map(function(t, e) {
                var a = y[t].clip && !0 === y[t].clip ? y[t].n + " (hemi)" : y[t].n;
                return t === m.projection && (T = e), {
                    o: t,
                    n: a
                }
            });
        x.selectAll("option").data(j).enter().append("option").attr("value", function(t) {
            return t.o
        }).text(function(t) {
            return t.n
        }), x.property("selectedIndex", T), T = 0, w.append("label").attr("title", "Coordinate space in which the map is displayed").attr("for", "transform").html("Coordinates"), x = w.append("select").attr("id", "transform").on("change", n), j = Object.keys(g).map(function(t, e) {
            return t === m.transform && (T = e), {
                o: t,
                n: t.replace(/^([a-z])/, function(t, e) {
                    return e.toUpperCase()
                })
            }
        }), x.selectAll("option").data(j).enter().append("option").attr("value", function(t) {
            return t.o
        }).text(function(t) {
            return t.n
        }), x.property("selectedIndex", T), w.append("br"), w.append("label").attr("title", "Center coordinates long/lat in selected coordinate space").attr("for", "centerx").html("Center"), w.append("input").attr("type", "number").attr("id", "centerx").attr("title", "Center right ascension/longitude").attr("max", "24").attr("min", "0").attr("step", "0.1").on("change", s), w.append("span").attr("id", "cxunit").html("h"), w.append("input").attr("type", "number").attr("id", "centery").attr("title", "Center declination/latitude").attr("max", "90").attr("min", "-90").attr("step", "0.1").on("change", s), w.append("span").html("°"), w.append("label").attr("title", "Orientation").attr("for", "centerz").html("Orientation"), w.append("input").attr("type", "number").attr("id", "centerz").attr("title", "Center orientation").attr("max", "180").attr("min", "-180").attr("step", "0.1").on("change", s), w.append("span").html("°"), w.append("label").attr("for", "orientationfixed").attr("class", "advanced").html("Fixed"), w.append("input").attr("type", "checkbox").attr("id", "orientationfixed").attr("class", "advanced").property("checked", m.orientationfixed).on("change", d), w.append("label").attr("title", "Center and zoom in on this constellation").attr("for", "constellation").html("Show"), w.append("select").attr("id", "constellation").on("change", l), C(m.center, m.transform), w = b.append("div").attr("class", "col").attr("id", "stars"), w.append("label").attr("class", "header").attr("for", "stars-show").html("Stars"), w.append("input").attr("type", "checkbox").attr("id", "stars-show").property("checked", m.stars.show).on("change", d), w.append("label").attr("for", "stars-limit").html("down to magnitude"), w.append("input").attr("type", "number").attr("id", "stars-limit").attr("title", "Star display limit (magnitude)").attr("value", m.stars.limit).attr("max", "6").attr("min", "-1").attr("step", "0.1").on("change", d), w.append("label").attr("for", "stars-colors").html("with spectral colors"), w.append("input").attr("type", "checkbox").attr("id", "stars-colors").property("checked", m.stars.colors).on("change", d), w.append("label").attr("for", "stars-color").html("or default color "), w.append("input").attr("type", "color").attr("autocomplete", "off").attr("id", "stars-style-fill").attr("title", "Star color").property("value", m.stars.style.fill).on("change", d), w.append("br");
        var P = zt.starnames[m.culture] || zt.starnames.iau;
        for (var A in P)
            if (k(P, A)) {
                var I = Object.keys(P[A]);
                I.length > 1 ? (w.append("label").attr("for", "stars-" + A).html("Show"), T = 0, w.append("label").attr("title", "Type of star name").attr("id", "label-propername").attr("for", "stars-" + A + "Type").html(function() {
                    return "propername" === A ? "proper names" : ""
                }), x = w.append("select").attr("id", "stars-" + A + "Type").attr("class", function() {
                    return "propername" === A ? "advanced" : ""
                }).on("change", d), j = I.map(function(t, e) {
                    return t === m.stars[A + "Type"] && (T = e), {
                        o: t,
                        n: P[A][t]
                    }
                }), x.selectAll("option").data(j).enter().append("option").attr("value", function(t) {
                    return t.o
                }).text(function(t) {
                    return t.n
                }), x.property("selectedIndex", T), w.append("input").attr("type", "checkbox").attr("id", "stars-" + A).property("checked", m.stars[A]).on("change", d)) : 1 === I.length && (w.append("label").attr("for", "stars-" + A).html(" " + P[A][I[0]]), w.append("input").attr("type", "checkbox").attr("id", "stars-" + A).property("checked", m.stars[A]).on("change", d)), w.append("label").attr("for", "stars-" + A + "Limit").html("down to mag"), w.append("input").attr("type", "number").attr("id", "stars-" + A + "Limit").attr("title", "Star name display limit (magnitude)").attr("value", m.stars[A + "Limit"]).attr("max", "6").attr("min", "-1").attr("step", "0.1").on("change", d)
            } w.append("br"), w.append("label").attr("for", "stars-size").attr("class", "advanced").html("Stellar disk size: base"), w.append("input").attr("type", "number").attr("id", "stars-size").attr("class", "advanced").attr("title", "Size of the displayed star disk; base").attr("value", m.stars.size).attr("max", "100").attr("min", "0").attr("step", "0.1").on("change", d), w.append("label").attr("for", "stars-exponent").attr("class", "advanced").html(" * e ^ (exponent"), w.append("input").attr("type", "number").attr("id", "stars-exponent").attr("class", "advanced").attr("title", "Size of the displayed star disk; exponent").attr("value", m.stars.exponent).attr("max", "3").attr("min", "-1").attr("step", "0.01").on("change", d), w.append("span").attr("class", "advanced").text(" * (magnitude + 2))  [* adaptation]"), D(W("stars-show")), w = b.append("div").attr("class", "col").attr("id", "dsos"), w.append("label").attr("class", "header").attr("title", "Deep Space Objects").attr("for", "dsos-show").html("DSOs"), w.append("input").attr("type", "checkbox").attr("id", "dsos-show").property("checked", m.dsos.show).on("change", d), w.append("label").attr("for", "dsos-limit").html("down to mag"), w.append("input").attr("type", "number").attr("id", "dsos-limit").attr("title", "DSO display limit (magnitude)").attr("value", m.dsos.limit).attr("max", "6").attr("min", "0").attr("step", "0.1").on("change", d), w.append("label").attr("for", "dsos-colors").html("with symbol colors"), w.append("input").attr("type", "checkbox").attr("id", "dsos-colors").property("checked", m.dsos.colors).on("change", d), w.append("label").attr("for", "dsos-color").html("or default color "), w.append("input").attr("type", "color").attr("autocomplete", "off").attr("id", "dsos-style-fill").attr("title", "DSO color").property("value", m.dsos.style.fill).on("change", d), w.append("br"), P = zt.dsonames[m.culture] || zt.dsonames.iau;
        for (A in P)
            if (k(P, A)) {
                var q = Object.keys(P[A]);
                w.append("label").attr("for", "dsos-" + A).html("Show"), T = 0, w.append("label").attr("title", "Type of DSO name").attr("for", "dsos-" + A + "Type").attr("class", "advanced").html(""), x = w.append("select").attr("id", "dsos-" + A + "Type").attr("class", "advanced").on("change", d), j = q.map(function(t, e) {
                    return t === m.stars[A + "Type"] && (T = e), {
                        o: t,
                        n: P[A][t]
                    }
                }), x.selectAll("option").data(j).enter().append("option").attr("value", function(t) {
                    return t.o
                }).text(function(t) {
                    return t.n
                }), x.property("selectedIndex", T), w.append("label").attr("for", "dsos-" + A).html("names"), w.append("input").attr("type", "checkbox").attr("id", "dsos-" + A).property("checked", m.dsos[A]).on("change", d)
            } w.append("label").attr("for", "dsos-nameLimit").html("down to mag"), w.append("input").attr("type", "number").attr("id", "dsos-nameLimit").attr("title", "DSO name display limit (magnitude)").attr("value", m.dsos.nameLimit).attr("max", "6").attr("min", "0").attr("step", "0.1").on("change", d), w.append("br"), w.append("label").attr("for", "dsos-size").attr("class", "advanced").html("DSO symbol size: (base"), w.append("input").attr("type", "number").attr("id", "dsos-size").attr("class", "advanced").attr("title", "Size of the displayed symbol: base").attr("value", m.dsos.size).attr("max", "100").attr("min", "0").attr("step", "0.1").on("change", d), w.append("label").attr("for", "dsos-exponent").attr("class", "advanced").html(" * 2 [* adaptation] - magnitude) ^ exponent"), w.append("input").attr("type", "number").attr("id", "dsos-exponent").attr("class", "advanced").attr("title", "Size of the displayed symbol; exponent").attr("value", m.dsos.exponent).attr("max", "3").attr("min", "-1").attr("step", "0.01").on("change", d), D(W("dsos-show")), w = b.append("div").attr("class", "col").attr("id", "constellations"), w.append("label").attr("class", "header").html("Constellations"), P = zt.constellations[m.culture] || zt.constellations.iau;
        for (A in P)
            if (k(P, A)) {
                var L = Object.keys(P[A]);
                L.length > 1 ? (w.append("label").attr("for", "constellations-" + A).html("Show"), T = 0, w.append("label").attr("title", "Language of constellation names").attr("for", "constellations-" + A + "Type").attr("class", "advanced").html(""), x = w.append("select").attr("id", "constellations-" + A + "Type").attr("class", "advanced").on("change", d), j = L.map(function(t, e) {
                    return t === m.constellations[A + "Type"] && (T = e), {
                        o: t,
                        n: P[A][t]
                    }
                }), x.selectAll("option").data(j).enter().append("option").attr("value", function(t) {
                    return t.o
                }).text(function(t) {
                    return t.n
                }), x.property("selectedIndex", T), w.append("label").attr("for", "constellations-" + A).html("names"), w.append("input").attr("type", "checkbox").attr("id", "constellations-" + A).property("checked", m.constellations[A]).on("change", d)) : 1 === L.length && (w.append("label").attr("for", "constellations-" + A).attr("class", "advanced").html(" " + P[A][L[0]]), w.append("input").attr("type", "checkbox").attr("id", "constellations-" + A).attr("class", "advanced").property("checked", m.constellations[A]).on("change", d))
            } w.append("label").attr("for", "constellations-lines").html(" lines"), w.append("input").attr("type", "checkbox").attr("id", "constellations-lines").property("checked", m.constellations.lines).on("change", d), w.append("label").attr("for", "constellations-bounds").html(" boundaries"), w.append("input").attr("type", "checkbox").attr("id", "constellations-bounds").property("checked", m.constellations.bounds).on("change", d), D(W("constellations-names")), w = b.append("div").attr("class", "col").attr("id", "lines"), w.append("label").attr("class", "header").html("Lines"), w.append("label").attr("title", "Latitude/longitude grid lines").attr("for", "lines-graticule").html("Graticule"), w.append("input").attr("type", "checkbox").attr("id", "lines-graticule-show").property("checked", m.lines.graticule.show).on("change", d), w.append("label").attr("for", "lines-equatorial").html("Equator"), w.append("input").attr("type", "checkbox").attr("id", "lines-equatorial-show").property("checked", m.lines.equatorial.show).on("change", d), w.append("label").attr("for", "lines-ecliptic").html("Ecliptic"), w.append("input").attr("type", "checkbox").attr("id", "lines-ecliptic-show").property("checked", m.lines.ecliptic.show).on("change", d), w.append("label").attr("for", "lines-galactic").html("Galactic plane"), w.append("input").attr("type", "checkbox").attr("id", "lines-galactic-show").property("checked", m.lines.galactic.show).on("change", d), w.append("label").attr("for", "lines-supergalactic").html("Supergalactic plane"), w.append("input").attr("type", "checkbox").attr("id", "lines-supergalactic-show").property("checked", m.lines.supergalactic.show).on("change", d), w = b.append("div").attr("class", "col").attr("id", "other"), w.append("label").attr("class", "header").html("Other"), w.append("label").attr("for", "mw-show").html("Milky Way"), w.append("input").attr("type", "checkbox").attr("id", "mw-show").property("checked", m.mw.show).on("change", d), w.append("label").attr("for", "mw-style-fill").attr("class", "advanced").html(" color"), w.append("input").attr("type", "color").attr("id", "mw-style-fill").attr("class", "advanced").attr("title", "Milky Way color").attr("value", m.mw.style.fill).on("change", d), w.append("label").attr("for", "mw-style-opacity").attr("class", "advanced").html(" opacity"), w.append("input").attr("type", "number").attr("id", "mw-style-opacity").attr("class", "advanced").attr("title", "Transparency of each Milky Way layer").attr("value", m.mw.style.opacity).attr("max", "1").attr("min", "0").attr("step", "0.01").on("change", d), w.append("label").attr("for", "advanced").html("Advanced options"), w.append("input").attr("type", "checkbox").attr("id", "advanced").property("checked", m.advanced).on("change", d), w.append("br"), w.append("label").attr("for", "background-fill").html("Background color"), w.append("input").attr("type", "color").attr("id", "background-fill").attr("title", "Background color").attr("value", m.background.fill).on("change", d), w.append("label").attr("for", "background-opacity").attr("class", "advanced").html("opacity"), w.append("input").attr("type", "number").attr("id", "background-opacity").attr("class", "advanced").attr("title", "Background opacity").attr("value", m.background.opacity).attr("max", "1").attr("min", "0").attr("step", "0.01").on("change", d), w.append("label").attr("title", "Star/DSO sizes are increased with higher zoom-levels").attr("for", "adaptable").attr("class", "advanced").html("Adaptable object sizes"), w.append("input").attr("type", "checkbox").attr("id", "adaptable").attr("class", "advanced").property("checked", m.adaptable).on("change", d);
        var F = St[m.culture];
        T = 0, w.append("label").attr("title", "General language setting").attr("for", "lang").html("Object names "), x = w.append("select").attr("id", "lang").on("change", d), j = F.map(function(t, e) {
            return t === m.lang && (T = e), {
                o: t,
                n: zt.constellations[m.culture].names[t]
            }
        }), j = [{
            o: "---",
            n: "(Select language)"
        }].concat(j), x.selectAll("option").data(j).enter().append("option").attr("value", function(t) {
            return t.o
        }).text(function(t) {
            return t.n
        }), x.property("selectedIndex", T), w = b.append("div").attr("class", "col").attr("id", "download"), w.append("label").attr("class", "header").html("Download"), w.append("input").attr("type", "button").attr("id", "download-png").attr("value", "PNG Image").on("click", function() {
            var t = d3.select("body").append("a").node(),
                e = document.querySelector(J + " canvas");
            t.download = i(".png"), t.rel = "noopener", t.href = e.toDataURL("image/png").replace("image/png", "image/octet-stream"), t.click(), d3.select(t).remove()
        }), w.append("input").attr("type", "button").attr("id", "download-svg").attr("value", "SVG File").on("click", function() {
            return R(i(".svg")), !1
        }), H(), N(m.transform), G(t), B(m.advanced), tt.updateForm = h, tt.showConstellation = c, tt.setLanguage = function(t) {
            var e = wt.set();
            return -1 !== St[m.culture].indexOf(t) && (e = u(t)), e
        }
    }

    function D(t) {
        var e, a = t.id;
        switch (a) {
            case "stars-show":
                e = !W(a).checked;
                for (var n = 0; n < Pt[a].length; n++) F(Pt[a][n], e);
            case "stars-designation":
                for (e = !W("stars-designation").checked || !W("stars-show").checked, n = 0; n < Pt["stars-designation"].length; n++) F(Pt["stars-designation"][n], e);
            case "stars-propername":
                for (e = !W("stars-propername").checked || !W("stars-show").checked, n = 0; n < Pt["stars-propername"].length; n++) F(Pt["stars-propername"][n], e);
                break;
            case "dsos-show":
                for (e = !W(a).checked, n = 0; n < Pt[a].length; n++) F(Pt[a][n], e);
            case "dsos-names":
                for (e = !W("dsos-names").checked || !W("dsos-show").checked, n = 0; n < Pt["dsos-names"].length; n++) F(Pt["dsos-names"][n], e);
                break;
            case "planets-show":
                for (e = !W(a).checked, n = 0; n < Pt[a].length; n++) F(Pt[a][n], e);
            case "planets-names":
                for (e = !W("planets-names").checked || !W("planets-show").checked, n = 0; n < Pt["planets-names"].length; n++) F(Pt["planets-names"][n], e);
                break;
            case "constellations-names":
            case "mw-show":
                for (e = !W(a).checked, n = 0; n < Pt[a].length; n++) F(Pt[a][n], e)
        }
    }

    function F(t, e) {
        var a = W(t);
        a && (a.disabled = e, a.style.color = e ? "#999" : "#000", a.previousSibling.style.color = e ? "#999" : "#000")
    }

    function O(t, e) {
        var a = j(t);
        d3.select("#error").html(e).style({
            top: M(a[1] + t.offsetHeight + 1),
            left: M(a[0]),
            opacity: 1
        }), t.focus()
    }

    function _(t) {
        var e, a = "hr" === t.id || "min" === t.id || "sec" === t.id ? 1 : 0;
        if (t.validity) {
            if (e = t.validity, e.typeMismatch || e.badInput) return O(t, t.title + ": check field value"), !1;
            if (e.rangeOverflow || e.rangeUnderflow) return O(t, t.title + " must be between " + (parseInt(t.min) + a) + " and " + (parseInt(t.max) - a)), !1
        } else {
            if (e = t.value, !x(e)) return O(t, t.title + ": check field value"), !1;
            if ((e = parseFloat(e)) < t.min || e > t.max) return O(t, t.title + " must be between " + (t.min + a) + " and " + (+t.max - a)), !1
        }
        return d3.select("#error").style({
            top: "-9999px",
            left: "-9999px",
            opacity: 0
        }), !0
    }

    function E(t) {
        var e;
        if (t.validity) {
            if (e = t.validity, e.typeMismatch || e.badInput) return O(t, t.title + ": check field value"), !1;
            if (-1 === t.value.search(/^#[0-9A-F]{6}$/i)) return O(t, t.title + ": not a color value"), !1
        } else {
            if ("" === (e = t.value)) return !0;
            if (-1 === e.search(/^#[0-9A-F]{6}$/i)) return O(t, t.title + ": not a color value"), !1
        }
        return d3.select("#error").style({
            top: "-9999px",
            left: "-9999px",
            opacity: 0
        }), !0
    }

    function N(t, e) {
        var a = W("centerx");
        return a ? (e && ("equatorial" === t && "equatorial" !== e ? (a.value = (a.value / 15).toFixed(1), a.value < 0 && (a.value += 24)) : "equatorial" !== t && "equatorial" === e && (a.value = (15 * a.value).toFixed(1), a.value > 180 && (a.value -= 360))), "equatorial" === t ? (a.min = "0", a.max = "24", W("cxunit").innerHTML = "h") : (a.min = "-180", a.max = "180", W("cxunit").innerHTML = "°"), a.value) : null
    }

    function C(t, e) {
        var a = W("centerx"),
            n = W("centery"),
            r = W("centerz");
        a && n && ((null === t || t.length < 1) && (t = [0, 0, 0]), (t.length <= 2 || void 0 === t[2]) && (t[2] = 0), a.value = "equatorial" !== e ? t[0].toFixed(1) : t[0] < 0 ? (t[0] / 15 + 24).toFixed(1) : (t[0] / 15).toFixed(1), n.value = t[1].toFixed(1), r.value = null !== t[2] ? t[2].toFixed(1) : 0, wt.set({
            center: t
        }))
    }

    function H() {
        var t, e, a, n = /\d+(\.\d+)?/g,
            r = {
                s: 6,
                d: 6
            },
            s = tt.settings();
        return a = s.dsos.data, t = a.match(n), null !== t && (r.d = parseFloat(t[t.length - 1])), 6 !== r.d && (W("dsos-limit").max = r.d, W("dsos-nameLimit").max = r.d), e = s.stars.data, t = e.match(n), null !== t && (r.s = parseFloat(t[t.length - 1])), 6 != r.s && (W("stars-limit").max = r.s, W("stars-designationLimit").max = r.s, W("stars-propernameLimit").max = r.s), r
    }

    function B(t) {
        var e = t ? "inline-block" : "none";
        d3.select(J + " ~ #celestial-form").selectAll(".advanced").style("display", e), d3.select(J + " ~ #celestial-form").selectAll("#label-propername").style("display", t ? "none" : "inline-block")
    }

    function G(t, e) {
        var a, n;
        if (k(t, "formFields")) {
            if (e && k(t.formFields, e)) return void d3.select(J + " ~ #celestial-form").select("#" + e).style({
                display: "none"
            });
            if (!1 !== t.form || !0 !== t.location) {
                !1 === t.form && d3.select(J + " ~ #celestial-form").style("display", "none");
                for (n in t.formFields) k(t.formFields, n) && "location" !== n && (a = !1 === t.formFields[n] ? "none" : "block", d3.select(J + " ~ #celestial-form").select("#" + n).style({
                    display: a
                }))
            } else {
                d3.select(J + " ~ #celestial-form").style("display", "inline-block");
                for (n in t.formFields) k(t.formFields, n) && "location" !== n && d3.select(J + " ~ #celestial-form").select("#" + n).style({
                    display: "none"
                })
            }
        }
    }

    function U() {
        var t, e, a = d3.select(J + " ~ #celestial-form").select("#constellation"),
            n = [],
            r = 0,
            s = bt;
        if (tt.container.selectAll(".constname").each(function(a, o) {
                t = a.id, t === s.constellation && (r = o), e = a.properties[s.constellations.namesType], e !== t && (e += " (" + t + ")"), n.push({
                    o: t,
                    n: e
                })
            }), n.length < 1 || a.length < 1) return void setTimeout(U, 1e3);
        n = [{
            o: "---",
            n: "(Select constellation)"
        }].concat(n), a.selectAll("option").remove(), a.selectAll("option").data(n).enter().append("option").attr("value", function(t) {
            return t.o
        }).text(function(t) {
            return t.n
        }), a.property("selectedIndex", r)
    }

    function W(t) {
        return document.querySelector(J + " ~ #celestial-form #" + t)
    }

    function V(t) {
        function e() {
            h.setTime(Date.now()), W("datetime").value = r(h, m), l()
        }

        function a() {
            navigator.geolocation.getCurrentPosition(function(t) {
                u = [b(t.coords.latitude, 4), b(t.coords.longitude, 4)], W("lat").value = u[0], W("lon").value = u[1], l()
            })
        }

        function n() {
            v.show(h, m)
        }

        function r(t, e) {
            var a;
            if (e && "0" !== e) {
                var n = Math.floor(Math.abs(e) / 60),
                    r = Math.abs(e) - 60 * n;
                a = (e > 0 ? " +" : " −") + w(n) + w(r)
            } else a = " ±0000";
            return d(t) + a
        }

        function s(t) {
            return !(!t || !z(t) || t.length < 2) && (!(!x(t[0]) || t[0] < -90 || t[0] > 90) && !(!x(t[1]) || t[1] < -180 || t[1] > 180))
        }

        function o(t) {
            return void 0 !== t && null !== t && !(!x(t) && Math.abs(t) > 840)
        }

        function i() {
            Object.assign(y, wt.set()), y.horizon.show = !!W("horizon-show").checked, y.daylight.show = !!W("daylight-show").checked, y.planets.show = !!W("planets-show").checked, y.planets.names = !!W("planets-names").checked, y.planets.namesType = W("planets-namesType").value, y.planets.symbolType = W("planets-symbolType").value, D(W("planets-show")), tt.apply(y)
        }

        function l() {
            var t = parseFloat(W("lon").value),
                e = parseFloat(W("lat").value);
            if (Object.assign(y, wt.set()), h = d.parse(W("datetime").value.slice(0, -6)), !isNaN(t) && !isNaN(e)) {
                if (e !== u[0] || t !== u[1]) return u = [e, t], void c([e, t], !0);
                W("datetime").value = r(h, m);
                var a = new Date(h.valueOf() - 6e4 * (m - f));
                p = tt.getPoint(vt.inverse(a, [90, 0], u), y.transform), p[2] = 0, "zenith" === y.follow ? tt.rotate({
                    center: p
                }) : tt.redraw()
            }
        }

        function c(t, e) {
            if (t && k(y, "settimezone") && !1 !== y.settimezone) {
                var a = Math.floor(h.getTime() / 1e3),
                    n = window && "https:" === window.location.protocol ? "https" : "http",
                    s = n + "://api.timezonedb.com/v2.1/get-time-zone?key=" + y.timezoneid + "&format=json&by=position&lat=" + t[0] + "&lng=" + t[1] + "&time=" + a;
                d3.json(s, function(e, n) {
                    if (e) return console.warn(e);
                    "FAILED" === n.status ? (m = 60 * Math.round(t[1] / 15), At = {
                        gmtOffset: 60 * m,
                        message: "Sea locatation inferred",
                        timestamp: a
                    }) : (m = n.gmtOffset / 60, At = n), W("datetime").value = r(h, m), l()
                })
            }
        }
        var d = d3.time.format("%Y-%m-%d %H:%M:%S"),
            p = [0, 0],
            u = [0, 0],
            h = new Date,
            f = -h.getTimezoneOffset(),
            m = f,
            y = wt.set(t),
            g = d3.select(J + " ~ #celestial-form form").insert("div", "div#general").attr("id", "loc"),
            v = new Ht(y, function(t, e) {
                W("datetime").value = r(t, e), m = e, l()
            });
        k(y, "geopos") && null !== y.geopos && 2 === y.geopos.length && (u = y.geopos);
        var M = g.append("div").attr("class", "col").attr("id", "location").style("display", "none");
        M.append("label").attr("title", "Location coordinates long/lat").attr("for", "lat").html("Location"), M.append("input").attr("type", "number").attr("id", "lat").attr("title", "Latitude").attr("placeholder", "Latitude").attr("max", "90").attr("min", "-90").attr("step", "0.0001").attr("value", u[0]).on("change", function() {
            !0 === _(this) && l()
        }), M.append("span").html("°"), M.append("input").attr("type", "number").attr("id", "lon").attr("title", "Longitude").attr("placeholder", "Longitude").attr("max", "180").attr("min", "-180").attr("step", "0.0001").attr("value", u[1]).on("change", function() {
            !0 === _(this) && l()
        }), M.append("span").html("°"), "geolocation" in navigator && M.append("input").attr("type", "button").attr("value", "Here").attr("id", "here").on("click", a), M.append("label").attr("title", "Local date/time").attr("for", "datetime").html(" Date/time"), M.append("input").attr("type", "button").attr("id", "day-left").attr("title", "One day back").on("click", function() {
            h.setDate(h.getDate() - 1), W("datetime").value = r(h, m), l()
        }), M.append("input").attr("type", "text").attr("id", "datetime").attr("title", "Date and time").attr("value", r(h, m)).on("click", n, !0).on("input", function() {
            this.value = r(h, m), v.isVisible() || n()
        }), M.append("div").attr("id", "datepick").on("click", n), M.append("input").attr("type", "button").attr("id", "day-right").attr("title", "One day forward").on("click", function() {
            h.setDate(h.getDate() + 1), W("datetime").value = r(h, m), l()
        }), M.append("input").attr("type", "button").attr("value", "Now").attr("id", "now").on("click", e), M.append("br"), M.append("label").attr("title", "Show horizon marker").attr("for", "horizon-show").html(" Horizon marker"), M.append("input").attr("type", "checkbox").attr("id", "horizon-show").property("checked", y.horizon.show).on("change", i), M.append("label").attr("title", "Show daylight").attr("for", "daylight-show").html("Daylight sky"), M.append("input").attr("type", "checkbox").attr("id", "daylight-show").property("checked", y.daylight.show).on("change", i), M.append("br"), M.append("label").attr("title", "Show solar system objects").attr("for", "planets-show").html(" Planets, Sun & Moon"), M.append("input").attr("type", "checkbox").attr("id", "planets-show").property("checked", y.planets.show).on("change", i);
        var S = zt.planets[y.culture] || zt.planets.iau;
        for (var j in S)
            if (k(S, j)) {
                var A = Object.keys(S[j]);
                if (A.length > 1) {
                    var I = "symbol" === j ? "as" : "with";
                    M.append("label").attr("for", "planets-" + j + "Type").html(I);
                    var q = 0;
                    M.append("label").attr("title", "Type of planet name").attr("for", "planets-" + j + "Type").attr("class", "advanced").html("");
                    var L = M.append("select").attr("id", "planets-" + j + "Type").on("change", i),
                        F = A.map(function(t, e) {
                            return t === y.planets[j + "Type"] && (q = e), {
                                o: t,
                                n: S[j][t]
                            }
                        });
                    L.selectAll("option").data(F).enter().append("option").attr("value", function(t) {
                        return t.o
                    }).text(function(t) {
                        return t.n
                    }), L.property("selectedIndex", q), "names" === j && (L.attr("class", "advanced"), M.append("label").attr("for", "planets-" + j).html("names"), M.append("input").attr("type", "checkbox").attr("id", "planets-" + j).property("checked", y.planets[j]).on("change", i))
                }
            } D(W("planets-show")), B(y.advanced), d3.select(document).on("mousedown", function() {
            !P(d3.event.target, "celestial-date") && v.isVisible() && v.hide()
        }), tt.dateFormat = r, tt.date = function(t, e) {
            if (!t) return h;
            o(e) && (m = e), Object.assign(y, wt.set()), v.isVisible() && v.hide(), h.setTime(t.valueOf()), W("datetime").value = r(t, m), l()
        }, tt.timezone = function(t) {
            if (!t) return m;
            o(t) && (m = t), Object.assign(y, wt.set()), v.isVisible() && v.hide(), W("datetime").value = r(h, m), l()
        }, tt.position = function() {
            return u
        }, tt.location = function(t, e) {
            if (!t || t.length < 2) return u;
            s(t) && (u = t.slice(), W("lat").value = u[0], W("lon").value = u[1], o(e) ? m = e : c(u, !0))
        }, tt.skyview = function(t) {
            if (!t) return {
                date: h,
                location: u,
                timezone: m
            };
            var e = !1;
            return v.isVisible() && v.hide(), k(t, "timezone") && o(t.timezone) && (m = t.timezone, e = !0), k(t, "date") && T(t.date) && (h.setTime(t.date.valueOf()), W("datetime").value = r(t.date, m), e = !0), k(t, "location") && s(t.location) && (u = t.location.slice(), W("lat").value = u[0], W("lon").value = u[1], !k(t, "timezone")) ? void c(u, !k(t, "date")) : !1 === e ? {
                date: h,
                location: u,
                timezone: m
            } : void("zenith" === y.follow ? l() : tt.redraw())
        }, tt.dtLoc = tt.skyview, tt.zenith = function() {
            return p
        }, tt.nadir = function() {
            var t = -p[1],
                e = p[0] + 180;
            return e > 180 && (e -= 360), [e, t - .001]
        }, !k(y, "formFields") || !0 !== y.location && !0 !== y.formFields.location || d3.select(J + " ~ #celestial-form").select("#location").style({
            display: "inline-block"
        }), !s(u) || !0 !== y.location && !0 !== y.formFields.location || "zenith" !== y.follow || setTimeout(l, 1e3)
    }

    function R(t) {
        function a(t) {
            return C.clip && d3.geo.distance(B, t) > mt ? 0 : 1
        }

        function r(t) {
            return "translate(" + U(t) + ")"
        }

        function s(t, e, a) {
            var n = k(zt[t], V) ? "." + V : "";
            return a = a ? "." + a : ".json", e = e ? "." + e : "", t + e + n + a
        }

        function i(t) {
            var e = {};
            return e.fill = t.fill || "none", e["fill-opacity"] = null !== t.opacity ? t.opacity : 1, e.stroke = t.stroke || "none", e["stroke-width"] = null !== t.width ? t.width : 0, e["stroke-opacity"] = null !== t.opacity ? t.opacity : 1, k(t, "dash") ? e["stroke-dasharray"] = t.dash.join(" ") : e["stroke-dasharray"] = "none", e.font = t.font || null, e
        }

        function c(t) {
            var e = {};
            return e.stroke = "none", e.fill = t.fill || "none", e["fill-opacity"] = null !== t.opacity ? t.opacity : 1, e["text-anchor"] = f(t.align), e.font = t.font || null, e
        }

        function p(t, e) {
            var a, n, r, s;
            if (t > 1.885) return {
                fill: "transparent"
            };
            t <= 1.36 ? (n = "#daf1fa", r = "#93d7f0", s = "#57c0e8", a = -(1.36 - t) / 10) : (a = (t - 1.36) / (1.885 - 1.36), n = d3.interpolateLab("#daf1fa", "#e8c866")(a), r = d3.interpolateLab("#93c7d0", "#ff854a")(a), s = d3.interpolateLab("#57b0c8", "#6caae2")(a));
            var o = Y.daylight.append("radialGradient").attr("cx", e[0]).attr("cy", e[1]).attr("fr", "0").attr("r", "300").attr("id", "skygradient").attr("gradientUnits", "userSpaceOnUse");
            return o.append("stop").attr("offset", "0").attr("stop-color", n), o.append("stop").attr("offset", .2 + .4 * a).attr("stop-color", r), o.append("stop").attr("offset", "1").attr("stop-color", s), {
                fill: "url(#skygradient)",
                "fill-opacity": h(a, 1.4)
            }
        }

        function h(t, e) {
            return .9 * (1 - (Math.pow(Math.E, t * e) - 1) / (Math.pow(Math.E, e) - 1))
        }

        function f(t) {
            return t ? "center" === t ? "middle" : "right" === t ? "end" : "start" : "start"
        }

        function m(t) {
            var e = g(t.mag, t.dim) || 9,
                a = y(t.type);
            return -1 !== d3.svg.symbolTypes.indexOf(a) ? d3.svg.symbol().type(a).size(e)() : d3.svg.customSymbol().type(a).size(e)()
        }

        function y(t) {
            return t && k(E.dsos.symbols, t) ? E.dsos.symbols[t].shape : "circle"
        }

        function g(t, e) {
            return t && 999 !== t ? Math.pow(2 * E.dsos.size * W - t, E.dsos.exponent) : Math.pow(parseInt(e) * E.dsos.size * W / 7, .5)
        }

        function v(t) {
            var e = E.dsos.namesType,
                a = t.id;
            return "desig" !== e && k(ct, a) && k(ct[a], e) ? ct[a][e] : t.properties.desig
        }

        function M(t) {
            return k(lt, t) ? lt[t][E.stars.designationType] : ""
        }

        function w(t) {
            var e = E.stars.propernameType;
            return k(lt, t) ? k(lt[t], e) ? lt[t][e] : lt[t].name : ""
        }

        function x(t) {
            if (null === t) return .1;
            var e = E.stars.size * W * Math.exp(E.stars.exponent * (t + 2));
            return Math.max(e, .1)
        }

        function z(t) {
            return !E.stars.colors || isNaN(t) ? "" : Math.round(10 * t).toString()
        }

        function S(t) {
            return t.properties[E.constellations.namesType]
        }

        function T(t, e) {
            var a = e ? e * e : 121;
            return d3.svg.customSymbol().type("crescent").size(a).ratio(t.age)()
        }

        function j(t, e) {
            var a = e ? e * e : A(t.mag);
            return d3.svg.symbol().type("circle").size(a)()
        }

        function P(t) {
            var e = t.replace(/(^\D*)(\d+)(\D.+$)/i, "$2");
            return e = Math.round(W * e), t.replace(/(^\D*)(\d+)(\D.+$)/i, "$1" + e + "$3")
        }

        function A(t) {
            var e = t || 2,
                a = 4 * W * Math.exp(-.05 * (e + 2));
            return Math.max(a, 2)
        }

        function I(t) {
            var e = {
                type: "Feature",
                id: t.id,
                properties: {},
                geometry: {}
            };
            return e.properties.name = t[E.planets.namesType], "symbol" !== E.planets.symbolType && "letter" !== E.planets.symbolType || (e.properties.symbol = E.planets.symbols[e.id][E.planets.symbolType]), e.properties.mag = t.ephemeris.mag || 10, "lun" === e.id && (e.properties.age = t.ephemeris.age, e.properties.phase = t.ephemeris.phase), e.geometry.type = "Point", e.geometry.coordinates = t.ephemeris.pos, e
        }

        function q() {
            var t = "";
            for (var e in J) k(J, e) && (t += " ." + e + L(J[e]));
            return "/*<![CDATA[*/\n" + t + "\n/*]]>*/"
        }

        function L(t) {
            var e = " {";
            for (var a in t) k(t, a) && (e += a + ":" + t[a] + "; ");
            return e + "} "
        }
        var D, F, O = (d3.select("body").append("div").attr("id", "d3-celestial-svg").attr("style", "display: none"), d3.select("#d3-celestial-svg").append("svg")),
            _ = tt.metrics(),
            E = wt.set(),
            N = E.datapath,
            C = xt[E.projection],
            H = n(E.center),
            B = [-H[0], -H[1]],
            G = C.scale * _.width / 1024,
            U = tt.projection(E.projection).rotate(H).translate([_.width / 2, _.height / 2]).scale([_.scale]),
            W = E.adaptable ? Math.sqrt(_.scale / G) : 1,
            V = "" !== E.culture && "iau" !== E.culture ? E.culture : "";
        O.selectAll("*").remove();
        var R = O.append("defs");
        C.clip && U.clipAngle(90), D = d3.geo.circle().angle([179.95]).origin(B), O.attr("width", _.width).attr("height", _.height);
        for (var $ = ["background", "milkyWay", "milkyWayBg", "gridLines", "constBoundaries", "planesequatorial", "planesecliptic", "planesgalactic", "planessupergalactic", "constLines", "mapBorder", "stars", "dsos", "planets", "gridvaluesLon", "gridvaluesLat", "constNames", "starDesignations", "starNames", "dsoNames", "planetNames", "horizon", "daylight"], Y = {}, J = {}, K = 0; K < $.length; K++) Y[$[K]] = O.append("g").attr({
            id: $[K],
            ":inkscape:groupmode": "layer",
            ":inkscape:label": $[K]
        }), J[$[K]] = {};
        var Q = d3.geo.graticule().minorStep([15, 10]),
            Z = d3.geo.path().projection(U),
            X = d3.queue(2);
        if (Y.background.append("path").datum(D).attr("class", "background").attr("d", Z), J.background.fill = E.background.fill, E.lines.graticule.show) {
            if ("equatorial" === E.transform ? (Y.gridLines.append("path").datum(Q).attr("class", "gridLines").attr("d", Z), J.gridLines = i(E.lines.graticule)) : (tt.graticule(Y.gridLines, Z, E.transform), J.gridLines = i(E.lines.graticule)), k(E.lines.graticule, "lon") && E.lines.graticule.lon.pos.length > 0) {
                var et = {
                    type: "FeatureCollection",
                    features: u("lon", E.lines.graticule.lon.pos)
                };
                Y.gridvaluesLon.selectAll(".gridvalues_lon").data(et.features).enter().append("text").attr("transform", function(t, e) {
                    return r(t.geometry.coordinates)
                }).text(function(t) {
                    return t.properties.value
                }).attr({
                    dy: ".5em",
                    dx: "-.75em",
                    class: "gridvaluesLon"
                }), J.gridvaluesLon = c(E.lines.graticule.lon)
            }
            if (k(E.lines.graticule, "lat") && E.lines.graticule.lat.pos.length > 0) {
                var at = {
                    type: "FeatureCollection",
                    features: u("lat", E.lines.graticule.lat.pos)
                };
                Y.gridvaluesLat.selectAll(".gridvalues_lat").data(at.features).enter().append("text").attr("transform", function(t, e) {
                    return r(t.geometry.coordinates)
                }).text(function(t) {
                    return t.properties.value
                }).attr({
                    dy: "-.5em",
                    dx: "-.75em",
                    class: "gridvaluesLat"
                }), J.gridvaluesLat = c(E.lines.graticule.lat)
            }
        }
        for (var nt in E.lines) k(E.lines, nt) && "graticule" != nt && !1 !== E.lines[nt].show && (F = "planes" + nt, Y[F].append("path").datum(d3.geo.circle().angle([90]).origin(ht[nt])).attr("class", F).attr("d", Z), J[F] = i(E.lines[nt]));
        E.mw.show && X.defer(function(t) {
            d3.json(N + "mw.json", function(e, a) {
                e && t(e);
                var n = o(a, E.transform),
                    r = d(n);
                Y.milkyWay.selectAll(".mway").data(n.features).enter().append("path").attr("class", "milkyWay").attr("d", Z), J.milkyWay = i(E.mw.style), (!k(E.background, "opacity") || E.background.opacity > .95) && (Y.milkyWayBg.selectAll(".mwaybg").data(r.features).enter().append("path").attr("class", "milkyWayBg").attr("d", Z), J.milkyWayBg = {
                    fill: E.background.fill,
                    "fill-opacity": E.background.opacity
                }), t(null)
            })
        }), E.constellations.bounds && X.defer(function(t) {
            d3.json(N + s("constellations", "borders"), function(e, a) {
                e && t(e);
                var n = o(a, E.transform);
                if (tt.constellation) var r = new RegExp("\\b" + tt.constellation + "\\b");
                Y.constBoundaries.selectAll(".bounds").data(n.features).enter().append("path").attr("class", function(t) {
                    return tt.constellation && -1 !== t.ids.search(r) ? "constBoundariesSel" : "constBoundaries"
                }).attr("d", Z), J.constBoundaries = i(E.constellations.boundStyle), J.constBoundariesSel = {
                    fill: "none",
                    stroke: E.constellations.boundStyle.stroke,
                    "stroke-width": 1.5 * E.constellations.boundStyle.width,
                    "stroke-opacity": 1,
                    "stroke-dasharray": "none"
                }, t(null)
            })
        }), E.constellations.lines && X.defer(function(t) {
            d3.json(N + s("constellations", "lines"), function(e, a) {
                e && t(e);
                var n = o(a, E.transform);
                Y.constLines.selectAll(".lines").data(n.features).enter().append("path").attr("class", function(t) {
                    return "constLines" + t.properties.rank
                }).attr("d", Z);
                var r = k(E.constellations.lineStyle, "dash") ? E.constellations.lineStyle.dash.join(" ") : "none";
                J.constLines1 = {
                    fill: "none",
                    stroke: E.constellations.lineStyle.stroke[0],
                    "stroke-width": E.constellations.lineStyle.width[0],
                    "stroke-opacity": E.constellations.lineStyle.opacity[0],
                    "stroke-dasharray": r
                }, J.constLines2 = {
                    fill: "none",
                    stroke: E.constellations.lineStyle.stroke[1],
                    "stroke-width": E.constellations.lineStyle.width[1],
                    "stroke-opacity": E.constellations.lineStyle.opacity[1],
                    "stroke-dasharray": r
                }, J.constLines3 = {
                    fill: "none",
                    stroke: E.constellations.lineStyle.stroke[2],
                    "stroke-width": E.constellations.lineStyle.width[2],
                    "stroke-opacity": E.constellations.lineStyle.opacity[2],
                    "stroke-dasharray": r
                }, t(null)
            })
        }), X.defer(function(t) {
            var e = U.rotate();
            U.rotate([0, 0, 0]), Y.mapBorder.append("path").datum(Q.outline).attr("class", "mapBorder").attr("d", Z), J.mapBorder = {
                fill: "none",
                stroke: E.background.stroke,
                "stroke-width": E.background.width,
                "stroke-opacity": 1,
                "stroke-dasharray": "none"
            }, U.rotate(e), t(null)
        }), E.constellations.names && X.defer(function(t) {
            d3.json(N + s("constellations"), function(e, n) {
                e && t(e);
                var s = o(n, E.transform);
                Y.constNames.selectAll(".constnames").data(s.features.filter(function(t) {
                    return 1 === a(t.geometry.coordinates)
                })).enter().append("text").attr("class", function(t) {
                    return "constNames" + t.properties.rank
                }).attr("transform", function(t, e) {
                    return r(t.geometry.coordinates)
                }).text(function(t) {
                    return S(t)
                }), J.constNames1 = {
                    fill: E.constellations.nameStyle.fill[0],
                    "fill-opacity": E.constellations.nameStyle.opacity[0],
                    font: E.constellations.nameStyle.font[0],
                    "text-anchor": f(E.constellations.nameStyle.align)
                }, J.constNames2 = {
                    fill: E.constellations.nameStyle.fill[1],
                    "fill-opacity": E.constellations.nameStyle.opacity[1],
                    font: E.constellations.nameStyle.font[1],
                    "text-anchor": f(E.constellations.nameStyle.align)
                }, J.constNames3 = {
                    fill: E.constellations.nameStyle.fill[2],
                    "fill-opacity": E.constellations.nameStyle.opacity[2],
                    font: E.constellations.nameStyle.font[2],
                    "text-anchor": f(E.constellations.nameStyle.align)
                }, t(null)
            })
        }), E.stars.show && X.defer(function(t) {
            d3.json(N + E.stars.data, function(e, n) {
                e && t(e);
                var s = o(n, E.transform);
                Y.stars.selectAll(".stars").data(s.features.filter(function(t) {
                    return t.properties.mag <= E.stars.limit
                })).enter().append("path").attr("class", function(t) {
                    return "stars" + z(t.properties.bv)
                }).attr("d", Z.pointRadius(function(t) {
                    return t.properties ? x(t.properties.mag) : 1
                })), J.stars = i(E.stars.style);
                var l = kt.domain();
                for (K = b(l[1], 1); K <= b(l[0], 1); K += .1) J["stars" + Math.round(10 * K).toString()] = {
                    fill: kt(K)
                };
                E.stars.designation && (Y.starDesignations.selectAll(".stardesigs").data(s.features.filter(function(t) {
                    return t.properties.mag <= E.stars.designationLimit * W && 1 === a(t.geometry.coordinates)
                })).enter().append("text").attr("transform", function(t) {
                    return r(t.geometry.coordinates)
                }).text(function(t) {
                    return M(t.id)
                }).attr({
                    dy: ".85em",
                    dx: ".35em",
                    class: "starDesignations"
                }), J.starDesignations = c(E.stars.designationStyle)), E.stars.propername && (Y.starNames.selectAll(".starnames").data(s.features.filter(function(t) {
                    return t.properties.mag <= E.stars.propernameLimit * W && 1 === a(t.geometry.coordinates)
                })).enter().append("text").attr("transform", function(t) {
                    return r(t.geometry.coordinates)
                }).text(function(t) {
                    return w(t.id)
                }).attr({
                    dy: "-.5em",
                    dx: "-.35em",
                    class: "starNames"
                }), J.starNames = c(E.stars.propernameStyle)), t(null)
            })
        }), E.dsos.show && X.defer(function(t) {
            d3.json(N + E.dsos.data, function(e, n) {
                e && t(e);
                var s = o(n, E.transform);
                Y.dsos.selectAll(".dsos").data(s.features.filter(function(t) {
                    return 1 === a(t.geometry.coordinates) && (999 === t.properties.mag && Math.sqrt(parseInt(t.properties.dim)) > E.dsos.limit * W || 999 !== t.properties.mag && t.properties.mag <= E.dsos.limit)
                })).enter().append("path").attr("class", function(t) {
                    return "dsos" + t.properties.type
                }).attr("transform", function(t) {
                    return r(t.geometry.coordinates)
                }).attr("d", function(t) {
                    return m(t.properties)
                }), J.dsos = i(E.dsos.style);
                for (nt in E.dsos.symbols) k(E.dsos.symbols, nt) && (F = "dsos" + nt, J[F] = {
                    "fill-opacity": E.dsos.style.opacity,
                    "stroke-opacity": E.dsos.style.opacity
                }, k(E.dsos.symbols[nt], "stroke") ? (J[F].fill = "none", J[F].stroke = E.dsos.colors ? E.dsos.symbols[nt].stroke : E.dsos.style.stroke, J[F]["stroke-width"] = E.dsos.colors ? E.dsos.symbols[nt].width : E.dsos.style.width) : (J[F].stroke = "none", J[F].fill = E.dsos.colors ? E.dsos.symbols[nt].fill : E.dsos.style.fill));
                if (E.dsos.names) {
                    Y.dsoNames.selectAll(".dsonames").data(s.features.filter(function(t) {
                        return 1 === a(t.geometry.coordinates) && (999 == t.properties.mag && Math.sqrt(parseInt(t.properties.dim)) > E.dsos.nameLimit || 999 != t.properties.mag && t.properties.mag <= E.dsos.nameLimit)
                    })).enter().append("text").attr("class", function(t) {
                        return "dsoNames " + t.properties.type
                    }).attr("transform", function(t) {
                        return r(t.geometry.coordinates)
                    }).text(function(t) {
                        return v(t)
                    }).attr({
                        dy: "-.5em",
                        dx: ".35em"
                    }), J.dsoNames = {
                        "fill-opacity": E.dsos.style.opacity,
                        font: E.dsos.nameStyle.font,
                        "text-anchor": f(E.dsos.nameStyle.align)
                    };
                    for (nt in E.dsos.symbols) k(E.dsos.symbols, nt) && (J[nt] = {
                        fill: E.dsos.colors ? E.dsos.symbols[nt].fill : E.dsos.style.fill
                    })
                }
                t(null)
            })
        }), (E.location || E.formFields.location) && E.planets.show && tt.origin && X.defer(function(t) {
            var n = tt.date(),
                s = tt.origin(n).spherical(),
                o = {
                    type: "FeatureCollection",
                    features: []
                },
                i = {
                    type: "FeatureCollection",
                    features: []
                };
            if (tt.container.selectAll(".planet").each(function(t) {
                    var r = t.id(),
                        l = t(n).equatorial(s);
                    l.ephemeris.pos = e(l.ephemeris.pos, gt[E.transform]), 1 === a(l.ephemeris.pos) && ("lun" === r ? i.features.push(I(l)) : o.features.push(I(l)))
                }), "disk" === E.planets.symbolType ? Y.planets.selectAll(".planets").data(o.features).enter().append("path").attr("transform", function(t) {
                    return r(t.geometry.coordinates)
                }).attr("d", function(t) {
                    var e = k(E.planets.symbols[t.id], "size") ? (E.planets.symbols[t.id].size - 1) * W : null;
                    return j(t.properties, e)
                }).attr("class", function(t) {
                    return "planets " + t.id
                }) : Y.planets.selectAll(".planets").data(o.features).enter().append("text").attr("transform", function(t) {
                    return r(t.geometry.coordinates)
                }).text(function(t) {
                    return t.properties.symbol
                }).attr("class", function(t) {
                    return "planets " + t.id
                }).attr({
                    dy: ".35em"
                }), i.features.length > 0)
                if ("letter" === E.planets.symbolType) Y.planets.selectAll(".moon").data(i.features).enter().append("text").attr("transform", function(t) {
                    return r(t.geometry.coordinates)
                }).text(function(t) {
                    return t.properties.symbol
                }).attr("class", function(t) {
                    return "planets " + t.id
                }).attr({
                    dy: ".35em"
                });
                else {
                    var l = k(E.planets.symbols.lun, "size") ? (E.planets.symbols.lun.size - 1) * W : 11 * W;
                    Y.planets.selectAll(".dmoon").data(i.features).enter().append("path").attr("class", "darkluna").attr("transform", function(t) {
                        return r(t.geometry.coordinates)
                    }).attr("d", function(t) {
                        return d3.svg.symbol().type("circle").size(l * l)()
                    }), Y.planets.selectAll(".moon").data(i.features).enter().append("path").attr("class", function(t) {
                        return "planets " + t.id
                    }).attr("transform", function(t) {
                        return r(t.geometry.coordinates)
                    }).attr("d", function(t) {
                        return T(t.properties, l)
                    })
                } J.planets = c(E.planets.symbolStyle), J.planets.font = P(E.planets.symbolStyle.font), J.darkluna = {
                fill: "#557"
            };
            for (nt in E.planets.symbols) k(E.planets.symbols, nt) && (J[nt] = {
                fill: E.planets.symbols[nt].fill
            });
            E.planets.names && (Y.planetNames.selectAll(".planetnames").data(o.features).enter().append("text").attr("transform", function(t) {
                return r(t.geometry.coordinates)
            }).text(function(t) {
                return t.properties.name
            }).attr({
                dy: ".85em",
                dx: "-.35em"
            }).attr("class", function(t) {
                return "planetNames " + t.id
            }), i.features.length > 0 && Y.planetNames.selectAll(".moonname").data(i.features).enter().append("text").attr("transform", function(t) {
                return r(t.geometry.coordinates)
            }).text(function(t) {
                return t.properties.name
            }).attr({
                dy: ".85em",
                dx: "-.35em"
            }).attr("class", function(t) {
                return "planetNames " + t.id
            })), J.planetNames = c(E.planets.nameStyle), t(null)
        }), (E.location || E.formFields.location) && E.daylight.show && C.clip && X.defer(function(t) {
            var e = l("sol");
            if (e) {
                var n = tt.zenith(),
                    r = e.ephemeris.pos,
                    s = d3.geo.distance(n, r),
                    o = U(r),
                    i = d3.geo.circle().angle([179.95]).origin(r);
                Y.daylight.append("path").datum(i).attr("class", "daylight").attr("d", Z), J.daylight = p(s, o), 1 === a(r) && s < mt && Y.daylight.append("circle").attr("cx", o[0]).attr("cy", o[1]).attr("r", 5).style("fill", "#fff")
            }
            t(null)
        }), (E.location || E.formFields.location) && E.horizon.show && !C.clip && X.defer(function(t) {
            var e = d3.geo.circle().angle([90]).origin(tt.nadir());
            Y.horizon.append("path").datum(e).attr("class", "horizon").attr("d", Z), J.horizon = i(E.horizon), t(null)
        }), tt.data.length > 0 && tt.data.forEach(function(t) {
            k(t, "save") && X.defer(function(e) {
                t.save(), e(null)
            })
        }), X.await(function(e) {
            if (e) throw e;
            var a = d3.select("#d3-celestial-svg svg").attr("title", "D3-Celestial").attr("version", 1.1).attr("encoding", "UTF-8").attr("xmlns", "http://www.w3.org/2000/svg").attr("xmlns:xlink", "http://www.w3.org/1999/xlink").attr("xmlns:sodipodi", "http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd").attr("xmlns:inkscape", "http://www.inkscape.org/namespaces/inkscape").attr("viewBox", " 0 0 " + _.width + " " + _.height);
            if (R.append("style").attr("type", "text/css").text(q()), t) {
                var n = new Blob([a.node().outerHTML], {
                        type: "image/svg+xml;charset=utf-8"
                    }),
                    r = d3.select("body").append("a").node();
                r.download = t || "d3-celestial.svg", r.rel = "noopener", r.href = URL.createObjectURL(n), r.click(), d3.select(r).remove()
            } else null !== Ct && Ct(a.node().outerHTML);
            d3.select("#d3-celestial-svg").remove()
        })
    }
    var $, Y, J, K, Q, Z, X, tt = {
            version: "0.7.35",
            container: null,
            data: []
        },
        et = .035,
        at = 1.4,
        nt = 2e3,
        rt = 2500,
        st = 1500,
        ot = 10,
        it = 1,
        lt = {},
        ct = {};
    if (tt.display = function(a) {
            function r() {
                O(Bt.clip), qt.append("path").datum(ae.outline).attr("class", "outline"), qt.append("path").datum(Z).attr("class", "horizon"), qt.append("path").datum(X).attr("class", "daylight"), "equatorial" === $.transform ? ae.minorStep([15, 10]) : ae.minorStep([10, 10]);
                for (var t in $.lines) k($.lines, t) && ("graticule" === t ? (qt.append("path").datum(ae).attr("class", "graticule"), k($.lines.graticule, "lon") && $.lines.graticule.lon.pos.length > 0 && qt.selectAll(J + " .gridvalues_lon").data(u("lon", $.lines.graticule.lon.pos)).enter().append("path").attr("class", "graticule_lon"), k($.lines.graticule, "lat") && $.lines.graticule.lat.pos.length > 0 && qt.selectAll(J + " .gridvalues_lat").data(u("lat", $.lines.graticule.lat.pos)).enter().append("path").attr("class", "graticule_lat")) : qt.append("path").datum(d3.geo.circle().angle([90]).origin(e(ht[t], gt[$.transform]))).attr("class", t));
                d3.json(Zt + "mw.json", function(t, e) {
                    if (t) return window.alert("Data file could not be loaded or doesn't exist. See readme.md"), console.warn(t);
                    var a = o(e, $.transform),
                        n = d(a);
                    qt.selectAll(J + " .mway").data(a.features).enter().append("path").attr("class", "mw"), qt.selectAll(J + " .mwaybg").data(n.features).enter().append("path").attr("class", "mwbg"), y()
                }), d3.json(Zt + _("constellations"), function(t, e) {
                    if (t) return console.warn(t);
                    var a = o(e, $.transform);
                    qt.selectAll(J + " .constnames").data(a.features).enter().append("text").attr("class", "constname"), tt.constellations = c(a), y()
                }), d3.json(Zt + _("constellations", "borders"), function(t, e) {
                    if (t) return console.warn(t);
                    var a = o(e, $.transform);
                    qt.selectAll(J + " .bounds").data(a.features).enter().append("path").attr("class", "boundaryline"), y()
                }), d3.json(Zt + _("constellations", "lines"), function(t, e) {
                    if (t) return console.warn(t);
                    var a = o(e, $.transform);
                    qt.selectAll(J + " .lines").data(a.features).enter().append("path").attr("class", "constline"), U(), y()
                }), d3.json(Zt + $.stars.data, function(t, e) {
                    if (t) return console.warn(t);
                    var a = o(e, $.transform);
                    qt.selectAll(J + " .stars").data(a.features).enter().append("path").attr("class", "star"), y()
                }), d3.json(Zt + _("starnames"), function(t, e) {
                    if (t) return console.warn(t);
                    Object.assign(lt, e), y()
                }), d3.json(Zt + $.dsos.data, function(t, e) {
                    if (t) return console.warn(t);
                    var a = o(e, $.transform);
                    qt.selectAll(J + " .dsos").data(a.features).enter().append("path").attr("class", "dso"), y()
                }), d3.json(Zt + _("dsonames"), function(t, e) {
                    if (t) return console.warn(t);
                    Object.assign(ct, e), y()
                }), d3.json(Zt + _("planets"), function(t, e) {
                    if (t) return console.warn(t);
                    var a = i(e, $.transform);
                    qt.selectAll(J + " .planets").data(a).enter().append("path").attr("class", "planet"), y()
                }), tt.data.length > 0 && tt.data.forEach(function(t) {
                    k(t, "file") ? d3.json(t.file, t.callback) : setTimeout(t.callback, 0)
                }, this), $.lang && "" != $.lang && p(tt.setLanguage($.lang))
            }

            function s(t) {
                if (t && 1 !== t) {
                    var e = Y.scale(),
                        a = e * t,
                        n = K.scaleExtent(),
                        r = st * Math.sqrt(Math.abs(1 - t));
                    if (a < n[0] && (a = n[0]), a > n[1] && (a = n[1]), !0 === $.disableAnimations) return Y.scale(a), K.scale(a), y(), 0;
                    var s = d3.interpolateNumber(e, a);
                    return d3.select({}).transition().duration(r).tween("scale", function() {
                        return function(t) {
                            var e = s(t);
                            Y.scale(e), y()
                        }
                    }).transition().duration(0).tween("scale", function() {
                        K.scale(a), y()
                    }), r
                }
            }

            function p(t) {
                $ = wt.set(t), y()
            }

            function h(t) {
                var e, a, r, s = $.center,
                    o = Y.rotate(),
                    i = Y.scale(),
                    l = nt,
                    c = !1,
                    d = $.orientationfixed;
                b(o[1], 1) === -b(t.center[1], 1) && (c = !0), $ = $.set(t);
                var p = b(d3.geo.distance(s, $.center), 2),
                    u = d3.geo.distance([s[2], 0], [$.center[2], 0]);
                return p < et && u < et || !0 === $.disableAnimations ? (Qt = n($.center), Y.rotate(Qt), y(), 0) : (a = i > Vt * at ? d3.interpolateNumber(i, Vt) : function() {
                    return i
                }, r = 0 === u ? function() {
                    return o[2]
                } : q(s[2], $.center[2]), p > 3.14 && ($.center[0] -= .01), $.orientationfixed = !1, e = 0 === p ? function() {
                    return $.center
                } : d3.geo.interpolate(s, $.center), l = 0 !== p ? l * p : l * u, d3.select({}).transition().duration(l).tween("center", function() {
                    return function(t) {
                        var s = n(e(t));
                        s[2] = r(t);
                        var i = a(t < .5 ? t : 1 - t);
                        c && (s[1] = o[1]), Y.scale(i), Y.rotate(s), y()
                    }
                }).transition().duration(0).tween("center", function() {
                    $.orientationfixed = d, Qt = n($.center), Y.rotate(Qt), y()
                }), l)
            }

            function f(t) {
                Nt = St(), ($.width !== Nt || t) && (Ut = Nt / Gt, Ct = x($.background.width) ? Nt + $.background.width : Nt, Wt = Math.round(Ct / Gt), Vt = Bt.scale * Nt / 1024, Xt.style("width", M(Ct)).style("height", M(Wt)).attr("width", Ct * Ht).attr("height", Wt * Ht), K.scaleExtent([Vt, Vt * ot]).scale(Vt * it), Y.translate([Ct / 2, Wt / 2]).scale(Vt * it), Ot && (Ot.style.height = M(Ut)), Vt *= it, y())
            }

            function m(e) {
                var a = jt(e.projection, e.projectionRatio);
                if (a) {
                    var n = Y.rotate(),
                        r = Y.center(),
                        o = Y.scale(),
                        i = K.scaleExtent(),
                        l = tt.projection($.projection).center(r).translate([Ct / 2, Wt / 2]).scale([i[0]]),
                        c = rt,
                        d = 0,
                        p = d3.interpolateNumber(Gt, a.ratio);
                    Bt.clip == a.clip && !0 !== $.disableAnimations || (c = 0), O(a.clip);
                    var u = tt.projection(e.projection).center(r).translate([Ct / 2, Ct / a.ratio / 2]).scale([a.scale * Nt / 1024]),
                        h = $.adaptable;
                    return o > i[0] ? (d = s(.1), setTimeout(m, d, e), d + c) : (($.location || $.formFields.location) && (F("horizon-show", a.clip), F("daylight-show", !a.clip)), Y = t(l, u), $.adaptable = !1, d3.select({}).transition().duration(c).tween("projection", function() {
                        return function(t) {
                            Y.alpha(t).rotate(n), Q.projection(Y), O(a.clip), Gt = p(t), Ut = Nt / Gt, Xt.style("width", M(Ct)).style("height", M(Wt)).attr("width", Ct * Ht).attr("height", Wt * Ht), Ot && (Ot.style.height = M(Wt)), y()
                        }
                    }).transition().duration(0).tween("projection", function() {
                        Bt = a, Gt = Bt.ratio, Ut = Nt / Bt.ratio, Wt = x($.background.width) ? Ut + $.background.width : Ut, Vt = Bt.scale * Nt / 1024, Xt.style("width", M(Ct)).style("height", M(Wt)).attr("width", Ct * Ht).attr("height", Wt * Ht), Ot && (Ot.style.height = M(Wt)), $.projection = e.projection, Y = tt.projection(e.projection).rotate(n).translate([Ct / 2, Wt / 2]).scale(Vt * it), Q.projection(Y), O(Bt.clip), K.projection(Y).scaleExtent([Vt, Vt * ot]).scale(Vt * it), $.adaptable = h, Vt *= it, y()
                    }), c)
                }
            }

            function y() {
                var t = Y.rotate();
                ee.setTransform(Ht, 0, 0, Ht, 0, 0), $.adaptable && (Kt = Math.sqrt(Y.scale() / Vt)), Kt || (Kt = 1), Rt = $.stars.size, Yt = $.stars.exponent, $t = $.dsos.size || Rt, Jt = $.dsos.exponent, $.orientationfixed && $.center.length > 2 && (t[2] = $.center[2], Y.rotate(t)), $.center = [-t[0], -t[1], t[2]], C($.center, $.transform), bt(), w(), $.mw.show && (qt.selectAll(J + " .mw").each(function(t) {
                    T($.mw.style), Q(t), ee.fill()
                }), "supergalactic" !== $.transform && $.background.opacity > .95 && qt.selectAll(J + " .mwbg").each(function(t) {
                    T($.background), Q(t), ee.fill()
                }));
                for (var a in $.lines) k($.lines, a) && !0 === $.lines[a].show && (T($.lines[a]), qt.selectAll(J + " ." + a).attr("d", Q), ee.stroke());
                if (k($.lines.graticule, "lon") && (j($.lines.graticule.lon), qt.selectAll(J + " .graticule_lon").each(function(t, e) {
                        if (S(t.geometry.coordinates)) {
                            var a = Y(t.geometry.coordinates);
                            vt(a, t.properties.orientation), ee.fillText(t.properties.value, a[0], a[1])
                        }
                    })), k($.lines.graticule, "lat") && (j($.lines.graticule.lat), qt.selectAll(J + " .graticule_lat").each(function(t, e) {
                        if (S(t.geometry.coordinates)) {
                            var a = Y(t.geometry.coordinates);
                            vt(a, t.properties.orientation), ee.fillText(t.properties.value, a[0], a[1])
                        }
                    })), $.constellations.bounds && (qt.selectAll(J + " .boundaryline").each(function(t) {
                        if (T($.constellations.boundStyle), tt.constellation) {
                            var e = new RegExp("\\b" + tt.constellation + "\\b"); - 1 !== t.ids.search(e) && (ee.lineWidth *= 1.5, ee.globalAlpha = 1, ee.setLineDash([]))
                        }
                        Q(t), ee.stroke()
                    }), ee.setLineDash([])), $.constellations.lines && qt.selectAll(J + " .constline").each(function(t) {
                        P(t.properties.rank, $.constellations.lineStyle), Q(t), ee.stroke()
                    }), w(!0), $.constellations.names && qt.selectAll(J + " .constname").each(function(t) {
                        if (S(t.geometry.coordinates)) {
                            P(t.properties.rank, $.constellations.nameStyle);
                            var e = Y(t.geometry.coordinates);
                            ee.fillText(ut(t), e[0], e[1])
                        }
                    }), $.stars.show && (T($.stars.style), qt.selectAll(J + " .star").each(function(t) {
                        if (S(t.geometry.coordinates) && t.properties.mag <= $.stars.limit) {
                            var e = Y(t.geometry.coordinates),
                                a = dt(t);
                            ee.fillStyle = pt(t), ee.beginPath(), ee.arc(e[0], e[1], a, 0, 2 * Math.PI), ee.closePath(), ee.fill(), $.stars.designation && t.properties.mag <= $.stars.designationLimit * Kt && (j($.stars.designationStyle), ee.fillText(W(t.id), e[0] + a, e[1])), $.stars.propername && t.properties.mag <= $.stars.propernameLimit * Kt && (j($.stars.propernameStyle), ee.fillText(R(t.id), e[0] - a, e[1]))
                        }
                    })), $.dsos.show && qt.selectAll(J + " .dso").each(function(t) {
                        if (S(t.geometry.coordinates) && E(t.properties, $.dsos.limit)) {
                            var e = Y(t.geometry.coordinates),
                                a = t.properties.type;
                            T(!0 === $.dsos.colors ? $.dsos.symbols[a] : $.dsos.style);
                            var n = N(t, e);
                            k($.dsos.symbols[a], "stroke") ? ee.stroke() : ee.fill(), $.dsos.names && E(t.properties, $.dsos.nameLimit * Kt) && (j($.dsos.nameStyle), !0 === $.dsos.colors && (ee.fillStyle = $.dsos.symbols[a].fill), ee.fillText(G(t), e[0] + n, e[1] - n))
                        }
                    }), ($.location || $.formFields.location) && $.planets.show && tt.origin) {
                    var n = tt.date(),
                        r = tt.origin(n).spherical();
                    qt.selectAll(J + " .planet").each(function(t) {
                        var a = t.id(),
                            s = 12 * Kt,
                            o = t(n).equatorial(r),
                            i = e(o.ephemeris.pos, gt[$.transform]);
                        if (S(i)) {
                            var l = Y(i),
                                c = $.planets.symbols[a];
                            if ("letter" === $.planets.symbolType ? (j($.planets.symbolStyle), ee.fillStyle = c.fill, ee.fillText(c.letter, l[0], l[1])) : "lun" === a ? (k(c, "size") && x(c.size) && (s = c.size * Kt), ee.fillStyle = c.fill, Tt.symbol().type("crescent").size(s * s).age(o.ephemeris.age).position(l)(ee)) : "disk" === $.planets.symbolType ? (s = k(c, "size") && x(c.size) ? c.size * Kt : ft(o.ephemeris), ee.fillStyle = c.fill, Tt.symbol().type("circle").size(s * s).position(l)(ee), ee.fill()) : "symbol" === $.planets.symbolType && (j($.planets.symbolStyle), ee.font = yt($.planets.symbolStyle.font), ee.fillStyle = c.fill, ee.fillText(c[$.planets.symbolType], l[0], l[1])), $.planets.names) {
                                var d = o[$.planets.namesType];
                                j($.planets.nameStyle), ee.fillStyle = c.fill, ee.fillText(d, l[0] - s / 2, l[1] + s / 2)
                            }
                        }
                    })
                }
                if (tt.data.length > 0 && tt.data.forEach(function(t) {
                        t.redraw()
                    }), ($.location || $.formFields.location) && $.daylight.show && Bt.clip) {
                    var s = l("sol");
                    if (s) {
                        var o = tt.zenith(),
                            i = s.ephemeris.pos,
                            c = d3.geo.distance(o, i),
                            d = Y(i);
                        X.origin(i), A(c, d), qt.selectAll(J + " .daylight").datum(X).attr("d", Q), ee.fill(), ee.fillStyle = "#fff", S(i) && (ee.beginPath(), ee.arc(d[0], d[1], 6, 0, 2 * Math.PI), ee.closePath(), ee.fill())
                    }
                }($.location || $.formFields.location) && $.horizon.show && !Bt.clip && (Z.origin(tt.nadir()), T($.horizon), qt.selectAll(J + " .horizon").datum(Z).attr("d", Q), ee.fill(), $.horizon.stroke && ee.stroke()), $.controls && D(Y.scale()), Mt && tt.runCallback()
            }

            function w(t) {
                var e = Y.rotate();
                jt($.projection, a.projectionRatio);
                Y.rotate([0, 0]), T($.background), qt.selectAll(J + " .outline").attr("d", Q), !0 === t ? (ee.globalAlpha = 1, ee.stroke()) : ee.fill(), Y.rotate(e)
            }

            function S(t) {
                return Bt.clip && d3.geo.distance($.center, t) > mt ? 0 : 1
            }

            function T(t) {
                ee.fillStyle = t.fill || null, ee.strokeStyle = t.stroke || null, ee.lineWidth = t.width || null, ee.globalAlpha = null !== t.opacity ? t.opacity : 1, ee.font = t.font || null, k(t, "dash") ? ee.setLineDash(t.dash) : ee.setLineDash([]), ee.beginPath()
            }

            function j(t) {
                ee.fillStyle = t.fill, ee.textAlign = t.align || "left", ee.textBaseline = t.baseline || "bottom", ee.globalAlpha = null !== t.opacity ? t.opacity : 1, ee.font = t.font
            }

            function P(t, e) {
                t = t || 1, ee.fillStyle = z(e.fill) ? e.fill[t - 1] : null, ee.strokeStyle = z(e.stroke) ? e.stroke[t - 1] : null, ee.lineWidth = z(e.width) ? e.width[t - 1] : null, ee.globalAlpha = z(e.opacity) ? e.opacity[t - 1] : 1, ee.font = z(e.font) ? e.font[t - 1] : null, k(e, "dash") ? ee.setLineDash(e.dash) : ee.setLineDash([]), ee.textAlign = e.align || "left", ee.textBaseline = e.baseline || "bottom", ee.beginPath()
            }

            function A(t, e) {
                var a, n, r, s;
                if (t > 1.885) return ee.fillStyle = "transparent", void(ee.globalAlpha = 0);
                t <= 1.36 ? (n = "#daf1fa", r = "#93d7f0", s = "#57c0e8", a = -(1.36 - t) / 10) : (a = (t - 1.36) / (1.885 - 1.36), n = d3.interpolateLab("#daf1fa", "#e8c866")(a), r = d3.interpolateLab("#93c7d0", "#ff854a")(a), s = d3.interpolateLab("#57b0c8", "#6caae2")(a));
                var o = ee.createRadialGradient(e[0], e[1], 0, e[0], e[1], 300);
                o.addColorStop(0, n), o.addColorStop(.2 + .4 * a, r), o.addColorStop(1, s), ee.fillStyle = o, ee.globalAlpha = .9 * (1 - I(a, 1.4))
            }

            function I(t, e) {
                return (Math.pow(Math.E, t * e) - 1) / (Math.pow(Math.E, e) - 1)
            }

            function D(t) {
                var e = v("celestial-zoomin"),
                    a = v("celestial-zoomout"),
                    n = Bt.scale * Nt / 1024;
                e && a && (e.disabled = t >= n * ot * .99, a.disabled = t <= n)
            }

            function O(t) {
                t ? Y.clipAngle(90) : Y.clipAngle(null)
            }

            function _(t, e, a) {
                var n = k(zt[t], te) ? "." + te : "";
                return a = a ? "." + a : ".json", e = e ? "." + e : "", t + e + n + a
            }

            function E(t, e) {
                return 999 === t.mag && Math.sqrt(parseInt(t.dim)) > e || 999 !== t.mag && t.mag <= e
            }

            function N(t, e) {
                var a = t.properties,
                    n = B(a) || 9,
                    r = H(a.type);
                return Tt.symbol().type(r).size(n).position(e)(ee), Math.sqrt(n) / 2
            }

            function H(t) {
                return t && k($.dsos.symbols, t) ? $.dsos.symbols[t].shape : "circle"
            }

            function B(t) {
                return t.mag && 999 !== t.mag ? Math.pow(2 * $t * Kt - t.mag, Jt) : Math.pow(parseInt(t.dim) * $t * Kt / 7, .5)
            }

            function G(t) {
                var e = $.dsos.namesType,
                    a = t.id;
                return "desig" !== e && k(ct, a) && k(ct[a], e) ? ct[a][e] : t.properties.desig
            }

            function W(t) {
                return k(lt, t) ? lt[t][$.stars.designationType] : ""
            }

            function R(t) {
                var e = $.stars.propernameType;
                return k(lt, t) ? k(lt[t], e) ? lt[t][e] : lt[t].name : ""
            }

            function dt(t) {
                var e = t.properties.mag;
                if (null === e) return .1;
                var a = Rt * Kt * Math.exp(Yt * (e + 2));
                return Math.max(a, .1)
            }

            function pt(t) {
                var e = t.properties.bv;
                return !$.stars.colors || isNaN(e) ? $.stars.style.fill : kt(e)
            }

            function ut(t) {
                return t.properties[$.constellations.namesType]
            }

            function ft(t) {
                var e = t.mag;
                if (null === e) return 2;
                var a = 4 * Kt * Math.exp(-.05 * (e + 2));
                return Math.max(a, 2)
            }

            function yt(t) {
                var e = t.replace(/(^\D*)(\d+)(\D.+$)/i, "$2");
                return e = Math.round(Kt * e), t.replace(/(^\D*)(\d+)(\D.+$)/i, "$1" + e + "$3")
            }

            function vt(t, e) {
                for (var a = e.split(""), n = "center", r = "middle", s = a.length - 1; s >= 0; s--) switch (a[s]) {
                    case "N":
                        r = "bottom";
                        break;
                    case "S":
                        r = "top";
                        break;
                    case "E":
                        n = "left", t[0] += 2;
                        break;
                    case "W":
                        n = "right", t[0] -= 2
                }
                return ee.textAlign = n, ee.textBaseline = r, t
            }

            function bt() {
                ee.clearRect(0, 0, Ct + Et[0], Wt + Et[1])
            }

            function St() {
                return x($.width) && $.width > 0 ? $.width : Ot ? Ot.getBoundingClientRect().width - 2 * Et[0] : window.getBoundingClientRect().width - 2 * Et[0]
            }

            function jt(t, e) {
                if (k(xt, t)) {
                    var a = xt[t];
                    return k(a, "ratio") || (a.ratio = 2), a.ratio = e || a.ratio, a
                }
            }

            function Pt() {
                if (Lt && !(Lt.length < 1)) {
                    var t, e = Lt[Dt];
                    switch (e.param) {
                        case "projection":
                            t = m({
                                projection: e.value
                            });
                            break;
                        case "center":
                            t = h({
                                center: e.value
                            });
                            break;
                        case "zoom":
                            t = s(e.value)
                    }
                    e.callback && setTimeout(e.callback, t), Dt++, !0 === Ft && Dt === Lt.length && (Dt = 0), t = 0 === e.duration || e.duration < t ? t : e.duration, Dt < Lt.length && (It = setTimeout(Pt, t))
                }
            }

            function At() {
                clearTimeout(It)
            }
            var It, qt = tt.container,
                Lt = [],
                Dt = 0,
                Ft = !1;
            $ = wt.set(a).applyDefaults(a), x($.zoomextend) && (ot = $.zoomextend), x($.zoomlevel) && (it = $.zoomlevel);
            var Ot = document.getElementById($.container);
            if (Ot) {
                J = "#" + $.container;
                var _t = window.getComputedStyle(Ot, null);
                parseInt(_t.width) || $.width || (Ot.style.width = M(Ot.parentNode.clientWidth))
            } else J = "body", Ot = null;
            var Et = [16, 16],
                Nt = St(),
                Ct = x($.background.width) ? Nt + $.background.width : Nt,
                Ht = window.devicePixelRatio || 1,
                Bt = jt($.projection, $.projectionRatio);
            if (Bt) {
                $.lines.graticule.lat && "outline" === $.lines.graticule.lat.pos[0] && (Bt.scale -= 2);
                var Gt = Bt.ratio,
                    Ut = Math.round(Nt / Gt),
                    Wt = Math.round(Ct / Gt),
                    Vt = Bt.scale * Nt / 1024,
                    Rt = $.stars.size,
                    $t = $.dsos.size || Rt,
                    Yt = $.stars.exponent,
                    Jt = $.dsos.exponent || Yt,
                    Kt = 1,
                    Qt = n($.center),
                    Zt = $.datapath;
                "body" !== J && (Ot.style.height = M(Wt)), Y = tt.projection($.projection).rotate(Qt).translate([Ct / 2, Wt / 2]).scale(Vt * it), K = d3.geo.zoom().projection(Y).center([Ct / 2, Wt / 2]).scaleExtent([Vt, Vt * ot]).on("zoom.redraw", y), Vt *= it;
                var Xt = d3.select(J).selectAll("canvas"),
                    te = "" !== $.culture && "iau" !== $.culture ? $.culture : "";
                0 === Xt[0].length && (Xt = d3.select(J).append("canvas")), Xt.style("width", M(Ct)).style("height", M(Wt)).attr("width", Ct * Ht).attr("height", Wt * Ht);
                var ee = Xt.node().getContext("2d");
                ee.setTransform(Ht, 0, 0, Ht, 0, 0);
                var ae = d3.geo.graticule().minorStep([15, 10]);
                Q = d3.geo.path().projection(Y).context(ee), qt ? qt.selectAll(J + " *").remove() : qt = d3.select(J).append("container"), $.interactive ? (Xt.call(K), d3.select(J).on("dblclick", function() {
                    return s(1.5625), !1
                })) : Xt.attr("style", "cursor: default!important"), O(Bt.clip), d3.select(window).on("resize", f), !0 === $.interactive && !0 === $.controls && null === v("celestial-zoomin") && (d3.select(J).append("input").attr("type", "button").attr("id", "celestial-zoomin").attr("value", "+").on("click", function() {
                    return s(1.25), !1
                }), d3.select(J).append("input").attr("type", "button").attr("id", "celestial-zoomout").attr("value", "−").on("click", function() {
                    return s(.8), !1
                })), Z = d3.geo.circle().angle([90]), X = d3.geo.circle().angle([179.9]), L($), null === v("error") && d3.select("body").append("div").attr("id", "error"), null === v("loc") ? V($) : !0 === $.location && "zenith" === $.follow && h({
                    center: tt.zenith()
                }), !0 !== $.location && !0 !== $.formFields.location || (d3.select(J + " #location").style("display", "inline-block"), F("horizon-show", Bt.clip), F("daylight-show", !Bt.clip)), this.container = qt, this.clip = S, this.map = Q, this.mapProjection = Y, this.context = ee, this.metrics = function() {
                    return {
                        width: Nt,
                        height: Ut,
                        margin: Et,
                        scale: Y.scale()
                    }
                }, this.setStyle = T, this.setTextStyle = j, this.setStyleA = P, this.setConstStyle = function(t, e) {
                    var a = g(e);
                    ee.font = a[t]
                }, this.symbol = Tt.symbol, this.dsoSymbol = N, this.redraw = y, this.resize = function(t) {
                    return void 0 !== t && (k(t, "width") ? $.width = t.width : x(t) && ($.width = t)), f(!0), $.width
                }, this.reload = function(t) {
                    var e;
                    t && Object.assign($, wt.set(t)), "center" === $.follow && k($, "center") ? e = n($.center) : "zenith" === $.follow && (e = n(tt.zenith())), e && Y.rotate(e), qt.selectAll(J + " *").remove(), r()
                }, this.apply = function(t) {
                    p(t)
                }, this.reproject = function(t) {
                    return m(t)
                }, this.rotate = function(t) {
                    return t ? h(t) : $.center
                }, this.zoomBy = function(t) {
                    return t ? s(t) : Y.scale() / Vt
                }, this.color = function(t) {
                    return t && k($.dsos.symbols, t) ? $.dsos.symbols[t].fill : "#000"
                }, this.starColor = pt, this.animate = function(t, e) {
                    t && (Lt = t, Dt = 0, Ft = !!e, Pt())
                }, this.stop = function(t) {
                    At(), !0 === t && (Lt = [])
                }, this.go = function(t) {
                    Lt.length < 1 || (t && t < Lt.length && (Dt = t), Pt())
                }, r()
            }
        }, "object" == typeof module && module.exports) {
        var dt = require("./lib/d3.js"),
            pt = require("./lib/d3.geo.projection.js");
        module.exports = {
            Celestial: function() {
                return tt
            },
            d3: function() {
                return dt
            },
            "d3.geo.projection": function() {
                return pt
            }
        }
    }
    tt.projection = function(t) {
        var e, a, n;
        if (!k(xt, t)) throw new Error("Projection not supported: " + t);
        return e = xt[t], a = null !== e.arg ? d3.geo[t].raw(e.arg) : d3.geo[t].raw, n = function(t, e) {
            return a(-t, e)
        }, n.invert = function(t, e) {
            try {
                var n = a.invert(t, e);
                return n[0] = n && -n[0], n
            } catch (t) {
                console.log(t)
            }
        }, d3.geo.projection(n)
    };
    var ut = {
            equatorial: [0, 0, 0],
            ecliptic: [0, 0, 23.4393],
            galactic: [93.5949, 28.9362, -58.5988],
            supergalactic: [137.31, 59.5283, 57.7303]
        },
        ht = {
            equatorial: [0, 90],
            ecliptic: [-90, 66.5607],
            galactic: [-167.1405, 27.1283],
            supergalactic: [-76.2458, 15.7089]
        };
    tt.eulerAngles = function() {
        return ut
    }, tt.poles = function() {
        return ht
    };
    var ft = 2 * Math.PI,
        mt = Math.PI / 2,
        yt = Math.PI / 180,
        gt = {
            ecliptic: [-90, 23.4393, 90],
            "inverse ecliptic": [90, 23.4393, -90],
            galactic: [-167.1405, 62.8717, 122.9319],
            "inverse galactic": [122.9319, 62.8717, -167.1405],
            supergalactic: [283.7542, 74.2911, 26.4504],
            "inverse supergalactic": [26.4504, 74.2911, 283.7542],
            init: function() {
                for (var t in this) this[t].constructor == Array && (this[t] = this[t].map(function(t) {
                    return t * yt
                }))
            },
            add: function(t, e) {
                if (e && t && 3 === e.length && !this.hasOwnProperty(t)) return this[t] = e.map(function(t) {
                    return t * yt
                }), this[t]
            }
        };
    gt.init(), tt.euler = function() {
        return gt
    };
    var vt = function(t, e, a) {
        var n = r(t, a[1]) - e[0];
        n < 0 && (n += 360), n *= yt;
        var s = e[1] * yt,
            o = a[0] * yt,
            i = Math.asin(Math.sin(s) * Math.sin(o) + Math.cos(s) * Math.cos(o) * Math.cos(n)),
            l = Math.acos((Math.sin(s) - Math.sin(i) * Math.sin(o)) / (Math.cos(i) * Math.cos(o)));
        return Math.sin(n) > 0 && (l = 2 * Math.PI - l), [i / yt, l / yt, 0]
    };
    vt.inverse = function(t, e, a) {
        var n = e[0] * yt,
            s = e[1] * yt,
            o = a[0] * yt,
            i = Math.asin(Math.sin(n) * Math.sin(o) + Math.cos(n) * Math.cos(o) * Math.cos(s)),
            l = ((Math.sin(n) - Math.sin(i) * Math.sin(o)) / (Math.cos(i) * Math.cos(o))).toFixed(6);
        return l = Math.acos(l), l /= yt, [r(t, a[1]) - l, i / yt, 0]
    }, tt.horizontal = vt, tt.ha = function(t, e, a) {
        var n = r(t, e) - a;
        return n < 180 && (n += 360), n
    };
    var Mt = !1;
    tt.add = function(t) {
        var e = {};
        return k(t, "type") ? "dso" !== t.type && "json" !== t.type || k(t, "file") && k(t, "callback") ? "line" !== t.type && "raw" !== t.type || k(t, "callback") ? (k(t, "file") && (e.file = t.file), e.type = t.type, k(t, "callback") && (e.callback = t.callback), k(t, "redraw") && (e.redraw = t.redraw), k(t, "save") && (e.save = t.save), void tt.data.push(e)) : console.log("Can't add data") : console.log("Can't add data file") : console.log("Missing type")
    }, tt.remove = function(t) {
        if (null !== t && t < tt.data.length) return tt.data.splice(t, 1)
    }, tt.clear = function() {
        tt.data = []
    }, tt.addCallback = function(t) {
        tt.callback = t, Mt = null !== t
    }, tt.runCallback = function(t) {
        Mt = !1, tt.callback(), Mt = !0
    }, tt.getData = o, tt.getPoint = s, tt.getPlanet = l;
    var bt = {},
        wt = {
            width: 0,
            projection: "aitoff",
            projectionRatio: null,
            transform: "equatorial",
            center: null,
            geopos: null,
            follow: "zenith",
            orientationfixed: !0,
            zoomlevel: null,
            zoomextend: 10,
            adaptable: !0,
            interactive: !0,
            disableAnimations: !1,
            form: !1,
            location: !1,
            formFields: {
                location: !0,
                general: !0,
                stars: !0,
                dsos: !0,
                constellations: !0,
                lines: !0,
                other: !0,
                download: !1
            },
            advanced: !0,
            daterange: [],
            settimezone: !0,
            timezoneid: "AEFXZPQ3FDPF",
            controls: !0,
            lang: "",
            culture: "",
            container: "celestial-map",
            datapath: "data/",
            stars: {
                show: !0,
                limit: 6,
                colors: !0,
                style: {
                    fill: "#ffffff",
                    opacity: 1
                },
                designation: !0,
                designationType: "desig",
                designationStyle: {
                    fill: "#ddddbb",
                    font: "11px 'Palatino Linotype', Georgia, Times, 'Times Roman', serif",
                    align: "left",
                    baseline: "top"
                },
                designationLimit: 2.5,
                propername: !1,
                propernameType: "name",
                propernameStyle: {
                    fill: "#ddddbb",
                    font: "13px 'Palatino Linotype', Georgia, Times, 'Times Roman', serif",
                    align: "right",
                    baseline: "bottom"
                },
                propernameLimit: 1.5,
                size: 7,
                exponent: -.28,
                data: "stars.6.json"
            },
            dsos: {
                show: !0,
                limit: 6,
                colors: !0,
                style: {
                    fill: "#cccccc",
                    stroke: "#cccccc",
                    width: 2,
                    opacity: 1
                },
                names: !0,
                namesType: "desig",
                nameStyle: {
                    fill: "#cccccc",
                    font: "11px 'Lucida Sans Unicode', 'DejaVu Sans', Helvetica, Arial, serif",
                    align: "left",
                    baseline: "bottom"
                },
                nameLimit: 4,
                size: null,
                exponent: 1.4,
                data: "dsos.bright.json",
                symbols: {
                    gg: {
                        shape: "circle",
                        fill: "#ff0000"
                    },
                    g: {
                        shape: "ellipse",
                        fill: "#ff0000"
                    },
                    s: {
                        shape: "ellipse",
                        fill: "#ff0000"
                    },
                    s0: {
                        shape: "ellipse",
                        fill: "#ff0000"
                    },
                    sd: {
                        shape: "ellipse",
                        fill: "#ff0000"
                    },
                    e: {
                        shape: "ellipse",
                        fill: "#ff0000"
                    },
                    i: {
                        shape: "ellipse",
                        fill: "#ff0000"
                    },
                    oc: {
                        shape: "circle",
                        fill: "#ff9900",
                        stroke: "#ff9900",
                        width: 2
                    },
                    gc: {
                        shape: "circle",
                        fill: "#ff9900"
                    },
                    en: {
                        shape: "square",
                        fill: "#ff00cc"
                    },
                    bn: {
                        shape: "square",
                        fill: "#ff00cc"
                    },
                    sfr: {
                        shape: "square",
                        fill: "#cc00ff"
                    },
                    rn: {
                        shape: "square",
                        fill: "#0000ff"
                    },
                    pn: {
                        shape: "diamond",
                        fill: "#00cccc"
                    },
                    snr: {
                        shape: "diamond",
                        fill: "#ff00cc"
                    },
                    dn: {
                        shape: "square",
                        fill: "#999999",
                        stroke: "#999999",
                        width: 2
                    },
                    pos: {
                        shape: "marker",
                        fill: "#cccccc",
                        stroke: "#cccccc",
                        width: 1.5
                    }
                }
            },
            constellations: {
                show: !0,
                names: !0,
                namesType: "desig",
                nameStyle: {
                    fill: "#cccc99",
                    align: "center",
                    baseline: "middle",
                    opacity: .8,
                    font: ["14px 'Lucida Sans Unicode', 'DejaVu Sans', Helvetica, Arial, sans-serif", "12px 'Lucida Sans Unicode', 'DejaVu Sans', Helvetica, Arial, sans-serif", "11px 'Lucida Sans Unicode', 'DejaVu Sans', Helvetica, Arial, sans-serif"]
                },
                lines: !0,
                lineStyle: {
                    stroke: "#cccccc",
                    width: 1.5,
                    opacity: .6
                },
                bounds: !1,
                boundStyle: {
                    stroke: "#ccff00",
                    width: 1,
                    opacity: .8,
                    dash: [4, 4]
                }
            },
            mw: {
                show: !0,
                style: {
                    fill: "#ffffff",
                    opacity: "0.15"
                }
            },
            lines: {
                graticule: {
                    show: !0,
                    stroke: "#cccccc",
                    width: .6,
                    opacity: .8,
                    lon: {
                        pos: [],
                        fill: "#eee",
                        font: "10px 'Lucida Sans Unicode', Helvetica, Arial, sans-serif"
                    },
                    lat: {
                        pos: [],
                        fill: "#eee",
                        font: "10px 'Lucida Sans Unicode', Helvetica, Arial, sans-serif"
                    }
                },
                equatorial: {
                    show: !0,
                    stroke: "#aaaaaa",
                    width: 1.3,
                    opacity: .7
                },
                ecliptic: {
                    show: !0,
                    stroke: "#66cc66",
                    width: 1.3,
                    opacity: .7
                },
                galactic: {
                    show: !1,
                    stroke: "#cc6666",
                    width: 1.3,
                    opacity: .7
                },
                supergalactic: {
                    show: !1,
                    stroke: "#cc66cc",
                    width: 1.3,
                    opacity: .7
                }
            },
            background: {
                fill: "#000000",
                opacity: 1,
                stroke: "#000000",
                width: 1.5
            },
            horizon: {
                show: !1,
                stroke: "#cccccc",
                width: 1,
                fill: "#000000",
                opacity: .4
            },
            daylight: {
                show: !1
            },
            planets: {
                show: !1,
                which: ["sol", "mer", "ven", "ter", "lun", "mar", "jup", "sat", "ura", "nep", "cer", "plu"],
                symbols: {
                    sol: {
                        symbol: "☉",
                        letter: "Su",
                        fill: "#ffff00",
                        size: 12
                    },
                    mer: {
                        symbol: "☿",
                        letter: "Me",
                        fill: "#cccccc"
                    },
                    ven: {
                        symbol: "♀",
                        letter: "V",
                        fill: "#eeeecc"
                    },
                    ter: {
                        symbol: "⊕",
                        letter: "T",
                        fill: "#00ccff"
                    },
                    lun: {
                        symbol: "●",
                        letter: "L",
                        fill: "#ffffff",
                        size: 12
                    },
                    mar: {
                        symbol: "♂",
                        letter: "Ma",
                        fill: "#ff6600"
                    },
                    cer: {
                        symbol: "⚳",
                        letter: "C",
                        fill: "#cccccc"
                    },
                    ves: {
                        symbol: "⚶",
                        letter: "Ma",
                        fill: "#cccccc"
                    },
                    jup: {
                        symbol: "♃",
                        letter: "J",
                        fill: "#ffaa33"
                    },
                    sat: {
                        symbol: "♄",
                        letter: "Sa",
                        fill: "#ffdd66"
                    },
                    ura: {
                        symbol: "♅",
                        letter: "U",
                        fill: "#66ccff"
                    },
                    nep: {
                        symbol: "♆",
                        letter: "N",
                        fill: "#6666ff"
                    },
                    plu: {
                        symbol: "♇",
                        letter: "P",
                        fill: "#aaaaaa"
                    },
                    eri: {
                        symbol: "⚪",
                        letter: "E",
                        fill: "#eeeeee"
                    }
                },
                symbolStyle: {
                    fill: "#cccccc",
                    opacity: 1,
                    font: "bold 20px 'DejaVu Sans Mono', 'Arial Unicode MS', sans-serif",
                    align: "center",
                    baseline: "middle"
                },
                symbolType: "symbol",
                names: !1,
                nameStyle: {
                    fill: "#cccccc",
                    font: "14px 'Lucida Sans Unicode', 'DejaVu Sans', sans-serif",
                    align: "right",
                    baseline: "top"
                },
                namesType: "en"
            },
            set: function(t) {
                var e, a, n = {},
                    r = {};
                if (0 === Object.entries(bt).length ? Object.assign(n, this) : Object.assign(n, bt), !t) return n;
                for (e in n)
                    if (k(n, e))
                        if (k(t, e) && null !== t[e])
                            if (null === n[e] || n[e].constructor != Object) r[e] = t[e];
                            else {
                                r[e] = {};
                                for (a in n[e]) k(t[e], a) ? r[e][a] = t[e][a] : r[e][a] = n[e][a]
                            }
                else r[e] = n[e];
                return r.constellations.nameStyle.font = g(r.constellations.nameStyle.font), r.constellations.nameStyle.opacity = g(r.constellations.nameStyle.opacity), r.constellations.nameStyle.fill = g(r.constellations.nameStyle.fill), r.constellations.lineStyle.width = g(r.constellations.lineStyle.width), r.constellations.lineStyle.opacity = g(r.constellations.lineStyle.opacity), r.constellations.lineStyle.stroke = g(r.constellations.lineStyle.stroke), Object.assign(bt, r), r
            },
            applyDefaults: function(t) {
                var e = {};
                return Object.assign(e, bt), e.stars.size = e.stars.size || 7, e.stars.exponent = e.stars.exponent || -.28, (!e.center || e.center.length <= 0) && (e.center = [0, 0, 0]), e.datapath = e.datapath || "", e.datapath = e.datapath.replace(/([^\/]$)/, "$1/"), e.transform && "" !== e.transform || (e.transform = "equatorial"), e.culture && -1 !== e.culture.search(/^cn$/) || (e.culture = "iau"), t && (k(t, "stars") && (k(t.stars, "names") && (e.stars.designation = t.stars.names), k(t.stars, "namelimit") && (e.stars.designationLimit = t.stars.namelimit), k(t.stars, "namestyle") && Object.assign(e.stars.designationStyle, t.stars.namestyle), k(t.stars, "proper") && (e.stars.propername = t.stars.proper), k(t.stars, "propernamelimit") && (e.stars.propernameLimit = t.stars.propernamelimit), k(t.stars, "propernamestyle") && Object.assign(e.stars.propernameStyle, t.stars.propernamestyle)), k(t, "dsos") && (k(t.dsos, "desig") && !0 === t.dsos.desig && (e.dsos.namesType = "desig"), k(t.dsos, "namelimit") && (e.dsos.nameLimit = t.dsos.namelimit), k(t.dsos, "namestyle") && Object.assign(e.dsos.nameStyle, t.dsos.namestyle)), k(t, "constellations") && (k(t.constellations, "show") && !0 === t.constellations.show && (e.constellations.names = !0), k(t.constellations, "desig") && !0 === t.constellations.desig && (e.constellations.namesType = "desig"), "latin" === e.constellations.namesType && (e.constellations.namesType = "la"), "iau" === e.constellations.namesType && (e.constellations.namesType = "name"), k(t.constellations, "namestyle") && Object.assign(e.constellations.nameStyle, t.constellations.namestyle), k(t.constellations, "linestyle") && Object.assign(e.constellations.lineStyle, t.constellations.linestyle), k(t.constellations, "boundstyle") && Object.assign(e.constellations.boundStyle, t.constellations.boundstyle)), k(t, "planets") && k(t.planets, "style") && Object.assign(e.planets.style, t.planets.symbolStyle)), e.stars.designationType && "" !== e.stars.designationType || (e.stars.designationType = "desig"), k(zt.starnames[e.culture].designation, e.stars.designationType) || (e.designationType = "desig"), e.stars.propernameType && "" !== e.stars.propernameType || (e.stars.propernameType = "name"), k(zt.starnames[e.culture].propername, e.stars.propernameType) || (e.propernameType = "name"), e.dsos.namesType && "" !== e.dsos.namesType || (e.dsos.namesType = "desig"), e.constellations.namesType && "" !== e.constellations.namesType || (e.constellations.namesType = "desig"), k(zt.constellations[e.culture].names, e.constellations.namesType) || (e.constellations.namesType = "name"), e.planets.symbolType && "" !== e.planets.symbolType || (e.planets.symbolType = "symbol"), e.planets.namesType && "" !== e.planets.namesType || (e.planets.namesType = "desig"), k(zt.planets[e.culture].names, e.planets.namesType) || (e.planets.namesType = "desig"), e.constellations.nameStyle.font = g(e.constellations.nameStyle.font), e.constellations.nameStyle.opacity = g(e.constellations.nameStyle.opacity), e.constellations.nameStyle.fill = g(e.constellations.nameStyle.fill), e.constellations.lineStyle.width = g(e.constellations.lineStyle.width), e.constellations.lineStyle.opacity = g(e.constellations.lineStyle.opacity), e.constellations.lineStyle.stroke = g(e.constellations.lineStyle.stroke), Object.assign(bt, e), e
            }
        };
    tt.settings = function() {
        return wt
    };
    var kt = d3.scale.quantize().domain([3.347, -.335]).range(["#ff4700", "#ff4b00", "#ff4f00", "#ff5300", "#ff5600", "#ff5900", "#ff5b00", "#ff5d00", "#ff6000", "#ff6300", "#ff6500", "#ff6700", "#ff6900", "#ff6b00", "#ff6d00", "#ff7000", "#ff7300", "#ff7500", "#ff7800", "#ff7a00", "#ff7c00", "#ff7e00", "#ff8100", "#ff8300", "#ff8506", "#ff870a", "#ff8912", "#ff8b1a", "#ff8e21", "#ff9127", "#ff932c", "#ff9631", "#ff9836", "#ff9a3c", "#ff9d3f", "#ffa148", "#ffa34b", "#ffa54f", "#ffa753", "#ffa957", "#ffab5a", "#ffad5e", "#ffb165", "#ffb269", "#ffb46b", "#ffb872", "#ffb975", "#ffbb78", "#ffbe7e", "#ffc184", "#ffc489", "#ffc78f", "#ffc892", "#ffc994", "#ffcc99", "#ffce9f", "#ffd1a3", "#ffd3a8", "#ffd5ad", "#ffd7b1", "#ffd9b6", "#ffdbba", "#ffddbe", "#ffdfc2", "#ffe1c6", "#ffe3ca", "#ffe4ce", "#ffe8d5", "#ffe9d9", "#ffebdc", "#ffece0", "#ffefe6", "#fff0e9", "#fff2ec", "#fff4f2", "#fff5f5", "#fff6f8", "#fff9fd", "#fef9ff", "#f9f6ff", "#f6f4ff", "#f3f2ff", "#eff0ff", "#ebeeff", "#e9edff", "#e6ebff", "#e3e9ff", "#e0e7ff", "#dee6ff", "#dce5ff", "#d9e3ff", "#d7e2ff", "#d3e0ff", "#c9d9ff", "#bfd3ff", "#b7ceff", "#afc9ff", "#a9c5ff", "#a4c2ff", "#9fbfff", "#9bbcff"]),
        xt = {
            airy: {
                n: "Airy’s Minimum Error",
                arg: Math.PI / 2,
                scale: 360,
                ratio: 1,
                clip: !0
            },
            aitoff: {
                n: "Aitoff",
                arg: null,
                scale: 162
            },
            armadillo: {
                n: "Armadillo",
                arg: 0,
                scale: 250
            },
            august: {
                n: "August",
                arg: null,
                scale: 94,
                ratio: 1.4
            },
            azimuthalEqualArea: {
                n: "Azimuthal Equal Area",
                arg: null,
                scale: 340,
                ratio: 1,
                clip: !0
            },
            azimuthalEquidistant: {
                n: "Azimuthal Equidistant",
                arg: null,
                scale: 320,
                ratio: 1,
                clip: !0
            },
            baker: {
                n: "Baker Dinomic",
                arg: null,
                scale: 160,
                ratio: 1.4
            },
            berghaus: {
                n: "Berghaus Star",
                arg: 0,
                scale: 320,
                ratio: 1,
                clip: !0
            },
            boggs: {
                n: "Boggs Eumorphic",
                arg: null,
                scale: 170
            },
            bonne: {
                n: "Bonne",
                arg: Math.PI / 2.5,
                scale: 225,
                ratio: .88
            },
            bromley: {
                n: "Bromley",
                arg: null,
                scale: 162
            },
            cassini: {
                n: "Cassini",
                arg: null,
                scale: 325,
                ratio: 1,
                clip: !0
            },
            collignon: {
                n: "Collignon",
                arg: null,
                scale: 100,
                ratio: 2.6
            },
            craig: {
                n: "Craig Retroazimuthal",
                arg: 0,
                scale: 310,
                ratio: 1.5,
                clip: !0
            },
            craster: {
                n: "Craster Parabolic",
                arg: null,
                scale: 160
            },
            cylindricalEqualArea: {
                n: "Cylindrical Equal Area",
                arg: Math.PI / 6,
                scale: 190,
                ratio: 2.3
            },
            cylindricalStereographic: {
                n: "Cylindrical Stereographic",
                arg: Math.PI / 4,
                scale: 230,
                ratio: 1.3
            },
            eckert1: {
                n: "Eckert I",
                arg: null,
                scale: 175
            },
            eckert2: {
                n: "Eckert II",
                arg: null,
                scale: 175
            },
            eckert3: {
                n: "Eckert III",
                arg: null,
                scale: 190
            },
            eckert4: {
                n: "Eckert IV",
                arg: null,
                scale: 190
            },
            eckert5: {
                n: "Eckert V",
                arg: null,
                scale: 182
            },
            eckert6: {
                n: "Eckert VI",
                arg: null,
                scale: 182
            },
            eisenlohr: {
                n: "Eisenlohr",
                arg: null,
                scale: 102
            },
            equirectangular: {
                n: "Equirectangular",
                arg: null,
                scale: 165
            },
            fahey: {
                n: "Fahey",
                arg: null,
                scale: 196,
                ratio: 1.4
            },
            mtFlatPolarParabolic: {
                n: "Flat Polar Parabolic",
                arg: null,
                scale: 175
            },
            mtFlatPolarQuartic: {
                n: "Flat Polar Quartic",
                arg: null,
                scale: 230,
                ratio: 1.65
            },
            mtFlatPolarSinusoidal: {
                n: "Flat Polar Sinusoidal",
                arg: null,
                scale: 175,
                ratio: 1.9
            },
            foucaut: {
                n: "Foucaut",
                arg: null,
                scale: 142
            },
            ginzburg4: {
                n: "Ginzburg IV",
                arg: null,
                scale: 180,
                ratio: 1.7
            },
            ginzburg5: {
                n: "Ginzburg V",
                arg: null,
                scale: 196,
                ratio: 1.55
            },
            ginzburg6: {
                n: "Ginzburg VI",
                arg: null,
                scale: 190,
                ratio: 1.4
            },
            ginzburg8: {
                n: "Ginzburg VIII",
                arg: null,
                scale: 205,
                ratio: 1.3
            },
            ginzburg9: {
                n: "Ginzburg IX",
                arg: null,
                scale: 190,
                ratio: 1.4
            },
            homolosine: {
                n: "Goode Homolosine",
                arg: null,
                scale: 160,
                ratio: 2.2
            },
            hammer: {
                n: "Hammer",
                arg: 2,
                scale: 180
            },
            hatano: {
                n: "Hatano",
                arg: null,
                scale: 186
            },
            healpix: {
                n: "HEALPix",
                arg: 1,
                scale: 320,
                ratio: 1.2
            },
            hill: {
                n: "Hill Eucyclic",
                arg: 2,
                scale: 190,
                ratio: 1.1
            },
            kavrayskiy7: {
                n: "Kavrayskiy VII",
                arg: null,
                scale: 185,
                ratio: 1.75
            },
            lagrange: {
                n: "Lagrange",
                arg: Math.PI / 4,
                scale: 88,
                ratio: 1.6,
                clip: !1
            },
            larrivee: {
                n: "l'Arrivée",
                arg: null,
                scale: 160,
                ratio: 1.25
            },
            laskowski: {
                n: "Laskowski Tri-Optimal",
                arg: null,
                scale: 165,
                ratio: 1.7
            },
            loximuthal: {
                n: "Loximuthal",
                arg: Math.PI / 4,
                scale: 175,
                ratio: 1.8
            },
            mercator: {
                n: "Mercator",
                arg: null,
                scale: 160,
                ratio: 1.3
            },
            miller: {
                n: "Miller",
                arg: null,
                scale: 160,
                ratio: 1.5
            },
            mollweide: {
                n: "Mollweide",
                arg: null,
                scale: 180
            },
            naturalEarth: {
                n: "Natural Earth",
                arg: null,
                scale: 185,
                ratio: 1.85
            },
            nellHammer: {
                n: "Nell Hammer",
                arg: null,
                scale: 160,
                ratio: 2.6
            },
            orthographic: {
                n: "Orthographic",
                arg: null,
                scale: 480,
                ratio: 1,
                clip: !0
            },
            patterson: {
                n: "Patterson Cylindrical",
                arg: null,
                scale: 160,
                ratio: 1.75
            },
            polyconic: {
                n: "Polyconic",
                arg: null,
                scale: 160,
                ratio: 1.3
            },
            quincuncial: {
                n: "Quincuncial",
                arg: null,
                scale: 160,
                ratio: 1.3
            },
            rectangularPolyconic: {
                n: "Rectangular Polyconic",
                arg: 0,
                scale: 160,
                ratio: 1.65
            },
            robinson: {
                n: "Robinson",
                arg: null,
                scale: 160
            },
            sinusoidal: {
                n: "Sinusoidal",
                arg: null,
                scale: 160,
                ratio: 2
            },
            stereographic: {
                n: "Stereographic",
                arg: null,
                scale: 500,
                ratio: 1,
                clip: !0
            },
            times: {
                n: "Times",
                arg: null,
                scale: 210,
                ratio: 1.4
            },
            twoPointEquidistant: {
                n: "Two-Point Equidistant",
                arg: Math.PI / 2,
                scale: 320,
                ratio: 1.15,
                clip: !0
            },
            vanDerGrinten: {
                n: "van Der Grinten",
                arg: null,
                scale: 160,
                ratio: 1
            },
            vanDerGrinten2: {
                n: "van Der Grinten II",
                arg: null,
                scale: 160,
                ratio: 1
            },
            vanDerGrinten3: {
                n: "van Der Grinten III",
                arg: null,
                scale: 160,
                ratio: 1
            },
            vanDerGrinten4: {
                n: "van Der Grinten IV",
                arg: null,
                scale: 160,
                ratio: 1.6
            },
            wagner4: {
                n: "Wagner IV",
                arg: null,
                scale: 185
            },
            wagner6: {
                n: "Wagner VI",
                arg: null,
                scale: 160
            },
            wagner7: {
                n: "Wagner VII",
                arg: null,
                scale: 190,
                ratio: 1.8
            },
            wiechel: {
                n: "Wiechel",
                arg: null,
                scale: 360,
                ratio: 1,
                clip: !0
            },
            winkel3: {
                n: "Winkel Tripel",
                arg: null,
                scale: 196,
                ratio: 1.7
            }
        };
    tt.projections = function() {
        return xt
    };
    var zt = {
            starnames: {
                iau: {
                    designation: {
                        desig: "Designation",
                        bayer: "Bayer",
                        flam: "Flamsteed",
                        var: "Variable",
                        gl: "Gliese",
                        hd: "Draper",
                        hip: "Hipparcos"
                    },
                    propername: {
                        name: "IAU Name",
                        ar: "Arabic",
                        zh: "Chinese",
                        en: "English",
                        fi: "Finnish",
                        fr: "French",
                        de: "German",
                        el: "Greek",
                        he: "Hebrew",
                        hi: "Hindi",
                        it: "Italian",
                        ja: "Japanese",
                        ko: "Korean",
                        la: "Latin",
                        fa: "Persian",
                        ru: "Russian",
                        es: "Spanish",
                        tr: "Turkish"
                    }
                },
                cn: {
                    propername: {
                        name: "Proper name",
                        en: "English",
                        pinyin: "Pinyin"
                    },
                    designation: {
                        desig: "IAU Designation"
                    }
                }
            },
            constellations: {
                iau: {
                    names: {
                        desig: "Designation",
                        name: "IAU Name",
                        ar: "Arabic",
                        zh: "Chinese",
                        cz: "Czech",
                        en: "English",
                        ee: "Estonian",
                        fi: "Finnish",
                        fr: "French",
                        de: "German",
                        el: "Greek",
                        he: "Hebrew",
                        hi: "Hindi",
                        it: "Italian",
                        ja: "Japanese",
                        sw: "Kiswahili",
                        ko: "Korean",
                        la: "Latin",
                        fa: "Persian",
                        ru: "Russian",
                        es: "Spanish",
                        tr: "Turkish"
                    }
                },
                cn: {
                    names: {
                        name: "Proper name",
                        en: "English",
                        pinyin: "Pinyin"
                    }
                }
            },
            planets: {
                iau: {
                    symbol: {
                        symbol: "☾ Symbol",
                        letter: "Ⅼ Letter",
                        disk: "● Disk"
                    },
                    names: {
                        desig: "Designation",
                        ar: "Arabic",
                        zh: "Chinese",
                        en: "English",
                        fr: "French",
                        de: "German",
                        el: "Greek",
                        he: "Hebrew",
                        hi: "Hindi",
                        it: "Italian",
                        ja: "Japanese",
                        ko: "Korean",
                        la: "Latin",
                        fa: "Persian",
                        ru: "Russian",
                        es: "Spanish"
                    }
                },
                cn: {
                    symbol: {
                        symbol: "☾ Symbol",
                        letter: "Ⅼ Letter",
                        disk: "● Disk"
                    },
                    names: {
                        desig: "Designation",
                        name: "Chinese",
                        pinyin: "Pinyin",
                        en: "English"
                    }
                }
            },
            dsonames: {
                iau: {
                    names: {
                        desig: "Designation",
                        name: "English",
                        ar: "Arabic",
                        zh: "Chinese",
                        fi: "Finnish",
                        fr: "French",
                        de: "German",
                        el: "Greek",
                        hi: "Hindi",
                        it: "Italian",
                        ja: "Japanese",
                        ko: "Korean",
                        la: "Latin",
                        fa: "Persian",
                        ru: "Russian",
                        es: "Spanish",
                        tr: "Turkish"
                    }
                },
                cn: {
                    names: {
                        desig: "Designation",
                        name: "Chinese",
                        pinyin: "Pinyin",
                        en: "English"
                    }
                }
            }
        },
        St = {
            iau: Object.keys(zt.constellations.iau.names).concat(Object.keys(zt.planets.iau.names)).filter(function(t, e, a) {
                return a.indexOf(t) === e
            }),
            cn: Object.keys(zt.constellations.cn.names).concat(Object.keys(zt.starnames.cn.propername)).filter(function(t, e, a) {
                return a.indexOf(t) === e
            })
        },
        Tt = {};
    Tt.symbol = function() {
        function t(t) {
            o[a()](t)
        }
        var e, a = d3.functor("circle"),
            n = d3.functor(64),
            r = d3.functor(Math.PI),
            s = (d3.functor("#fff"), d3.functor("")),
            o = (d3.functor([2, 2]), {
                circle: function(t) {
                    var a = Math.sqrt(n()),
                        r = a / 2;
                    return t.arc(e[0], e[1], r, 0, 2 * Math.PI), t.closePath(), r
                },
                square: function(t) {
                    var a = Math.sqrt(n()),
                        r = a / 1.7;
                    return t.moveTo(e[0] - r, e[1] - r), t.lineTo(e[0] + r, e[1] - r), t.lineTo(e[0] + r, e[1] + r), t.lineTo(e[0] - r, e[1] + r), t.closePath(), r
                },
                diamond: function(t) {
                    var a = Math.sqrt(n()),
                        r = a / 1.5;
                    return t.moveTo(e[0], e[1] - r), t.lineTo(e[0] + r, e[1]), t.lineTo(e[0], e[1] + r), t.lineTo(e[0] - r, e[1]), t.closePath(), r
                },
                triangle: function(t) {
                    var a = Math.sqrt(n()),
                        r = a / Math.sqrt(3);
                    return t.moveTo(e[0], e[1] - r), t.lineTo(e[0] + r, e[1] + r), t.lineTo(e[0] - r, e[1] + r), t.closePath(), r
                },
                ellipse: function(t) {
                    var a = Math.sqrt(n()),
                        r = a / 2;
                    return t.save(), t.translate(e[0], e[1]), t.scale(1.6, .8), t.beginPath(), t.arc(0, 0, r, 0, 2 * Math.PI), t.closePath(), t.restore(), r
                },
                marker: function(t) {
                    var a = Math.sqrt(n()),
                        r = a / 2;
                    return t.moveTo(e[0], e[1] - r), t.lineTo(e[0], e[1] + r), t.moveTo(e[0] - r, e[1]), t.lineTo(e[0] + r, e[1]), t.closePath(), r
                },
                "cross-circle": function(t) {
                    var a = Math.sqrt(n()),
                        r = a / 2;
                    return t.moveTo(e[0], e[1] - a), t.lineTo(e[0], e[1] + a), t.moveTo(e[0] - a, e[1]), t.lineTo(e[0] + a, e[1]), t.stroke(), t.beginPath(), t.moveTo(e[0], e[1]), t.arc(e[0], e[1], r, 0, 2 * Math.PI), t.closePath(), r
                },
                "stroke-circle": function(t) {
                    var a = Math.sqrt(n()),
                        r = a / 2;
                    return t.moveTo(e[0], e[1] - a), t.lineTo(e[0], e[1] + a), t.stroke(), t.beginPath(), t.moveTo(e[0], e[1]), t.arc(e[0], e[1], r, 0, 2 * Math.PI), t.closePath(), r
                },
                crescent: function(t) {
                    var a = Math.sqrt(n()),
                        s = a / 2,
                        o = r(),
                        i = .5 * (1 - Math.cos(o)),
                        l = 1.6 * Math.abs(i - .5) + .01,
                        c = o > Math.PI,
                        d = Math.abs(i) > .5 ? c : !c,
                        p = t.fillStyle,
                        u = i < .157 ? "#669" : "#557";
                    return t.save(), t.fillStyle = u, t.beginPath(), t.moveTo(e[0], e[1]), t.arc(e[0], e[1], s, 0, 2 * Math.PI), t.closePath(), t.fill(), t.fillStyle = p, t.beginPath(), t.moveTo(e[0], e[1]), t.arc(e[0], e[1], s, -Math.PI / 2, Math.PI / 2, c), t.scale(l, 1), t.arc(e[0] / l, e[1], s, Math.PI / 2, -Math.PI / 2, d), t.closePath(), t.fill(), t.restore(), s
                }
            });
        return t.type = function(e) {
            return arguments.length ? (a = d3.functor(e), t) : a
        }, t.size = function(e) {
            return arguments.length ? (n = d3.functor(e), t) : n
        }, t.age = function(e) {
            return arguments.length ? (r = d3.functor(e), t) : r
        }, t.text = function(e) {
            return arguments.length ? (s = d3.functor(e), t) : s
        }, t.position = function(a) {
            if (arguments.length) return e = a, t
        }, t
    }, tt.Canvas = Tt;
    var jt = {
            sinh: function(t) {
                return (Math.pow(Math.E, t) - Math.pow(Math.E, -t)) / 2
            },
            cosh: function(t) {
                return (Math.pow(Math.E, t) + Math.pow(Math.E, -t)) / 2
            },
            tanh: function(t) {
                return 2 / (1 + Math.exp(-2 * t)) - 1
            },
            asinh: function(t) {
                return Math.log(t + Math.sqrt(t * t + 1))
            },
            acosh: function(t) {
                return Math.log(t + Math.sqrt(t * t - 1))
            },
            normalize0: function(t) {
                return (t + 3 * Math.PI) % (2 * Math.PI) - Math.PI
            },
            normalize: function(t) {
                return (t + 2 * Math.PI) % (2 * Math.PI)
            },
            cartesian: function(t) {
                var e = t[0],
                    a = mt - t[1],
                    n = t[2];
                return {
                    x: n * Math.sin(a) * Math.cos(e),
                    y: n * Math.sin(a) * Math.sin(e),
                    z: n * Math.cos(a)
                }
            },
            spherical: function(t) {
                var e = Math.sqrt(t.x * t.x + t.y * t.y + t.z * t.z),
                    a = Math.atan(t.y / t.x),
                    n = Math.acos(t.z / e);
                return [a / yt, n / yt, e]
            },
            distance: function(t, e) {
                return Math.acos(Math.sin(t[1]) * Math.sin(e[1]) + Math.cos(t[1]) * Math.cos(e[1]) * Math.cos(t[0] - e[0]))
            }
        },
        Pt = (Math.PI, Math.PI, Math.PI, {
            "stars-show": ["stars-limit", "stars-colors", "stars-style-fill", "stars-designation", "stars-propername", "stars-size", "stars-exponent"],
            "stars-designation": ["stars-designationType", "stars-designationLimit"],
            "stars-propername": ["stars-propernameLimit", "stars-propernameType"],
            "dsos-show": ["dsos-limit", "dsos-colors", "dsos-style-fill", "dsos-names", "dsos-size", "dsos-exponent"],
            "dsos-names": ["dsos-namesType", "dsos-nameLimit"],
            "mw-show": ["mw-style-opacity", "mw-style-fill"],
            "constellations-names": ["constellations-namesType"],
            "planets-show": ["planets-symbolType", "planets-names"],
            "planets-names": ["planets-namesType"]
        }),
        At = null,
        It = {
            sol: .0002959122082855911,
            mer: 0x95955473dbc3,
            ven: 0x89d9374048629,
            ter: 0xa923c08a47948,
            lun: 36599199229256,
            mar: 319711652803400,
            cer: 467549107200,
            ves: 129071530155,
            jup: 0xd20883d548bcd80,
            sat: 0x3ee3798098fbac0,
            ura: 0x99ad2c4e2f7f70,
            nep: 0xb54f848fd74430,
            plu: 7327611364884,
            eri: 827117568e4
        },
        qt = {
            sol: "☉",
            mer: "☿",
            ven: "♀",
            ter: "⊕",
            lun: "●",
            mar: "♂",
            cer: "⚳",
            ves: "⚶",
            jup: "♃",
            sat: "♄",
            ura: "♅",
            nep: "♆",
            plu: "♇",
            eri: "⚪"
        },
        Lt = 23.43928 * yt,
        Dt = Math.sin(Lt),
        Ft = Math.cos(Lt),
        Ot = ["a", "e", "i", "w", "M", "L", "W", "N", "n", "ep", "ref", "lecl", "becl", "Tilt"],
        _t = function() {
            function t(e) {
                return b(e), "sol" === h ? (M.ephemeris.x = 0, M.ephemeris.y = 0, M.ephemeris.z = 0, M.ephemeris.mag = -6, t) : (w(), t)
            }

            function e(t, e) {
                for (var a = e > 1 ? t * t : -t * t, n = e * a * t / 6, r = (1 - e) * t - n, s = 4; Math.abs(n) > 1e-15;) n *= a / (s * (s + 1)), r -= n, s += 2;
                return r
            }

            function a() {
                var t, a, n, r, s = M.ephemeris,
                    o = s.e,
                    i = s.M,
                    l = 1e-8,
                    c = 0,
                    d = 1.9,
                    p = !1,
                    u = 0;
                if (!i) return 0;
                if (o < 1 && ((i < -Math.PI || i > Math.PI) && (r = jt.normalize0(i), c = i - r, i = r), o < .9)) {
                    t = Math.atan2(Math.sin(i), Math.cos(i) - o);
                    do {
                        a = (t - o * Math.sin(t) - i) / (1 - o * Math.cos(t)), t -= a
                    } while (Math.abs(a) > l);
                    return t
                }
                if (i < 0 && (i = -i, p = !0), t = i, l *= Math.abs(1 - o), l < 1e-15 && (l = 1e-15), (o > .8 && i < Math.PI / 3 || o > 1) && (n = i / Math.abs(1 - o), n * n > 6 * Math.abs(1 - o) && (n = i < Math.PI ? Math.pow(6 * i, 1 / 3) : jt.asinh(i / o)), t = n), o > 1 && i > 4 && (t = Math.log(i)), o < 1)
                    for (; Math.abs(d) > l;) a = u++ > 8 ? e(t, o) - i : t - o * Math.sin(t) - i, d = -a / (1 - o * Math.cos(t)), t += d;
                else
                    for (; Math.abs(d) > l;) a = u++ > 7 ? -e(t, o) - i : o * jt.sinh(t) - t - i, d = -a / (o * jt.cosh(t) - 1), t += d;
                return p ? c - t : c + t
            }

            function n() {
                var t, e, n, r, s, o = M.ephemeris;
                1 === o.e ? (s = o.jd0 - o.T, r = o.w0 * s * .5, e = Math.pow(r + Math.sqrt(r * r + 1), 1 / 3), o.v = 2 * Math.atan(e - 1 / e)) : (o.E = a(), o.e > 1 ? (t = o.e - jt.cosh(o.E), e = jt.sinh(o.E)) : (t = Math.cos(o.E) - o.e, e = Math.sin(o.E)), e *= Math.sqrt(Math.abs(1 - o.e * o.e)), o.v = Math.atan2(e, t)), n = o.q * (1 + o.e), o.r = n / (1 + o.e * Math.cos(o.v))
            }

            function r() {
                var t = M.ephemeris;
                t.hasOwnProperty("w") || (t.w = t.W - t.N), t.hasOwnProperty("M") || (t.M = t.L - t.W), t.e < 1 && (t.M = jt.normalize0(t.M)), t.P = ft * Math.sqrt(Math.pow(t.a, 3) / y) / 365.25, t.T = t.jd0 - t.M / mt / t.P, 1 !== t.e ? (t.q = t.a * (1 - t.e), t.t0 = t.a * Math.sqrt(Math.abs(t.a) / y)) : (t.w0 = 3 / Math.sqrt(2) / (t.q * Math.sqrt(t.q / y)), t.a = 0, t.t0 = 0), t.am = Math.sqrt(y * t.q * (1 + t.e))
            }

            function s() {
                var t = M.ephemeris;
                if (!t.ref || "ecl" === t.ref) return t.tx = t.x, t.ty = t.y, void(t.tz = t.z);
                var e = (t.lecl, Math.PI, t.becl, jt.cartesian([t.tl, t.tb, t.r]));
                t.tx = e.x, t.ty = e.y, t.tz = e.z
            }

            function o(t) {
                var e = M.ephemeris,
                    a = t.ephemeris;
                Lt = (23.439292 - .0130042 * e.cy - 1.667e-7 * e.cy * e.cy + 5.028e-7 * e.cy * e.cy * e.cy) * yt, Dt = Math.sin(Lt), Ft = Math.cos(Lt);
                var n = "lun" === h ? {
                    x: 0,
                    y: 0,
                    z: 0
                } : {
                    x: a.x,
                    y: a.y,
                    z: a.z
                };
                e.xeq = e.x - n.x, e.yeq = (e.y - n.y) * Ft - (e.z - n.z) * Dt, e.zeq = (e.y - n.y) * Dt + (e.z - n.z) * Ft, e.ra = jt.normalize(Math.atan2(e.yeq, e.xeq)), e.dec = Math.atan2(e.zeq, Math.sqrt(e.xeq * e.xeq + e.yeq * e.yeq)), "lun" === h && (e = u(e, a)), e.pos = [e.ra / yt, e.dec / yt], e.rt = Math.sqrt(e.xeq * e.xeq + e.yeq * e.yeq + e.zeq * e.zeq), "sol" !== h && (e.mag = i())
            }

            function i() {
                var t = M.ephemeris,
                    e = t.r,
                    a = t.rt,
                    n = Math.acos((e * e + a * a - 1) / (2 * e * a)),
                    r = .666 * ((1 - n / Math.PI) * Math.cos(n) + 1 / Math.PI * Math.sin(n));
                return 1 * M.H + 5 * Math.log(e * a) * Math.LOG10E - 2.5 * Math.log(r) * Math.LOG10E
            }

            function l() {
                var t = M.ephemeris,
                    e = t.v + t.w;
                return t.x = t.r * (Math.cos(t.N) * Math.cos(e) - Math.sin(t.N) * Math.sin(e) * Math.cos(t.i)), t.y = t.r * (Math.sin(t.N) * Math.cos(e) + Math.cos(t.N) * Math.sin(e) * Math.cos(t.i)), t.z = t.r * (Math.sin(e) * Math.sin(t.i)), M
            }

            function c() {
                var t = M.ephemeris,
                    e = Math.atan2(t.y, t.x),
                    a = Math.atan2(t.z, Math.sqrt(t.x * t.x + t.y * t.y));
                return t.l = jt.normalize(e), t.b = a, M
            }

            function d(t) {
                var e = t.getUTCFullYear(),
                    a = t.getUTCMonth() + 1,
                    n = t.getUTCDate(),
                    r = (t.getUTCHours() - 12 + t.getUTCMinutes() / 60 + t.getUTCSeconds() / 3600) / 24;
                if (e < -4799) return -1;
                var s = Math.floor((14 - a) / 12),
                    o = e + 4800 - s,
                    i = a + 12 * s - 3;
                return n + Math.floor((153 * i + 2) / 5) + 365 * o + Math.floor(o / 4) - Math.floor(o / 100) + Math.floor(o / 400) - 32045 + r
            }

            function p(t) {
                if (void 0 !== Et) return Et.elements(t)
            }

            function u(t, e) {
                if (c(), void 0 !== Et) return Et.corr(t, e)
            }
            var h, f, m, y = It.sol,
                g = "sol",
                v = {},
                M = {},
                b = function(t) {
                    var e, a = M.ephemeris = {};
                    t && (e = t instanceof Date ? new Date(t.valueOf()) : I(t)), e || (e = new Date), a.jd = d(e), e = I(v.ep), e || (e = I("2000-01-01")), a.jd0 = d(e), a.d = a.jd - a.jd0, a.cy = a.d / 36525
                },
                w = function() {
                    var t, e = M.ephemeris;
                    if ("lun" === h) {
                        if (!(e = p(e))) return
                    } else {
                        for (var a = 0; a < Ot.length; a++) t = Ot[a], k(v, t) && (k(v, "d" + t) ? e[t] = v[t] + v["d" + t] * e.cy : k(v, t) && (e[t] = v[t]));
                        k(e, "M") && !k(e, "dM") && k(e, "n") && (e.M += e.n * e.d)
                    }
                    r(), n(), l()
                };
            return t.cartesian = function() {
                return M
            }, t.spherical = function() {
                return c(), M
            }, t.equatorial = function(t) {
                return o(t), M
            }, t.transpose = function() {
                return s(), M
            }, t.elements = function(e) {
                var a;
                if (!arguments.length || void 0 === arguments[0]) return t;
                for (var n = 0; n < Ot.length; n++) a = Ot[n], k(e, a) && (v[a] = e[a], "a" === a || "e" === a ? v[a] *= 1 : "ref" !== a && "ep" !== a && (v[a] *= yt), k(e, "d" + a) && (a = "d" + a, v[a] = e[a], v[a] *= "da" === a || "de" === a ? 1 : yt));
                return t
            }, t.params = function(e) {
                if (!arguments.length) return t;
                for (var a in e) k(e, a) && "elements" !== e[a] && (M[a] = e[a]);
                return t
            }, t.parentBody = function(e) {
                return arguments.length ? (g = e, y = It[g], t) : g
            }, t.id = function(e) {
                return arguments.length ? (h = e, m = qt[e], t) : h
            }, t.Name = function(e) {
                return arguments.length ? (f = e, t) : f
            }, t.symbol = function(e) {
                return arguments.length ? (m = qt[e], t) : m
            }, t
        },
        Et = {
            elements: function(t) {
                var e = (t.jd - 2451545) / 36525,
                    a = e * e,
                    n = e * a,
                    r = e * n,
                    s = 1e-4 * a,
                    o = 1e-6 * n,
                    i = 1e-8 * r,
                    l = 3400.4 * Math.cos(yt * (235.7004 + 890534.223 * e - 32.601 * s + 3.664 * o - 1.769 * i)) - 635.6 * Math.cos(yt * (100.737 + 413335.3554 * e - 122.571 * s - 10.684 * o + 5.028 * i)) - 235.6 * Math.cos(yt * (134.9634 + 477198.8676 * e + 89.97 * s + 14.348 * o - 6.797 * i)) + 218.1 * Math.cos(yt * (238.1713 + 854535.1727 * e - 31.065 * s + 3.623 * o - 1.769 * i)) + 181 * Math.cos(yt * (10.6638 + 1367733.0907 * e + 57.37 * s + 18.011 * o - 8.566 * i)) - 39.9 * Math.cos(yt * (103.2079 + 377336.3051 * e - 121.035 * s - 10.724 * o + 5.028 * i)) - 38.4 * Math.cos(yt * (233.2295 + 926533.2733 * e - 34.136 * s + 3.705 * o - 1.769 * i)) + 33.8 * Math.cos(yt * (336.4374 + 1303869.5784 * e - 155.171 * s - 7.02 * o + 3.259 * i)) + 28.8 * Math.cos(yt * (111.4008 + 1781068.4461 * e - 65.201 * s + 7.328 * o - 3.538 * i)) + 12.6 * Math.cos(yt * (13.1347 + 1331734.0404 * e + 58.906 * s + 17.971 * o - 8.566 * i)) + 11.4 * Math.cos(yt * (186.5442 + 966404.0351 * e - 68.058 * s - .567 * o + .232 * i)) - 11.1 * Math.cos(yt * (222.5657 - 441199.8173 * e - 91.506 * s - 14.307 * o + 6.797 * i)) - 10.2 * Math.cos(yt * (269.9268 + 954397.7353 * e + 179.941 * s + 28.695 * o - 13.594 * i)) + 9.7 * Math.cos(yt * (145.6272 + 1844931.9583 * e + 147.34 * s + 32.359 * o - 15.363 * i)) + 9.6 * Math.cos(yt * (240.6422 + 818536.1225 * e - 29.529 * s + 3.582 * o - 1.769 * i)) + 8 * Math.cos(yt * (297.8502 + 445267.1115 * e - 16.3 * s + 1.832 * o - .884 * i)) - 6.2 * Math.cos(yt * (132.4925 + 513197.9179 * e + 88.434 * s + 14.388 * o - 6.797 * i)) + 6 * Math.cos(yt * (173.5506 + 1335801.3346 * e - 48.901 * s + 5.496 * o - 2.653 * i)) + 3.7 * Math.cos(yt * (113.8717 + 1745069.3958 * e - 63.665 * s + 7.287 * o - 3.538 * i)) + 3.6 * Math.cos(yt * (338.9083 + 1267870.5281 * e - 153.636 * s - 7.061 * o + 3.259 * i)) + 3.2 * Math.cos(yt * (246.3642 + 2258267.3137 * e + 24.769 * s + 21.675 * o - 10.335 * i)) - 3 * Math.cos(yt * (8.1929 + 1403732.141 * e + 55.834 * s + 18.052 * o - 8.566 * i)) + 2.3 * Math.cos(yt * (98.2661 + 449334.4057 * e - 124.107 * s - 10.643 * o + 5.028 * i)) - 2.2 * Math.cos(yt * (357.5291 + 35999.0503 * e - 1.536 * s + .041 * o + 0 * i)) - 2 * Math.cos(yt * (38.5872 + 858602.4669 * e - 138.871 * s - 8.852 * o + 4.144 * i)) - 1.8 * Math.cos(yt * (105.6788 + 341337.2548 * e - 119.499 * s - 10.765 * o + 5.028 * i)) - 1.7 * Math.cos(yt * (201.474 + 826670.7108 * e - 245.142 * s - 21.367 * o + 10.057 * i)) + 1.6 * Math.cos(yt * (184.1196 + 401329.0556 * e + 125.428 * s + 18.579 * o - 8.798 * i)) - 1.4 * Math.cos(yt * (308.4192 - 489205.1674 * e + 158.029 * s + 14.915 * o - 7.029 * i)) + 1.3 * Math.cos(yt * (325.7736 - 63863.5122 * e - 212.541 * s - 25.031 * o + 11.826 * i)),
                    c = -.55 * Math.cos(yt * (238.2 + 854535.2 * e)) + .1 * Math.cos(yt * (103.2 + 377336.3 * e)) + .1 * Math.cos(yt * (233.2 + 926533.3 * e)),
                    d = 383397.6 + l + c * e,
                    p = .014217 * Math.cos(yt * (100.737 + 413335.3554 * e - 122.571 * s - 10.684 * o + 5.028 * i)) + .008551 * Math.cos(yt * (325.7736 - 63863.5122 * e - 212.541 * s - 25.031 * o + 11.826 * i)) - .001383 * Math.cos(yt * (134.9634 + 477198.8676 * e + 89.97 * s + 14.348 * o - 6.797 * i)) + .001353 * Math.cos(yt * (10.6638 + 1367733.0907 * e + 57.37 * s + 18.011 * o - 8.566 * i)) - .001146 * Math.cos(yt * (66.5106 + 349471.8432 * e - 335.112 * s - 35.715 * o + 16.854 * i)) - 915e-6 * Math.cos(yt * (201.474 + 826670.7108 * e - 245.142 * s - 21.367 * o + 10.057 * i)) + 869e-6 * Math.cos(yt * (103.2079 + 377336.3051 * e - 121.035 * s - 10.724 * o + 5.028 * i)) - 628e-6 * Math.cos(yt * (235.7004 + 890534.223 * e - 32.601 * s + 3.664 * o - 1.769 * i)) - 393e-6 * Math.cos(yt * (291.5472 - 127727.0245 * e - 425.082 * s - 50.062 * o + 23.651 * i)) + 284e-6 * Math.cos(yt * (328.2445 - 99862.5625 * e - 211.005 * s - 25.072 * o + 11.826 * i)) - 278e-6 * Math.cos(yt * (162.8868 - 31931.7561 * e - 106.271 * s - 12.516 * o + 5.913 * i)) - 24e-5 * Math.cos(yt * (269.9268 + 954397.7353 * e + 179.941 * s + 28.695 * o - 13.594 * i)) + 23e-5 * Math.cos(yt * (111.4008 + 1781068.4461 * e - 65.201 * s + 7.328 * o - 3.538 * i)) + 229e-6 * Math.cos(yt * (167.2476 + 762807.1986 * e - 457.683 * s - 46.398 * o + 21.882 * i)) - 202e-6 * Math.cos(yt * (83.3826 - 12006.2998 * e + 247.999 * s + 29.262 * o - 13.826 * i)) + 19e-5 * Math.cos(yt * (190.8102 - 541062.3799 * e - 302.511 * s - 39.379 * o + 18.623 * i)) + 177e-6 * Math.cos(yt * (357.5291 + 35999.0503 * e - 1.536 * s + .041 * o + 0 * i)) + 153e-6 * Math.cos(yt * (32.2842 + 285608.3309 * e - 547.653 * s - 60.746 * o + 28.679 * i)) - 137e-6 * Math.cos(yt * (44.8902 + 1431596.6029 * e + 269.911 * s + 43.043 * o - 20.392 * i)) + 122e-6 * Math.cos(yt * (145.6272 + 1844931.9583 * e + 147.34 * s + 32.359 * o - 15.363 * i)) + 116e-6 * Math.cos(yt * (302.211 + 1240006.0662 * e - 367.713 * s - 32.051 * o + 15.085 * i)) - 111e-6 * Math.cos(yt * (203.9449 + 790671.6605 * e - 243.606 * s - 21.408 * o + 10.057 * i)) - 108e-6 * Math.cos(yt * (68.9815 + 313472.7929 * e - 333.576 * s - 35.756 * o + 16.854 * i)) + 96e-6 * Math.cos(yt * (336.4374 + 1303869.5784 * e - 155.171 * s - 7.02 * o + 3.259 * i)) - 9e-5 * Math.cos(yt * (98.2661 + 449334.4057 * e - 124.107 * s - 10.643 * o + 5.028 * i)) + 9e-5 * Math.cos(yt * (13.1347 + 1331734.0404 * e + 58.906 * s + 17.971 * o - 8.566 * i)) + 56e-6 * Math.cos(yt * (55.8468 - 1018261.2475 * e - 392.482 * s - 53.726 * o + 25.42 * i)) - 56e-6 * Math.cos(yt * (238.1713 + 854535.1727 * e - 31.065 * s + 3.623 * o - 1.769 * i)) + 52e-6 * Math.cos(yt * (308.4192 - 489205.1674 * e + 158.029 * s + 14.915 * o - 7.029 * i)) - 5e-5 * Math.cos(yt * (133.0212 + 698943.6863 * e - 670.224 * s - 71.429 * o + 33.708 * i)) - 49e-6 * Math.cos(yt * (267.9846 + 1176142.554 * e - 580.254 * s - 57.082 * o + 26.911 * i)) - 49e-6 * Math.cos(yt * (184.1196 + 401329.0556 * e + 125.428 * s + 18.579 * o - 8.798 * i)) - 45e-6 * Math.cos(yt * (49.1562 - 75869.812 * e + 35.458 * s + 4.231 * o - 2.001 * i)) + 44e-6 * Math.cos(yt * (257.3208 - 191590.5367 * e - 637.623 * s - 75.093 * o + 35.477 * i)) + 42e-6 * Math.cos(yt * (105.6788 + 341337.2548 * e - 119.499 * s - 10.765 * o + 5.028 * i)) + 42e-6 * Math.cos(yt * (160.4159 + 4067.2942 * e - 107.806 * s - 12.475 * o + 5.913 * i)) + 4e-5 * Math.cos(yt * (246.3642 + 2258267.3137 * e + 24.769 * s + 21.675 * o - 10.335 * i)) - 4e-5 * Math.cos(yt * (156.5838 - 604925.8921 * e - 515.053 * s - 64.41 * o + 30.448 * i)) + 36e-6 * Math.cos(yt * (169.7185 + 726808.1483 * e - 456.147 * s - 46.439 * o + 21.882 * i)) + 29e-6 * Math.cos(yt * (113.8717 + 1745069.3958 * e - 63.665 * s + 7.287 * o - 3.538 * i)) - 29e-6 * Math.cos(yt * (297.8502 + 445267.1115 * e - 16.3 * s + 1.832 * o - .884 * i)) - 28e-6 * Math.cos(yt * (294.0181 - 163726.0747 * e - 423.546 * s - 50.103 * o + 23.651 * i)) + 27e-6 * Math.cos(yt * (263.6238 + 381403.5993 * e - 228.841 * s - 23.199 * o + 10.941 * i)) - 26e-6 * Math.cos(yt * (358.0578 + 221744.8187 * e - 760.194 * s - 85.777 * o + 40.505 * i)) - 26e-6 * Math.cos(yt * (8.1929 + 1403732.141 * e + 55.834 * s + 18.052 * o - 8.566 * i)),
                    u = -.0022 * Math.cos(yt * (103.2 + 377336.3 * e)),
                    h = .055544 + p + .001 * e * u,
                    f = .0011776 * Math.cos(yt * (49.1562 - 75869.812 * e + 35.458 * s + 4.231 * o - 2.001 * i)) - 971e-7 * Math.cos(yt * (235.7004 + 890534.223 * e - 32.601 * s + 3.664 * o - 1.769 * i)) + 908e-7 * Math.cos(yt * (186.5442 + 966404.0351 * e - 68.058 * s - .567 * o + .232 * i)) + 623e-7 * Math.cos(yt * (83.3826 - 12006.2998 * e + 247.999 * s + 29.262 * o - 13.826 * i)) + 483e-7 * Math.cos(yt * (51.6271 - 111868.8623 * e + 36.994 * s + 4.19 * o - 2.001 * i)) + 348e-7 * Math.cos(yt * (100.737 + 413335.3554 * e - 122.571 * s - 10.684 * o + 5.028 * i)) - 316e-7 * Math.cos(yt * (308.4192 - 489205.1674 * e + 158.029 * s + 14.915 * o - 7.029 * i)) - 253e-7 * Math.cos(yt * (46.6853 - 39870.7617 * e + 33.922 * s + 4.272 * o - 2.001 * i)) - 141e-7 * Math.cos(yt * (274.1928 - 553068.6797 * e - 54.513 * s - 10.116 * o + 4.797 * i)) + 127e-7 * Math.cos(yt * (325.7736 - 63863.5122 * e - 212.541 * s - 25.031 * o + 11.826 * i)) + 117e-7 * Math.cos(yt * (184.1196 + 401329.0556 * e + 125.428 * s + 18.579 * o - 8.798 * i)) - 78e-7 * Math.cos(yt * (98.3124 - 151739.624 * e + 70.916 * s + 8.462 * o - 4.001 * i)) - 63e-7 * Math.cos(yt * (238.1713 + 854535.1727 * e - 31.065 * s + 3.623 * o - 1.769 * i)) + 63e-7 * Math.cos(yt * (134.9634 + 477198.8676 * e + 89.97 * s + 14.348 * o - 6.797 * i)) + 36e-7 * Math.cos(yt * (321.5076 + 1443602.9027 * e + 21.912 * s + 13.78 * o - 6.566 * i)) - 35e-7 * Math.cos(yt * (10.6638 + 1367733.0907 * e + 57.37 * s + 18.011 * o - 8.566 * i)) + 24e-7 * Math.cos(yt * (149.8932 + 337465.5434 * e - 87.113 * s - 6.453 * o + 3.028 * i)) + 24e-7 * Math.cos(yt * (170.9849 - 930404.9848 * e + 66.523 * s + .608 * o - .232 * i)),
                    m = -.0203 * Math.cos(yt * (125 - 1934.1 * e)) + .0034 * Math.cos(yt * (220.2 - 1935.5 * e)),
                    y = .0449858 + f + .001 * m,
                    g = -15.448 * Math.sin(yt * (100.737 + 413335.3554 * e - 122.571 * s - 10.684 * o + 5.028 * i)) - 9.642 * Math.sin(yt * (325.7736 - 63863.5122 * e - 212.541 * s - 25.031 * o + 11.826 * i)) - 2.721 * Math.sin(yt * (134.9634 + 477198.8676 * e + 89.97 * s + 14.348 * o - 6.797 * i)) + 2.607 * Math.sin(yt * (66.5106 + 349471.8432 * e - 335.112 * s - 35.715 * o + 16.854 * i)) + 2.085 * Math.sin(yt * (201.474 + 826670.7108 * e - 245.142 * s - 21.367 * o + 10.057 * i)) + 1.477 * Math.sin(yt * (10.6638 + 1367733.0907 * e + 57.37 * s + 18.011 * o - 8.566 * i)) + .968 * Math.sin(yt * (291.5472 - 127727.0245 * e - 425.082 * s - 50.062 * o + 23.651 * i)) - .949 * Math.sin(yt * (103.2079 + 377336.3051 * e - 121.035 * s - 10.724 * o + 5.028 * i)) - .703 * Math.sin(yt * (167.2476 + 762807.1986 * e - 457.683 * s - 46.398 * o + 21.882 * i)) - .66 * Math.sin(yt * (235.7004 + 890534.223 * e - 32.601 * s + 3.664 * o - 1.769 * i)) - .577 * Math.sin(yt * (190.8102 - 541062.3799 * e - 302.511 * s - 39.379 * o + 18.623 * i)) - .524 * Math.sin(yt * (269.9268 + 954397.7353 * e + 179.941 * s + 28.695 * o - 13.594 * i)) - .482 * Math.sin(yt * (32.2842 + 285608.3309 * e - 547.653 * s - 60.746 * o + 28.679 * i)) + .452 * Math.sin(yt * (357.5291 + 35999.0503 * e - 1.536 * s + .041 * o + 0 * i)) - .381 * Math.sin(yt * (302.211 + 1240006.0662 * e - 367.713 * s - 32.051 * o + 15.085 * i)) - .342 * Math.sin(yt * (328.2445 - 99862.5625 * e - 211.005 * s - 25.072 * o + 11.826 * i)) - .312 * Math.sin(yt * (44.8902 + 1431596.6029 * e + 269.911 * s + 43.043 * o - 20.392 * i)) + .282 * Math.sin(yt * (162.8868 - 31931.7561 * e - 106.271 * s - 12.516 * o + 5.913 * i)) + .255 * Math.sin(yt * (203.9449 + 790671.6605 * e - 243.606 * s - 21.408 * o + 10.057 * i)) + .252 * Math.sin(yt * (68.9815 + 313472.7929 * e - 333.576 * s - 35.756 * o + 16.854 * i)) - .211 * Math.sin(yt * (83.3826 - 12006.2998 * e + 247.999 * s + 29.262 * o - 13.826 * i)) + .193 * Math.sin(yt * (267.9846 + 1176142.554 * e - 580.254 * s - 57.082 * o + 26.911 * i)) + .191 * Math.sin(yt * (133.0212 + 698943.6863 * e - 670.224 * s - 71.429 * o + 33.708 * i)) - .184 * Math.sin(yt * (55.8468 - 1018261.2475 * e - 392.482 * s - 53.726 * o + 25.42 * i)) + .182 * Math.sin(yt * (145.6272 + 1844931.9583 * e + 147.34 * s + 32.359 * o - 15.363 * i)) - .158 * Math.sin(yt * (257.3208 - 191590.5367 * e - 637.623 * s - 75.093 * o + 35.477 * i)) + .148 * Math.sin(yt * (156.5838 - 604925.8921 * e - 515.053 * s - 64.41 * o + 30.448 * i)) - .111 * Math.sin(yt * (169.7185 + 726808.1483 * e - 456.147 * s - 46.439 * o + 21.882 * i)) + .101 * Math.sin(yt * (13.1347 + 1331734.0404 * e + 58.906 * s + 17.971 * o - 8.566 * i)) + .1 * Math.sin(yt * (358.0578 + 221744.8187 * e - 760.194 * s - 85.777 * o + 40.505 * i)) + .087 * Math.sin(yt * (98.2661 + 449334.4057 * e - 124.107 * s - 10.643 * o + 5.028 * i)) + .08 * Math.sin(yt * (42.948 + 1653341.4216 * e - 490.283 * s - 42.734 * o + 20.113 * i)) + .08 * Math.sin(yt * (222.5657 - 441199.8173 * e - 91.506 * s - 14.307 * o + 6.797 * i)) + .077 * Math.sin(yt * (294.0181 - 163726.0747 * e - 423.546 * s - 50.103 * o + 23.651 * i)) - .073 * Math.sin(yt * (280.8834 - 1495460.1151 * e - 482.452 * s - 68.074 * o + 32.217 * i)) - .071 * Math.sin(yt * (304.6819 + 1204007.0159 * e - 366.177 * s - 32.092 * o + 15.085 * i)) - .069 * Math.sin(yt * (233.7582 + 1112279.0417 * e - 792.795 * s - 82.113 * o + 38.736 * i)) - .067 * Math.sin(yt * (34.7551 + 249609.2807 * e - 546.117 * s - 60.787 * o + 28.679 * i)) - .067 * Math.sin(yt * (263.6238 + 381403.5993 * e - 228.841 * s - 23.199 * o + 10.941 * i)) + .055 * Math.sin(yt * (21.6203 - 1082124.7597 * e - 605.023 * s - 78.757 * o + 37.246 * i)) + .055 * Math.sin(yt * (308.4192 - 489205.1674 * e + 158.029 * s + 14.915 * o - 7.029 * i)) - .054 * Math.sin(yt * (8.7216 + 1589477.9094 * e - 702.824 * s - 67.766 * o + 31.939 * i)) - .052 * Math.sin(yt * (179.8536 + 1908795.4705 * e + 359.881 * s + 57.39 * o - 27.189 * i)) - .05 * Math.sin(yt * (98.7948 + 635080.1741 * e - 882.765 * s - 96.461 * o + 45.533 * i)) - .049 * Math.sin(yt * (128.6604 - 95795.2683 * e - 318.812 * s - 37.547 * o + 17.738 * i)) - .047 * Math.sin(yt * (17.3544 + 425341.6552 * e - 370.57 * s - 39.946 * o + 18.854 * i)) - .044 * Math.sin(yt * (160.4159 + 4067.2942 * e - 107.806 * s - 12.475 * o + 5.913 * i)) - .043 * Math.sin(yt * (238.1713 + 854535.1727 * e - 31.065 * s + 3.623 * o - 1.769 * i)) + .042 * Math.sin(yt * (270.4555 + 1140143.5037 * e - 578.718 * s - 57.123 * o + 26.911 * i)) - .042 * Math.sin(yt * (132.4925 + 513197.9179 * e + 88.434 * s + 14.388 * o - 6.797 * i)) - .041 * Math.sin(yt * (122.3573 - 668789.4043 * e - 727.594 * s - 89.441 * o + 42.274 * i)) - .04 * Math.sin(yt * (105.6788 + 341337.2548 * e - 119.499 * s - 10.765 * o + 5.028 * i)) + .038 * Math.sin(yt * (135.4921 + 662944.6361 * e - 668.688 * s - 71.47 * o + 33.708 * i)) - .037 * Math.sin(yt * (242.391 - 51857.2124 * e - 460.54 * s - 54.293 * o + 25.652 * i)) + .036 * Math.sin(yt * (336.4374 + 1303869.5784 * e - 155.171 * s - 7.02 * o + 3.259 * i)) + .035 * Math.sin(yt * (223.0943 - 255454.0489 * e - 850.164 * s - 100.124 * o + 47.302 * i)) - .034 * Math.sin(yt * (193.2811 - 577061.4302 * e - 300.976 * s - 39.419 * o + 18.623 * i)) + .031 * Math.sin(yt * (87.6023 - 918398.685 * e - 181.476 * s - 28.654 * o + 13.594 * i)),
                    v = 2.4 * Math.sin(yt * (103.2 + 377336.3 * e)),
                    M = 83.353 + 4069.0137 * e - 103.238 * s - 12.492 * o + 5.263 * i + g + .001 * e * v,
                    b = -1.4979 * Math.sin(yt * (49.1562 - 75869.812 * e + 35.458 * s + 4.231 * o - 2.001 * i)) - .15 * Math.sin(yt * (357.5291 + 35999.0503 * e - 1.536 * s + .041 * o + 0 * i)) - .1226 * Math.sin(yt * (235.7004 + 890534.223 * e - 32.601 * s + 3.664 * o - 1.769 * i)) + .1176 * Math.sin(yt * (186.5442 + 966404.0351 * e - 68.058 * s - .567 * o + .232 * i)) - .0801 * Math.sin(yt * (83.3826 - 12006.2998 * e + 247.999 * s + 29.262 * o - 13.826 * i)) - .0616 * Math.sin(yt * (51.6271 - 111868.8623 * e + 36.994 * s + 4.19 * o - 2.001 * i)) + .049 * Math.sin(yt * (100.737 + 413335.3554 * e - 122.571 * s - 10.684 * o + 5.028 * i)) + .0409 * Math.sin(yt * (308.4192 - 489205.1674 * e + 158.029 * s + 14.915 * o - 7.029 * i)) + .0327 * Math.sin(yt * (134.9634 + 477198.8676 * e + 89.97 * s + 14.348 * o - 6.797 * i)) + .0324 * Math.sin(yt * (46.6853 - 39870.7617 * e + 33.922 * s + 4.272 * o - 2.001 * i)) + .0196 * Math.sin(yt * (98.3124 - 151739.624 * e + 70.916 * s + 8.462 * o - 4.001 * i)) + .018 * Math.sin(yt * (274.1928 - 553068.6797 * e - 54.513 * s - 10.116 * o + 4.797 * i)) + .015 * Math.sin(yt * (325.7736 - 63863.5122 * e - 212.541 * s - 25.031 * o + 11.826 * i)) - .015 * Math.sin(yt * (184.1196 + 401329.0556 * e + 125.428 * s + 18.579 * o - 8.798 * i)) - .0078 * Math.sin(yt * (238.1713 + 854535.1727 * e - 31.065 * s + 3.623 * o - 1.769 * i)) - .0045 * Math.sin(yt * (10.6638 + 1367733.0907 * e + 57.37 * s + 18.011 * o - 8.566 * i)) + .0044 * Math.sin(yt * (321.5076 + 1443602.9027 * e + 21.912 * s + 13.78 * o - 6.566 * i)) - .0042 * Math.sin(yt * (162.8868 - 31931.7561 * e - 106.271 * s - 12.516 * o + 5.913 * i)) - .0031 * Math.sin(yt * (170.9849 - 930404.9848 * e + 66.523 * s + .608 * o - .232 * i)) + .0031 * Math.sin(yt * (103.2079 + 377336.3051 * e - 121.035 * s - 10.724 * o + 5.028 * i)) + .0029 * Math.sin(yt * (222.612 - 1042273.8471 * e + 103.516 * s + 4.798 * o - 2.232 * i)) + .0028 * Math.sin(yt * (184.0733 + 1002403.0853 * e - 69.594 * s - .526 * o + .232 * i)),
                    w = 25.9 * Math.sin(yt * (125 - 1934.1 * e)) - 4.3 * Math.sin(yt * (220.2 - 1935.5 * e)),
                    k = .38 * Math.sin(yt * (357.5 + 35999.1 * e)),
                    x = 125.0446 - 1934.13618 * e + 20.762 * s + 2.139 * o - 1.65 * i + b + .001 * (w + k * e),
                    z = -.92581 * Math.sin(yt * (235.7004 + 890534.223 * e - 32.601 * s + 3.664 * o - 1.769 * i)) + .33262 * Math.sin(yt * (100.737 + 413335.3554 * e - 122.571 * s - 10.684 * o + 5.028 * i)) - .18402 * Math.sin(yt * (357.5291 + 35999.0503 * e - 1.536 * s + .041 * o + 0 * i)) + .11007 * Math.sin(yt * (134.9634 + 477198.8676 * e + 89.97 * s + 14.348 * o - 6.797 * i)) - .06055 * Math.sin(yt * (238.1713 + 854535.1727 * e - 31.065 * s + 3.623 * o - 1.769 * i)) + .04741 * Math.sin(yt * (325.7736 - 63863.5122 * e - 212.541 * s - 25.031 * o + 11.826 * i)) - .03086 * Math.sin(yt * (10.6638 + 1367733.0907 * e + 57.37 * s + 18.011 * o - 8.566 * i)) + .02184 * Math.sin(yt * (103.2079 + 377336.3051 * e - 121.035 * s - 10.724 * o + 5.028 * i)) + .01645 * Math.sin(yt * (49.1562 - 75869.812 * e + 35.458 * s + 4.231 * o - 2.001 * i)) + .01022 * Math.sin(yt * (233.2295 + 926533.2733 * e - 34.136 * s + 3.705 * o - 1.769 * i)) - .00756 * Math.sin(yt * (336.4374 + 1303869.5784 * e - 155.171 * s - 7.02 * o + 3.259 * i)) - .0053 * Math.sin(yt * (222.5657 - 441199.8173 * e - 91.506 * s - 14.307 * o + 6.797 * i)) - .00496 * Math.sin(yt * (162.8868 - 31931.7561 * e - 106.271 * s - 12.516 * o + 5.913 * i)) - .00472 * Math.sin(yt * (297.8502 + 445267.1115 * e - 16.3 * s + 1.832 * o - .884 * i)) - .00271 * Math.sin(yt * (240.6422 + 818536.1225 * e - 29.529 * s + 3.582 * o - 1.769 * i)) + .00264 * Math.sin(yt * (132.4925 + 513197.9179 * e + 88.434 * s + 14.388 * o - 6.797 * i)) - .00254 * Math.sin(yt * (186.5442 + 966404.0351 * e - 68.058 * s - .567 * o + .232 * i)) + .00234 * Math.sin(yt * (269.9268 + 954397.7353 * e + 179.941 * s + 28.695 * o - 13.594 * i)) - .0022 * Math.sin(yt * (13.1347 + 1331734.0404 * e + 58.906 * s + 17.971 * o - 8.566 * i)) - .00202 * Math.sin(yt * (355.0582 + 71998.1006 * e - 3.072 * s + .082 * o + 0 * i)) + .00167 * Math.sin(yt * (328.2445 - 99862.5625 * e - 211.005 * s - 25.072 * o + 11.826 * i)) - .00143 * Math.sin(yt * (173.5506 + 1335801.3346 * e - 48.901 * s + 5.496 * o - 2.653 * i)) - .00121 * Math.sin(yt * (98.2661 + 449334.4057 * e - 124.107 * s - 10.643 * o + 5.028 * i)) - .00116 * Math.sin(yt * (145.6272 + 1844931.9583 * e + 147.34 * s + 32.359 * o - 15.363 * i)) + .00102 * Math.sin(yt * (105.6788 + 341337.2548 * e - 119.499 * s - 10.765 * o + 5.028 * i)) - 9e-4 * Math.sin(yt * (184.1196 + 401329.0556 * e + 125.428 * s + 18.579 * o - 8.798 * i)) - 86e-5 * Math.sin(yt * (338.9083 + 1267870.5281 * e - 153.636 * s - 7.061 * o + 3.259 * i)) - 78e-5 * Math.sin(yt * (111.4008 + 1781068.4461 * e - 65.201 * s + 7.328 * o - 3.538 * i)) + 69e-5 * Math.sin(yt * (323.3027 - 27864.4619 * e - 214.077 * s - 24.99 * o + 11.826 * i)) + 66e-5 * Math.sin(yt * (51.6271 - 111868.8623 * e + 36.994 * s + 4.19 * o - 2.001 * i)) + 65e-5 * Math.sin(yt * (38.5872 + 858602.4669 * e - 138.871 * s - 8.852 * o + 4.144 * i)) - 6e-4 * Math.sin(yt * (83.3826 - 12006.2998 * e + 247.999 * s + 29.262 * o - 13.826 * i)) + 54e-5 * Math.sin(yt * (201.474 + 826670.7108 * e - 245.142 * s - 21.367 * o + 10.057 * i)) - 52e-5 * Math.sin(yt * (308.4192 - 489205.1674 * e + 158.029 * s + 14.915 * o - 7.029 * i)) + 48e-5 * Math.sin(yt * (8.1929 + 1403732.141 * e + 55.834 * s + 18.052 * o - 8.566 * i)) - 41e-5 * Math.sin(yt * (46.6853 - 39870.7617 * e + 33.922 * s + 4.272 * o - 2.001 * i)) - 33e-5 * Math.sin(yt * (274.1928 - 553068.6797 * e - 54.513 * s - 10.116 * o + 4.797 * i)) + 3e-4 * Math.sin(yt * (160.4159 + 4067.2942 * e - 107.806 * s - 12.475 * o + 5.913 * i)),
                    S = 3.96 * Math.sin(yt * (119.7 + 131.8 * e)) + 1.96 * Math.sin(yt * (125 - 1934.1 * e)),
                    T = .463 * Math.sin(yt * (357.5 + 35999.1 * e)) + .152 * Math.sin(yt * (238.2 + 854535.2 * e)) - .071 * Math.sin(yt * (27.8 + 131.8 * e)) - .055 * Math.sin(yt * (103.2 + 377336.3 * e)) - .026 * Math.sin(yt * (233.2 + 926533.3 * e)),
                    j = 14 * Math.sin(yt * (357.5 + 35999.1 * e)) + 5 * Math.sin(yt * (238.2 + 854535.2 * e)),
                    P = 218.31665 + 481267.88134 * e - 13.268 * s + 1.856 * o - 1.534 * i + z + .001 * (S + T * e + j * s);
                return t.a = d, t.e = h, t.i = 2 * Math.asin(y), t.w = jt.normalize(yt * (M - x)), t.N = jt.normalize(yt * x), t.M = jt.normalize(yt * (P - M)), t
            },
            corr: function(t, e) {
                var a = jt.normalize(e.M + Math.PI),
                    n = jt.normalize(e.w + Math.PI),
                    r = t.M + t.w,
                    s = r + t.N - a - n,
                    o = -.022234 * Math.sin(t.M - 2 * s) + .011494 * Math.sin(2 * s) + -.003246 * Math.sin(a) + -.001029 * Math.sin(2 * t.M - 2 * s) + -994838e-9 * Math.sin(t.M - 2 * s + a) + 925025e-9 * Math.sin(t.M + 2 * s) + 802851e-9 * Math.sin(2 * s - a) + 715585e-9 * Math.sin(t.M - a) + -610865e-9 * Math.sin(s) + -541052e-9 * Math.sin(t.M + a) + -261799e-9 * Math.sin(2 * r - 2 * s) + 191986e-9 * Math.sin(t.M - 4 * s);
                t.ra += o;
                var i = -.003019 * Math.sin(r - 2 * s) + -959931e-9 * Math.sin(t.M - r - 2 * s) + -802851e-9 * Math.sin(t.M + r - 2 * s) + 575958e-9 * Math.sin(r + 2 * s) + 296706e-9 * Math.sin(2 * t.M + r);
                return t.dec += i, t.age = jt.normalize(t.l - e.l + Math.PI), t.phase = .5 * (1 - Math.cos(t.age)), t
            }
        },
        Nt = d3.map({
            ellipse: function(t, e) {
                var a = Math.sqrt(t),
                    n = .666 * a,
                    r = a / 3;
                return "M" + -n + "," + -r + " m" + -n + ",0 a" + n + "," + r + " 0 1,0" + 2 * n + ",0 a" + n + "," + r + " 0 1,0" + -2 * n + ",0"
            },
            marker: function(t, e) {
                var a = t > 48 ? t / 4 : 12,
                    n = a / 2,
                    r = n - 3;
                return "M " + -n + " 0 h " + r + " M 0 " + -n + " v " + r + " M " + n + " 0 h " + -r + " M 0 " + n + " v " + -r
            },
            "cross-circle": function(t, e) {
                var a = Math.sqrt(t),
                    n = a / 2;
                return "M" + -n + "," + -n + " m" + -n + ",0 a" + n + "," + n + " 0 1,0" + 2 * n + ",0 a" + n + "," + n + " 0 1,0" + -2 * n + ",0 M" + -n + " 0 h " + a + " M 0 " + -n + " v " + a
            },
            "stroke-circle": function(t, e) {
                var a = Math.sqrt(t),
                    n = a / 2;
                return "M" + -n + "," + -n + " m" + -n + ",0 a" + n + "," + n + " 0 1,0" + 2 * n + ",0 a" + n + "," + n + " 0 1,0" + -2 * n + ",0 M" + (-a - 2) + "," + (-a - 2) + " l" + (a + 4) + "," + (a + 4)
            },
            crescent: function(t, e) {
                var a = Math.sqrt(t),
                    n = a / 2,
                    r = .5 * (1 - Math.cos(e)),
                    s = 1.6 * Math.abs(r - .5) + .01,
                    o = e > Math.PI ? 0 : 1;
                return "M -1,-1 m 1," + (1 - n) + " a" + n + "," + n + " 0 1 " + o + " 0," + 2 * n + " a" + n * s + "," + n + " 0 1 " + (Math.abs(r) > .5 ? o : Math.abs(o - 1)) + " 0," + -2 * n + "z"
            }
        });
    d3.svg.customSymbol = function() {
        function t(t, r) {
            return Nt.get(e.call(this, t, r))(a.call(this, t, r), n.call(this, t, r))
        }
        var e, a = 64,
            n = d3.functor(1);
        return t.type = function(a) {
            return arguments.length ? (e = d3.functor(a), t) : e
        }, t.size = function(e) {
            return arguments.length ? (a = d3.functor(e), t) : a
        }, t.ratio = function(e) {
            return arguments.length ? (n = d3.functor(e), t) : n
        }, t
    };
    var Ct = null;
    tt.exportSVG = function(t) {
        t && (Ct = t, R())
    };
    var Ht = function(t, e) {
        function a() {
            var t = W("mon").value,
                e = W("yr").value,
                a = new Date(e, t, 1),
                n = d3.select(J + " ~ #celestial-form").select("#cal"),
                r = new Date;
            e = parseInt(e), t = parseInt(t), a.setDate(a.getDate() - a.getDay());
            for (var s = n.node(); s.firstChild;) s.removeChild(s.firstChild);
            for (var o = 0; o < 7; o++) n.append("div").classed({
                date: !0,
                weekday: !0
            }).html(f[o]);
            for (o = 0; o < 42; o++) {
                var i = a.getMonth(),
                    l = a.getDay(),
                    c = m(a);
                n.append("div").classed({
                    date: !0,
                    grey: i !== t,
                    weekend: i === t && (0 === l || 6 === l),
                    today: 0 === A(a, r),
                    selected: 0 === A(a, p)
                }).attr("id", c).on("click", d).html(a.getDate().toString()), a.setDate(a.getDate() + 1)
            }
        }

        function n() {
            var t = d3.select(J + " ~ #celestial-form").select("select#yr"),
                e = p.getFullYear(),
                a = 0,
                n = s(p);
            t.selectAll("*").remove(), t.selectAll("option").data(n).enter().append("option").text(function(t, n) {
                return t === e && (a = n), t.toString()
            }), t.property("selectedIndex", a)
        }

        function r(t) {
            g.append("div").attr("id", t).on("click", function() {
                var e = W("mon"),
                    n = W("yr");
                "left" === t ? 0 === e.selectedIndex ? (e.selectedIndex = 11, n.selectedIndex--) : e.selectedIndex-- : 11 === e.selectedIndex ? (e.selectedIndex = 0, n.selectedIndex++) : e.selectedIndex++, a()
            })
        }

        function s(t) {
            for (var e = o(t.getFullYear()), a = [], n = e[0]; n <= e[1]; n++) a.push(n);
            return a
        }

        function o(t) {
            return !y || y.length < 1 ? [t - 10, t + 10] : 1 === y.length && x(y[0]) ? y[0] >= 100 ? [y[0] - 10, y[0] + 10] : [t - y[0], t + y[0]] : 2 === y.length && x(y[0]) && x(y[1]) ? y[1] >= 100 ? [y[0], y[1]] : [y[0] - y[1], y[0] + y[1]] : [t - 10, t + 10]
        }

        function i(t, e) {
            for (var a = W(t), n = 0; n < a.childNodes.length; n++)
                if (a.childNodes[n].value == e) {
                    a.selectedIndex = n;
                    break
                }
        }

        function l(t) {
            t && p.setTime(t.valueOf()), i("yr", p.getFullYear()), i("mon", p.getMonth()), a(), W("hr").value = p.getHours(), W("min").value = p.getMinutes(), W("sec").value = p.getSeconds()
        }

        function c() {
            d3.select(J + " ~ #celestial-form").select("#celestial-date").style("opacity", 0), d3.select("#error").style({
                top: "-9999px",
                left: "-9999px",
                opacity: 0
            }), d3.select(J + " ~ #celestial-form").select("#datepick").classed("active", !1), setTimeout(function() {
                W("celestial-date").style.top = M(-9999)
            }, 600)
        }

        function d() {
            var t = W("hr").value,
                a = W("min").value,
                r = W("sec").value,
                s = W("tz").value;
            this.id && -1 !== this.id.search(/^\d/) && (p = m.parse(this.id)), n(), p.setHours(t, a, r), l(), e(p, s)
        }
        var p = new Date,
            u = (d3.time.format("%Z"), [{
                "−12:00": -720
            }, {
                "−11:00": -660
            }, {
                "−10:00": -600
            }, {
                "−09:30": -570
            }, {
                "−09:00": -540
            }, {
                "−08:00": -480
            }, {
                "−07:00": -420
            }, {
                "−06:00": -360
            }, {
                "−05:00": -300
            }, {
                "−04:30": -270
            }, {
                "−04:00": -240
            }, {
                "−03:30": -210
            }, {
                "−03:00": -180
            }, {
                "−02:30": -150
            }, {
                "−02:00": -120
            }, {
                "−01:00": -60
            }, {
                "±00:00": 0
            }, {
                "+01:00": 60
            }, {
                "+02:00": 120
            }, {
                "+03:00": 180
            }, {
                "+03:30": 210
            }, {
                "+04:00": 240
            }, {
                "+04:30": 270
            }, {
                "+05:00": 300
            }, {
                "+05:30": 330
            }, {
                "+05:45": 345
            }, {
                "+06:00": 360
            }, {
                "+06:30": 390
            }, {
                "+07:00": 420
            }, {
                "+08:00": 480
            }, {
                "+08:30": 510
            }, {
                "+08:45": 525
            }, {
                "+09:00": 540
            }, {
                "+09:30": 570
            }, {
                "+10:00": 600
            }, {
                "+10:30": 630
            }, {
                "+11:00": 660
            }, {
                "+12:00": 720
            }, {
                "+12:45": 765
            }, {
                "+13:00": 780
            }, {
                "+14:00": 840
            }]),
            h = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            f = ["Su", "M", "Tu", "W", "Th", "F", "Sa"],
            m = (s(p), d3.time.format("%Y-%m-%d")),
            y = t.daterange || [],
            g = d3.select(J + " ~ #celestial-form").append("div").attr("id", "celestial-date");
        r("left"),
            function() {
                var t = g.append("select").attr("title", "Month").attr("id", "mon").on("change", a),
                    e = 0,
                    n = p.getMonth();
                t.selectAll("option").data(h).enter().append("option").attr("value", function(t, a) {
                    return a === n && (e = a), a
                }).text(function(t) {
                    return t
                }), t.property("selectedIndex", e)
            }(),
            function() {
                g.append("select").attr("title", "Year").attr("id", "yr").on("change", a), n()
            }(), r("right");
        g.append("div").attr("id", "cal");
        a(),
            function() {
                g.append("input").attr("type", "number").attr("id", "hr").attr("title", "Hours").attr("max", "24").attr("min", "-1").attr("step", "1").attr("value", p.getHours()).on("change", function() {
                    !0 === _(this) && d()
                }), g.append("input").attr("type", "number").attr("id", "min").attr("title", "Minutes").attr("max", "60").attr("min", "-1").attr("step", "1").attr("value", p.getMinutes()).on("change", function() {
                    !0 === _(this) && d()
                }), g.append("input").attr("type", "number").attr("id", "sec").attr("title", "Seconds").attr("max", "60").attr("min", "-1").attr("step", "1").attr("value", p.getSeconds()).on("change", function() {
                    !0 === _(this) && d()
                })
            }(),
            function() {
                var t = g.append("select").attr("title", "Time zone offset from UTC").attr("id", "tz").on("change", d),
                    e = 15,
                    a = -p.getTimezoneOffset();
                t.selectAll("option").data(u).enter().append("option").attr("value", function(t, n) {
                    var r = Object.keys(t)[0];
                    return t[r] === a && (e = n), t[r]
                }).text(function(t) {
                    return Object.keys(t)[0]
                }), t.property("selectedIndex", e)
            }(), this.show = function(t, e) {
                var a = W("celestial-date"),
                    n = W("datepick"),
                    r = n.offsetLeft + n.offsetWidth - a.offsetWidth,
                    s = n.offsetTop - a.offsetHeight - 1; - 9999 === a.offsetTop ? (p.setTime(t.valueOf()), i("tz", e), l(), d3.select(J + " ~ #celestial-form").select("#celestial-date").style({
                    top: M(s),
                    left: M(r),
                    opacity: 1
                }), d3.select(J + " ~ #celestial-form").select("#datepick").classed("active", !0)) : c()
            }, this.isVisible = function() {
                return !!document.getElementById("datepick") && !0 === d3.select(J + " ~ #celestial-form").select("#datepick").classed("active")
            }, this.hide = function() {
                c()
            }
    };
    ! function() {
        function t(t, e, a) {
            var n = t.translate(),
                r = Math.atan2(e[1] - n[1], e[0] - n[0]) - Math.atan2(a[1] - n[1], a[0] - n[0]);
            return [Math.cos(r / 2), 0, 0, Math.sin(r / 2)]
        }

        function e(t, e) {
            var a = t.invert(e);
            return a && isFinite(a[0]) && isFinite(a[1]) && i(a)
        }

        function a(t) {
            var e = .5 * t[0] * p,
                a = .5 * t[1] * p,
                n = .5 * t[2] * p,
                r = Math.sin(e),
                s = Math.cos(e),
                o = Math.sin(a),
                i = Math.cos(a),
                l = Math.sin(n),
                c = Math.cos(n);
            return [s * i * c + r * o * l, r * i * c - s * o * l, s * o * c + r * i * l, s * i * l - r * o * c]
        }

        function n(t, e) {
            var a = t[0],
                n = t[1],
                r = t[2],
                s = t[3],
                o = e[0],
                i = e[1],
                l = e[2],
                c = e[3];
            return [a * o - n * i - r * l - s * c, a * i + n * o + r * c - s * l, a * l - n * c + r * o + s * i, a * c + n * l - r * i + s * o]
        }

        function r(t, e) {
            if (t && e) {
                var a = c(t, e),
                    n = Math.sqrt(l(a, a)),
                    r = .5 * Math.acos(Math.max(-1, Math.min(1, l(t, e)))),
                    s = Math.sin(r) / n;
                return n && [Math.cos(r), a[2] * s, -a[1] * s, a[0] * s]
            }
        }

        function s(t, e) {
            var a = Math.max(-1, Math.min(1, l(t, e))),
                n = a < 0 ? -1 : 1,
                r = Math.acos(n * a),
                s = Math.sin(r);
            return s ? function(a) {
                var o = n * Math.sin((1 - a) * r) / s,
                    i = Math.sin(a * r) / s;
                return [t[0] * o + e[0] * i, t[1] * o + e[1] * i, t[2] * o + e[2] * i, t[3] * o + e[3] * i]
            } : function() {
                return t
            }
        }

        function o(t) {
            return [Math.atan2(2 * (t[0] * t[1] + t[2] * t[3]), 1 - 2 * (t[1] * t[1] + t[2] * t[2])) * u, Math.asin(Math.max(-1, Math.min(1, 2 * (t[0] * t[2] - t[3] * t[1])))) * u, Math.atan2(2 * (t[0] * t[3] + t[1] * t[2]), 1 - 2 * (t[2] * t[2] + t[3] * t[3])) * u]
        }

        function i(t) {
            var e = t[0] * p,
                a = t[1] * p,
                n = Math.cos(a);
            return [n * Math.cos(e), n * Math.sin(e), Math.sin(a)]
        }

        function l(t, e) {
            for (var a = 0, n = t.length, r = 0; a < n; ++a) r += t[a] * e[a];
            return r
        }

        function c(t, e) {
            return [t[1] * e[2] - t[2] * e[1], t[2] * e[0] - t[0] * e[2], t[0] * e[1] - t[1] * e[0]]
        }

        function d(t) {
            for (var e = 0, a = arguments.length, n = []; ++e < a;) n.push(arguments[e]);
            var r = d3.dispatch.apply(null, n);
            return r.of = function(e, a) {
                return function(n) {
                    try {
                        var s = n.sourceEvent = d3.event;
                        n.target = t, d3.event = n, r[n.type].apply(e, a)
                    } finally {
                        d3.event = s
                    }
                }
            }, r
        }
        var p = Math.PI / 180,
            u = 180 / Math.PI;
        d3.geo.zoom = function() {
            function l(t) {
                m++ || t({
                    type: "zoomstart"
                })
            }

            function c(t) {
                t({
                    type: "zoom"
                })
            }

            function p(t) {
                --m || t({
                    type: "zoomend"
                })
            }
            var u, h, f, m = 0,
                y = d(g, "zoomstart", "zoom", "zoomend"),
                g = d3.behavior.zoom().on("zoomstart", function() {
                    var s = d3.mouse(this),
                        i = a(u.rotate()),
                        d = e(u, s);
                    d && (f = d), v.call(g, "zoom", function() {
                        u.scale(M.k = d3.event.scale);
                        var a = d3.mouse(this),
                            l = r(f, e(u, a));
                        u.rotate(M.r = o(i = l ? n(i, l) : n(t(u, s, a), i))), s = a, c(y.of(this, arguments))
                    }), l(y.of(this, arguments))
                }).on("zoomend", function() {
                    v.call(g, "zoom", null), p(y.of(this, arguments))
                }),
                v = g.on,
                M = {
                    r: [0, 0, 0],
                    k: 1
                };
            return g.rotateTo = function(t) {
                var e = r(i(t), i([-M.r[0], -M.r[1]]));
                return o(n(a(M.r), e))
            }, g.projection = function(t) {
                return arguments.length ? (u = t, M = {
                    r: u.rotate(),
                    k: u.scale()
                }, g.scale(M.k)) : u
            }, g.duration = function(t) {
                return arguments.length ? (h = t, g) : h
            }, g.event = function(t) {
                t.each(function() {
                    var t = d3.select(this),
                        e = y.of(this, arguments),
                        n = M,
                        r = d3.transition(t);
                    if (r !== t) {
                        r.each("start.zoom", function() {
                            this.__chart__ && (M = this.__chart__, M.hasOwnProperty("r") || (M.r = u.rotate())), u.rotate(M.r).scale(M.k), l(e)
                        }).tween("zoom:zoom", function() {
                            var t = g.size()[0],
                                i = s(a(M.r), a(n.r)),
                                l = d3.geo.distance(M.r, n.r),
                                d = d3.interpolateZoom([0, 0, t / M.k], [l, 0, t / n.k]);
                            return h && r.duration(h(.001 * d.duration)),
                                function(a) {
                                    var n = d(a);
                                    this.__chart__ = M = {
                                        r: o(i(n[0] / l)),
                                        k: t / n[2]
                                    }, u.rotate(M.r).scale(M.k), g.scale(M.k), c(e)
                                }
                        }).each("end.zoom", function() {
                            p(e)
                        });
                        try {
                            r.each("interrupt.zoom", function() {
                                p(e)
                            })
                        } catch (t) {
                            console.log(t)
                        }
                    } else this.__chart__ = M, l(e), c(e), p(e)
                })
            }, d3.rebind(g, y, "on")
        }
    }(),
    function(t, e) {
        "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e(t.d3 = t.d3 || {})
    }(this, function(t) {
        "use strict";

        function e(t) {
            this._size = t, this._call = this._error = null, this._tasks = [], this._data = [], this._waiting = this._active = this._ended = this._start = 0
        }

        function a(t) {
            if (!t._start) try {
                n(t)
            } catch (e) {
                if (t._tasks[t._ended + t._active - 1]) s(t, e);
                else if (!t._data) throw e
            }
        }

        function n(t) {
            for (; t._start = t._waiting && t._active < t._size;) {
                var e = t._ended + t._active,
                    a = t._tasks[e],
                    n = a.length - 1,
                    s = a[n];
                a[n] = r(t, e), --t._waiting, ++t._active, a = s.apply(null, a), t._tasks[e] && (t._tasks[e] = a || c)
            }
        }

        function r(t, e) {
            return function(n, r) {
                t._tasks[e] && (--t._active, ++t._ended, t._tasks[e] = null, null == t._error && (null != n ? s(t, n) : (t._data[e] = r, t._waiting ? a(t) : o(t))))
            }
        }

        function s(t, e) {
            var a, n = t._tasks.length;
            for (t._error = e, t._data = void 0, t._waiting = NaN; --n >= 0;)
                if ((a = t._tasks[n]) && (t._tasks[n] = null, a.abort)) try {
                    a.abort()
                } catch (e) {}
            t._active = NaN, o(t)
        }

        function o(t) {
            if (!t._active && t._call) {
                var e = t._data;
                t._data = void 0, t._call(t._error, e)
            }
        }

        function i(t) {
            if (null == t) t = 1 / 0;
            else if (!((t = +t) >= 1)) throw new Error("invalid concurrency");
            return new e(t)
        }
        var l = [].slice,
            c = {};
        e.prototype = i.prototype = {
            constructor: e,
            defer: function(t) {
                if ("function" != typeof t) throw new Error("invalid callback");
                if (this._call) throw new Error("defer after await");
                if (null != this._error) return this;
                var e = l.call(arguments, 1);
                return e.push(t), ++this._waiting, this._tasks.push(e), a(this), this
            },
            abort: function() {
                return null == this._error && s(this, new Error("abort")), this
            },
            await: function(t) {
                if ("function" != typeof t) throw new Error("invalid callback");
                if (this._call) throw new Error("multiple await");
                return this._call = function(e, a) {
                    t.apply(null, [e].concat(a))
                }, o(this), this
            },
            awaitAll: function(t) {
                if ("function" != typeof t) throw new Error("invalid callback");
                if (this._call) throw new Error("multiple await");
                return this._call = t, o(this), this
            }
        }, t.queue = i, d3.queue = i, Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }), this.Celestial = tt
}();